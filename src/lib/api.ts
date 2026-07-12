import { authClient } from "./auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

interface ProductDataType {
  title: string;
  price: string;
  category: string;
  description: string;
  stock: string;
  image: string; 
}

export const addProductToServer = async (productData: ProductDataType) => {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  return await response.json();
};