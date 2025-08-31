import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

export const Sidebar: React.FC = () => {
  // Filters from global context
  const {
    searchQuery,
    setsearchQuery,
    selectedCategory,
    setKeyword,
    setSelectedCategory,
    minPrice,
    maxPrice,
    setMaxPrice,
    setMinPrice,
  } = useFilter();

  // Store fetched categories
  const [categories, setCategories] = useState<string[]>([]);

  // Predefined keyword chips
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  // Fetch categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchCategories();
  }, []);

  // Handlers for filters
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };
  const handleChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };
  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setsearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-80 h-screen p-5 bg-gray-50 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Store</h1>

      <section className="space-y-6">
        {/* 🔍 Search input */}
        <input
          type="text"
          placeholder="Search Product"
          className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
        />

        {/* 💰 Price Range */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Price Range</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Min"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
            />
            <input
              type="text"
              placeholder="Max"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={maxPrice ?? ""}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        {/* 📂 Categories list */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Categories</h2>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleChangeCategories(category)}
                  checked={selectedCategory === category}
                />
                <span className="text-gray-700">{category.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 🔑 Keywords chips */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Popular Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ♻ Reset button */}
        <button
          onClick={handleResetFilters}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};
