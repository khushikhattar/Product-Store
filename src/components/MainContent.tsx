import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { BookCard } from "./BookCard";
import { Tally3 } from "lucide-react";
import axios from "axios";

export const MainContent: React.FC = () => {
  // Global filter states
  const { searchQuery, minPrice, maxPrice, keyword, selectedCategory } =
    useFilter();

  // Products fetched from API
  const [products, setProducts] = useState<any[]>([]);

  // Local filter state (cheap, expensive, popular, all)
  const [filter, setFilter] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Dropdown toggle
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Products per page
  const itemsperPage = 10;

  // Fetch products whenever page/keyword changes
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsperPage}&skip=${
      (currentPage - 1) * itemsperPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => setProducts(response.data.products))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [currentPage, keyword]);

  // Apply all filters (category, price, search, sort)
  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice // ✅ fixed
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  // Pagination helpers
  const totalProducts = 100; // dummyjson API has 100 products
  const totalPages = Math.ceil(totalProducts / itemsperPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="flex-1 p-6 bg-red-50 min-h-screen">
      <div className="mb-5">
        {/* Filter dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 className="w-5 h-5 text-gray-600" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
