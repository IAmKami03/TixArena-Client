import { EVENT_CATEGORIES } from "../../types/event";

interface CategoryTabsProps {
  selected: string;
  onSelect: (category: string) => void;
}

function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  const categories = ["All", ...EVENT_CATEGORIES];

  return (
    <div className="flex justify-center gap-3 flex-wrap px-4 pb-8">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={
            category === selected
              ? "bg-white text-black px-4 py-2 rounded-full text-sm"
              : "bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-sm hover:bg-[#262626] transition-colors"
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
