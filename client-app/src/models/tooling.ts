export interface Tooling {
  id: string;
  tNumber: string;
  psNumber: string;
  quantity: number;
  department: string;
  note?: string;
  isInProduction: boolean;
  numberOfImpressions: number;
  image?: string;
  punnetNumber: string;
  products?: Product[];
  images?: Image[];
}

export interface Product {
  id?: number;
  name: string;
  isAllergen: boolean;
  toolingId?: string | undefined;
}

export interface Image {
  id: string;
  url: string;
  isMain: boolean;
}

export interface DeleteProductDto {
  productId: number;
  toolingId: string | undefined;
}
