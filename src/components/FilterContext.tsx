import { createContext, useContext, useState } from "react";

interface FilterContextType {
  searchQuery: string;
  setsearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setsearchQuery,
        selectedCategory,
        setKeyword,
        setSelectedCategory,
        keyword,
        minPrice,
        maxPrice,
        setMaxPrice,
        setMinPrice,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
