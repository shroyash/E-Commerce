import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "../Assests/assets"; // Adjust path if necessary
import { ProductType } from "../Types/ProductType";

// Defining the context type without exposing the setters
type LatestSellingContextType = {
  latestProducts: ProductType[];
  sellingProducts: ProductType[];
};

// Creating the context
export const LatestSellingContext = createContext<LatestSellingContextType | null>(null);

// Creating the provider component
export const LatestSellingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const [sellingProducts, setSellingProducts] = useState<ProductType[]>([]);

  // Setting the sliced product data on component mount
  useEffect(() => {
    const latestProducts= products.slice(39, 50);
    const sellingProducts = products.slice(0, 9);

    setLatestProducts(latestProducts);
    setSellingProducts(sellingProducts);
  }, []);

  return (
    <LatestSellingContext.Provider
      value={{
        latestProducts,
        sellingProducts,
      }}
    >
      {children}
    </LatestSellingContext.Provider>
  );
};

// Custom hook to use the LatestSellingContext
export const useLatestSelling = () => {
  const context = useContext(LatestSellingContext);
  if (!context) {
    throw new Error("useLatestSelling must be used within a LatestSellingProvider");
  }
  return context;
};
