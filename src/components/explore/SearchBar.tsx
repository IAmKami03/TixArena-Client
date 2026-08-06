function SearchBar() {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for events, venues..."
        className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded"
      />
    </div>
  );
}

export default SearchBar;