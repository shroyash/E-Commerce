import { ProductType } from "../Types/ProductType";
import Product from "./Product";

interface ProductListProps {
  selectedProduct: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ selectedProduct }) => {
  return (
    <div className="grid grid-cols-12 gap-3">
      {selectedProduct.map((product) => (
        <Product key={product._id} product={product} /> 
      ))}
    </div>
  );
};

export default ProductList;

