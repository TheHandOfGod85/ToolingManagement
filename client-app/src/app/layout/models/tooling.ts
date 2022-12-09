export interface Tooling {
  id: string;
  tNumber: string;
  psNumber: string;
  quantity: number | null;
  department: string;
  note: string;
  isInProduction: boolean;
  numberOfImpressions: number | null;
  image: string;
  punnetNumber: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  isAllergen: boolean;
  tooling: Tooling;
}
