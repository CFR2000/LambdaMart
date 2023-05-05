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
	test := model.Vendor{
		Title:       "1",
		Description: "Test Vendor",
		Icon:        "https://www.google.com",
		Inventory: []*model.InventoryItem{
			{
				ID:         "1",
				StockLevel: 10,
			},
		},
	}

	return &test, nil
}

// // foo
func (r *queryResolver) Item(ctx context.Context, id string) (*model.InventoryItem, error) {
	var item model.InventoryItem
	err := r.DB.QueryRow("SELECT id, stock_level FROM inventory_items WHERE id = $1", id).Scan(&item.ID, &item.StockLevel)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("No item found with id: %s", id)
		}
		return nil, err
	}

	return &item, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
