package graphql

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

import (
	"context"
	"database/sql"
	"fmt"
	"veggie-gophers/graphql/generated"
	"veggie-gophers/graphql/model"
)

type Resolver struct {
	DB *sql.DB
}

// // foo
func (r *queryResolver) Vendor(ctx context.Context) (*model.Vendor, error) {
	rows, err := r.DB.Query("SELECT id, stockLevel, price FROM inventory_items")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var inventory []*model.InventoryItem
	for rows.Next() {
		var item model.InventoryItem
		err = rows.Scan(&item.ID, &item.StockLevel, &item.Price)
		if err != nil {
			return nil, err
		}
		inventory = append(inventory, &item)
	}

	vendor := model.Vendor{
		Title:       "Veggie Gophers",
		Description: "We sell the best vegetables in town!",
		Icon:        "https:/veggie-gophers:8080/static/gophers.png",
		Inventory:   inventory,
	}

	return &vendor, nil
}

// // foo
func (r *queryResolver) Item(ctx context.Context, id string) (*model.InventoryItem, error) {
	var item model.InventoryItem
	err := r.DB.QueryRow("SELECT id, stockLevel, price FROM inventory_items WHERE id = $1", id).Scan(&item.ID, &item.StockLevel, &item.Price)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("No item found with id: %s", id)
		}
		return nil, err
	}

	return &item, nil
}

// purchase an item by reducing its stock level
func (r *mutationResolver) Purchase(ctx context.Context, id string, quantity int) (model.PurchaseResult, error) {
	tx, err := r.DB.Begin()
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	// Get the current stock level of the item
	var currentStockLevel int
	err = tx.QueryRow("SELECT stockLevel FROM inventory_items WHERE id = $1", id).Scan(&currentStockLevel)
	if err != nil {
		if err == sql.ErrNoRows {
			return model.PurchaseResultItemNotFound, nil
		}
		return "", err
	}

	// Check if there's enough stock to fulfill the purchase
	if currentStockLevel < quantity {
		return model.PurchaseResultInsufficientStock, nil
	}

	// Update the stock level
	newStockLevel := currentStockLevel - quantity
	_, err = tx.Exec("UPDATE inventory_items SET stockLevel = $1 WHERE id = $2", newStockLevel, id)
	if err != nil {
		return "", err
	}

	err = tx.Commit()
	if err != nil {
		return "", err
	}

	return model.PurchaseResultSuccess, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
