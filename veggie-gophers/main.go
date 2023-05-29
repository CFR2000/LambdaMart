package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"context"

	"veggie-gophers/graphql"
	"veggie-gophers/graphql/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	graphqlClient "github.com/machinebox/graphql"
	_ "github.com/lib/pq"
)

const defaultPort = "8080"
const maxStockLevel = 250

func connectToDB() (*sql.DB, error) {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		log.Fatal("DATABASE_URL environment variable not set")
	}
	fmt.Printf("Connecting to database with connection string: %s\n", connStr)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func RunStockUpdater(DB *sql.DB) {
	ticker := time.NewTicker(5 * time.Second)

	for range ticker.C {
		_, err := DB.Exec(`
			UPDATE inventory_items
			SET stockLevel = LEAST(stockLevel + 1, $1)
		`, maxStockLevel)
		if err != nil {
			log.Printf("Error updating stock levels: %v", err)
		}
	}
}

func register(brokerUrl, vendorId, url, title, description, icon string) {
	log.Printf("Registering with broker at %s", brokerUrl)
	// create a client (safe to share across requests)
	client := graphqlClient.NewClient(brokerUrl)
	
	// make a request
	req := graphqlClient.NewRequest(`
		mutation(
			$vendorId: ID!
			$url: String!
			$title: String!
			$description: String!
			$icon: String!
		  ) {
			registerVendor(
				vendorId: $vendorId
				url: $url
				title: $title
				description: $description
				icon: $icon
			  )
		}
	`)
	
	// set any variables
	req.Var("vendorId", vendorId)
	req.Var("url", url)
	req.Var("title", title)
	req.Var("description", description)
	req.Var("icon", icon)
	
	// set header fields
	req.Header.Set("Cache-Control", "no-cache")
	
	// define a Context for the request
	ctx := context.Background()
	
	// run it and capture the response
	var respData struct {
		RegisterVendor bool
	}
	if err := client.Run(ctx, req, &respData); err != nil {
		log.Fatal(err)
	} else {
		if (respData.RegisterVendor){
			log.Printf("Registered with broker at %s", brokerUrl)
		}
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db, err := connectToDB()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	defer db.Close()

	// Start the stock updater as a background process
	go RunStockUpdater(db)

	// Configure the GraphQL server with your generated resolvers.
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graphql.Resolver{DB: db}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Printf("Connect to http://localhost:%s/ for GraphQL playground", port)
	brokerUrl := os.Getenv("BROKER_URL")
	register(brokerUrl, "veggie-gophers", "http://veggie-gophers:8080/query", "Veggie Gophers", "We sell the best vegetables in town!", "http:/veggie-gophers:8080/static/gophers.png")
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
