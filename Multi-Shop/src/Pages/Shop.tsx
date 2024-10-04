import { useEffect, useState } from "react";
import ProductList from "../Component/ProductList";
import { products } from "../Assests/assets";
import { ProductType } from "../Types/ProductType";
import { useAppSelector } from "../AppHook/AppHook";

type Category = 'Men' | 'Women' | 'Kids';
type Type = 'Topwear' | 'Bottomwear' | 'Winterwear';

interface Filters {
  category: Record<Category, boolean>;
  type: Record<Type, boolean>;
}

const Shop = () => {
  const [filters, setFilters] = useState<Filters>({
    category: {
      Men: false,
      Women: false,
      Kids: false,
    },
    type: {
      Topwear: false,
      Bottomwear: false,
      Winterwear: false,
    },
  });

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>(products);
  const [filterDropDown, setFilterDropDown] = useState(true);
  const searchProduct = useAppSelector((state) => state.product.searchProduct);

  // Filter products based on selected categories and types
  const filterProducts = () => {
    let filteredProducts = products.filter(item => {
      const isCategorySelected =
        filters.category.Men && item.category === "Men" ||
        filters.category.Women && item.category === "Women" ||
        filters.category.Kids && item.category === "Kids";

      const isTypeSelected =
        filters.type.Topwear && item.subCategory === "Topwear" ||
        filters.type.Bottomwear && item.subCategory === "Bottomwear" ||
        filters.type.Winterwear && item.subCategory === "Winterwear";

      return (isCategorySelected || Object.values(filters.category).every(value => !value)) &&
             (isTypeSelected || Object.values(filters.type).every(value => !value));
    });

    if (searchProduct) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchProduct.toLowerCase()) || 
        item.category.toLowerCase().includes(searchProduct.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    setSelectedProducts(filteredProducts);
  };

  const handleChangeRelevent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    
    let sortedProducts = [...selectedProducts]; // Clone the current selected products to sort

    if (sortValue === "low to high") {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort by price low to high
    } else if (sortValue === "high to low") {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort by price high to low
    }

    setSelectedProducts(sortedProducts); // Update the state with the sorted products
  };

  // Use effect to trigger product filtering when state changes
  useEffect(() => {
    filterProducts();
  }, [filters, searchProduct]);

  // Handle category selection and deselection
  const handleCategoryChange = (category: Category) => {
    setFilters(prev => ({
      ...prev,
      category: {
        ...prev.category,
        [category]: !prev.category[category],
      }
    }));
  };

  // Handle type selection and deselection
  const handleTypeChange = (type: Type) => {
    setFilters(prev => ({
      ...prev,
      type: {
        ...prev.type,
        [type]: !prev.type[type],
      }
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: { Men: false, Women: false, Kids: false },
      type: { Topwear: false, Bottomwear: false, Winterwear: false },
    });
  };

  if (!selectedProducts.length) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold">No Products Found</h2>
      </div>
    );
  }

  return (
    <div className="shop mt-5 container mx-auto px-4 md:px-[7vw] grid grid-cols-12 md:grid-cols-12 gap-8 md:mt-10">
      <div className="shop__filter col-span-12 md:col-span-3">
        <div className="main-heading flex space-x-1">
          <h2 className="text-gray-500 text-2xl">FILTERS</h2>
          <span>
            <button onClick={() => setFilterDropDown(!filterDropDown)}>
              <i className="ri-arrow-drop-down-line text-2xl md:hidden"></i>
            </button>
          </span>
        </div>

        {filterDropDown && (
          <>
            {/* Category Section */}
            <div className="shop__category border border-gray-400 p-4 mt-6">
              <div className="main-heading">
                <h2 className="text-1 mx-2 mb-2">CATEGORIES</h2>
              </div>
              {Object.keys(filters.category).map(category => (
                <div className="checkbox flex" key={category}>
                  <input
                    type="checkbox"
                    checked={filters.category[category as Category]} 
                    onChange={() => handleCategoryChange(category as Category)} 
                    className="text-gray-500 mx-2"
                  />
                  <p>{category}</p>
                </div>
              ))}
            </div>

            {/* Type Section */}
            <div className="shop__type border border-gray-400 p-4 mt-6">
              <div className="main-heading">
                <h2 className="text-1 mx-2 mb-2">TYPES</h2>
              </div>
              {Object.keys(filters.type).map(type => (
                <div className="checkbox flex" key={type}>
                  <input
                    type="checkbox"
                    checked={filters.type[type as Type]}
                    onChange={() => handleTypeChange(type as Type)}
                    className="text-gray-500 mx-2"
                  />
                  <p>{type}</p>
                </div>
              ))}
            </div>

            <button onClick={resetFilters} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Reset Filters
            </button>
          </>
        )}
      </div>

    
      <div className="shop__AllCollection col-span-12 md:col-span-9">
        <div className="flex justify-between">
          <div className="maintext mt-6 md:mt-0">
            <h1 className="text-1xl font-[400]">ALL COLLECTION</h1>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] mt-4 mx-2 bg-gray-700"></p>
          </div>
          <div className="sort mt-6 md:mt-0">
            <select className="text-xl" onChange={handleChangeRelevent}>
              <option value="">Sort By: Relevant</option>
              <option value="low to high">Sort By: Low to High</option>
              <option value="high to low">Sort By: High to Low</option>
            </select>
          </div>
        </div>

        <div className="shop__product-section mt-5">
          <ProductList selectedProduct={selectedProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
