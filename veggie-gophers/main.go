package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"veggie-gophers/graphql"
	"veggie-gophers/graphql/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
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
			SET stock_level = LEAST(stock_level + 1, $1)
		`, maxStockLevel)
		if err != nil {
			log.Printf("Error updating stock levels: %v", err)
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
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
