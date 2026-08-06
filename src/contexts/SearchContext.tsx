import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return context;
};
