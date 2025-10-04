export interface BillItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Bill {
  id?: string;
  items: BillItem[];
  customerPhone: string;
  subtotal: number;
  tax: number;
  total: number;
  createdAt?: string;
}