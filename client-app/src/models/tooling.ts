export interface Tooling {
  id?: string | undefined;
  tNumber: string;
  psNumber: string;
  quantity: number | undefined;
  department: string;
  note?: string;
  isInProduction: boolean;
  numberOfImpressions: number | undefined;
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

export interface ImageUpload {
  files: Blob[];
  id: string | undefined;
}
