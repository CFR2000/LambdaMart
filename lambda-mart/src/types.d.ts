export type Vendor = {
  description: string;
  icon: string;
  title: string;
  url: string;
  vendorId: string | number;
};

export type InventoryItem = {
  id: string | number;
  stockLevel: number;
  price: number;
  timeToDeliver: number;
  vendor: Vendor;
};
