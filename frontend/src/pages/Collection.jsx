import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Search } from 'lucide-react';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((p) => p.filter((item) => item !== e.target.value));
    } else {
      setCategory((p) => [...p, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((p) => p.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((p) => [...p, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  const toggleFilter = () => {
    setIsFilterAnimating(true);
    setShowFilter(!showFilter);
    setTimeout(() => setIsFilterAnimating(false), 300);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="min-h-screen bg-grey-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="w-full sm:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button
                onClick={toggleFilter}
                className="flex items-center justify-between w-full text-lg font-medium text-gray-900 mb-4 sm:mb-6"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  <span>Filters</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 sm:hidden ${
                    showFilter ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`space-y-6 transition-all duration-300 ease-in-out ${
                  showFilter ? "block" : "hidden sm:block"
                } ${isFilterAnimating ? "opacity-0" : "opacity-100"}`}
              >
                {/* Categories */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-3">
                    {["Men", "Women", "Kids"].map((item) => (
                      <label key={item} className="flex items-center gap-3 group cursor-pointer">
                        <input
                          type="checkbox"
                          value={item}
                          onChange={toggleCategory}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Types */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Type</h3>
                  <div className="space-y-3">
                    {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                      <label key={item} className="flex items-center gap-3 group cursor-pointer">
                        <input
                          type="checkbox"
                          value={item}
                          onChange={toggleSubCategory}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
                  All Collections
                </h1>
               
            

            
                

                <select
                  onChange={(e) => setSortType(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="relevant">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Price Low to High</option>
                  <option value="high-high">Sort by: Price High to Low</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
                {filterProducts.map((item, i) => (
                  <div
                    key={i}
                    className="group transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <ProductItem
                      id={item._id}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                    />
                  </div>
                ))}
              </div>

              {/* Empty State */}





              {filterProducts.length === 0 && (
                <div className="text-center py-12">
                  <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Collection;