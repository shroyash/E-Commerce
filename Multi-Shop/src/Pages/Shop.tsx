import { useEffect, useState } from "react";
import ProductList from "../Component/ProductList";
import { products } from "../Assests/assets";
import { ProductType } from "../Types/ProductType";

const Shop = () => {
  const [isMenSelected, setIsMenSelected] = useState(false);
  const [isWomenSelected, setIsWomenSelected] = useState(false);
  const [isKidsSelected, setIsKidsSelected] = useState(false);
  const [isTopwearSelected, setIsTopwearSelected] = useState(false);
  const [isBottomwearSelected, setIsBottomwearSelected] = useState(false);
  const [isWinterwearSelected, setIsWinterwearSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>(products);
  const [filterDropDown, setFilterDropDown] = useState(true);

  // Filter products based on selected categories and types
  const filterProducts = () => {
    let filteredProducts = products;

    // Filter by categories
    if (isMenSelected) {
      filteredProducts = filteredProducts.filter(item => item.category === "Men");
    } else if (isWomenSelected) {
      filteredProducts = filteredProducts.filter(item => item.category === "Women");
    } else if (isKidsSelected) {
      filteredProducts = filteredProducts.filter(item => item.category === "Kids");
    }

    // Filter by types
    if (isTopwearSelected) {
      filteredProducts = filteredProducts.filter(item => item.subCategory === "Topwear");
    }
    if (isBottomwearSelected) {
      filteredProducts = filteredProducts.filter(item => item.subCategory === "Bottomwear");
    }
    if (isWinterwearSelected) {
      filteredProducts = filteredProducts.filter(item => item.subCategory === "Winterwear");
    }

    setSelectedProducts(filteredProducts);
  };

  // Use effect to trigger product filtering when state changes
  useEffect(() => {
    filterProducts();
  }, [isMenSelected, isWomenSelected, isKidsSelected, isTopwearSelected, isBottomwearSelected, isWinterwearSelected]);

  // Handle category selection and deselection
  const handleCategoryChange = (category: string) => {
    if (category === "Men") {
      setIsMenSelected(!isMenSelected);
      setIsWomenSelected(false); // Deselect Women
      setIsKidsSelected(false);  // Deselect Kids
    } else if (category === "Women") {
      setIsWomenSelected(!isWomenSelected);
      setIsMenSelected(false);  // Deselect Men
      setIsKidsSelected(false); // Deselect Kids
    } else if (category === "Kids") {
      setIsKidsSelected(!isKidsSelected);
      setIsMenSelected(false);  // Deselect Men
      setIsWomenSelected(false); // Deselect Women
    }
  };

  // Handle type selection and deselection
  const handleTypeChange = (type: string) => {
    if (type === "Topwear") {
      setIsTopwearSelected(!isTopwearSelected);
      setIsBottomwearSelected(false); // Deselect Bottomwear
      setIsWinterwearSelected(false); // Deselect Winterwear
    } else if (type === "Bottomwear") {
      setIsBottomwearSelected(!isBottomwearSelected);
      setIsTopwearSelected(false); // Deselect Topwear
      setIsWinterwearSelected(false); // Deselect Winterwear
    } else if (type === "Winterwear") {
      setIsWinterwearSelected(!isWinterwearSelected);
      setIsTopwearSelected(false);  // Deselect Topwear
      setIsBottomwearSelected(false); // Deselect Bottomwear
    }
  };

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
              <div className="checkbox flex">
                <input
                  type="checkbox"
                  checked={isMenSelected}
                  onChange={() => handleCategoryChange("Men")}
                  className="text-gray-500 mx-2"
                />
                <p>Men</p>
              </div>
              <div className="checkbox flex">
                <input
                  type="checkbox"
                  checked={isWomenSelected}
                  onChange={() => handleCategoryChange("Women")}
                  className="text-gray-500 mx-2"
                />
                <p>Women</p>
              </div>
              <div className="checkbox flex">
                <input
                  type="checkbox"
                  checked={isKidsSelected}
                  onChange={() => handleCategoryChange("Kids")}
                  className="text-gray-500 mx-2"
                />
                <p>Kids</p>
              </div>
            </div>

            {/* Type Section */}
            <div className="shop__type border border-gray-400 p-4 mt-6">
              <div className="main-heading">
                <h2 className="text-1 mx-2 mb-2">TYPES</h2>
              </div>
              <div className="checkbox flex">
                <input
                  type="checkbox"
                  checked={isTopwearSelected}
                  onChange={() => handleTypeChange("Topwear")}
                  className="text-gray-500 mx-2"
                />
                <p>Topwear</p>
              </div>
              <div className="checkbox flex">
                <input
                  type="checkbox"
                  checked={isBottomwearSelected}
                  onChange={() => handleTypeChange("Bottomwear")}
                  className="text-gray-500 mx-2"
                />
                <p>Bottomwear</p>
              </div>
              <div className="checkbox flex">
                <input
                  type="checkbox"
                  checked={isWinterwearSelected}
                  onChange={() => handleTypeChange("Winterwear")}
                  className="text-gray-500 mx-2"
                />
                <p>Winterwear</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* All Products Section */}
      <div className="shop__AllCollection col-span-12 md:col-span-9">
        <div className="flex justify-between">
          <div className="maintext mt-6 md:mt-0">
            <h1 className="text-1xl font-[400]">ALL COLLECTION</h1>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] mt-4 mx-2 bg-gray-700"></p>
          </div>
          <div className="sort mt-6 md:mt-0">
            <select name="" id="" className="text-xl">
              <option value="" className="text-xs">Sort By: Relevant</option>
              <option value="" className="text-xs">Sort By: Low to High</option>
              <option value="" className="text-xs">Sort By: High to Low</option>
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
