import React from "react";
import { useGetProductByIdQuery } from "../api/productsApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductDetails() {
   const { id } = useParams();
   const { data, isLoading, error } = useGetProductByIdQuery(id);

   if (isLoading) return <p>Loading product...</p>;
   if (error) return <p>Error loading product</p>;

   return (
      <div>
         <Link to="/">Back to products</Link>
         <h2>{data.title}</h2>
         <img src={data.thumbnail} alt={data.title} width="200" />
         <p>{data.description}</p>
         <p>
            <b>Price:</b> ${data.price}
         </p>
      </div>
   );
}

export default ProductDetails;
