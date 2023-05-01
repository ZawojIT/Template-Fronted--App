import { IProductState } from "@/types/product";
import React from "react";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const products = useSelector(
    (state: { product: IProductState }) => state.product.products
  );
  const productsStatus = useSelector(
    (state: { product: IProductState }) => state.product.isLoading
  );
  console.log("ProductsList");
  return (
    <div>
      {productsStatus ? (
        <div>Loading...</div>
      ) : (
        <div>{JSON.stringify(products)}</div>
      )}
    </div>
  );
};

export default ProductsList;
