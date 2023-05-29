import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  stockLevel: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  purchase: PurchaseResult;
  registerVendor?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationPurchaseArgs = {
  itemId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  vendorId: Scalars['ID']['input'];
};


export type MutationRegisterVendorArgs = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
  vendorId: Scalars['ID']['input'];
};

export type Product = {
  __typename?: 'Product';
  classId: Scalars['ID']['output'];
  className: Scalars['String']['output'];
  coarseClassName?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  imagePath?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['String']['output']>;
};

export enum PurchaseResult {
  InsufficientStock = 'INSUFFICIENT_STOCK',
  ItemNotFound = 'ITEM_NOT_FOUND',
  Success = 'SUCCESS'
}

export type Query = {
  __typename?: 'Query';
  item?: Maybe<InventoryItem>;
  product?: Maybe<Product>;
  products: Array<Product>;
  vendors: Array<Vendor>;
};


export type QueryItemArgs = {
  itemId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  classId: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  classIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  coarseClassNames?: InputMaybe<Array<Scalars['String']['input']>>;
  productTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Vendor = {
  __typename?: 'Vendor';
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  inventory: Array<InventoryItem>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  vendorId: Scalars['ID']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InventoryItem: ResolverTypeWrapper<InventoryItem>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  PurchaseResult: PurchaseResult;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Vendor: ResolverTypeWrapper<Vendor>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  InventoryItem: InventoryItem;
  Mutation: {};
  Product: Product;
  Query: {};
  String: Scalars['String']['output'];
  Vendor: Vendor;
};

export type InventoryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItem'] = ResolversParentTypes['InventoryItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  stockLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  purchase?: Resolver<ResolversTypes['PurchaseResult'], ParentType, ContextType, RequireFields<MutationPurchaseArgs, 'itemId' | 'quantity' | 'vendorId'>>;
  registerVendor?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRegisterVendorArgs, 'description' | 'icon' | 'title' | 'url' | 'vendorId'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  classId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  className?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coarseClassName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imagePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  item?: Resolver<Maybe<ResolversTypes['InventoryItem']>, ParentType, ContextType, RequireFields<QueryItemArgs, 'itemId' | 'vendorId'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'classId'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsArgs>>;
  vendors?: Resolver<Array<ResolversTypes['Vendor']>, ParentType, ContextType>;
};

export type VendorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vendor'] = ResolversParentTypes['Vendor']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inventory?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vendorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  InventoryItem?: InventoryItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Vendor?: VendorResolvers<ContextType>;
};

