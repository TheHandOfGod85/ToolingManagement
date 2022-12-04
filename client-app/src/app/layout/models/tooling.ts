export interface Tooling {
  id: string;
  tNumber: string;
  psNumber: string;
  quantity: number;
  department: string;
  note: string;
  isInProduction: boolean;
  numberOfImpressions: number;
  image: string;
  punnetNumber: string;
  productId: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  isAllergen: boolean;
}
