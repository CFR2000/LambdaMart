package graphql

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

import (
	"context"
	"veggie-gophers/graphql/generated"
	"veggie-gophers/graphql/model"
)

type Resolver struct{}

// // foo
func (r *queryResolver) Vendor(ctx context.Context) (*model.Vendor, error) {
	panic("not implemented")
}

// // foo
func (r *queryResolver) Item(ctx context.Context, id string) (*model.InventoryItem, error) {
	panic("not implemented")
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
