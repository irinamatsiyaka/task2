export type Product = {
   id: number;
   title: string;
   description: string;
   price: number;
   image: string;
   thumbnail: string;
};

export interface ProductsResponse {
   products: Product[];
   total: number;
   skip: number;
   limit: number;
}
