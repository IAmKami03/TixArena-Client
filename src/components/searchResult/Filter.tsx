import { CiCalendar } from "react-icons/ci";
import { filters } from "../../data/filters";
import { useEvents } from "../../contexts/EventContext";

const Filter = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
    selectedHappening,
    setSelectedHappening,
    clearFilters,
  } = useEvents();

  const pickedDate = /^\d{4}-\d{2}-\d{2}$/.test(selectedDate) ? selectedDate : "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] text-[#ECECEC] font-normal">Filter</h1>
        <button onClick={clearFilters} className="text-[16px] text-[#995DFF]">
          Clear filter
        </button>
      </div>
      <div className=" flex flex-col gap-4">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="rounded-3xl border border-[#2D2D2D] p-6"
          >
            <h3 className="pb-3.5 text-[20px] text-[#ECECEC]">
              {filter.title}
            </h3>
            {filter.title === "Category" && (
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedCategory(option)}
                    className={`rounded-[20px] border py-2.5 text-[14px] font-medium transition ${
                      selectedCategory === option
                        ? "border-[#995DFF]  text-white"
                        : "border-[#2E2E2E] text-white hover:border-[#995DFF]"
                    } ${option === "All" ? "w-12 rounded-full" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {filter.title === "Date" && (
              <div className="flex flex-col gap-4">
                {filter.options.map((option) =>
                  option === "Pick Date" ? (
                    <label
                      key={option}
                      className="relative flex cursor-pointer items-center justify-between rounded-[20px] border border-[#2E2E2E] px-4 py-3 hover:border-[#995DFF]"
                    >
                      <span className="text-[16px] text-[#ECECEC]">
                        {pickedDate || "Pick Date"}
                      </span>

                      <CiCalendar className="w-4.48 text-[#ECECEC]" />

                      <input
                        type="date"
                        value={pickedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  ) : (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center justify-between rounded-[20px] border border-[#2E2E2E] px-4 py-3 hover:border-[#995DFF]"
                    >
                      <span className="text-[16px] text-[#ECECEC]">
                        {option}
                      </span>

                      <input
                        type="checkbox"
                        checked={selectedDate === option}
                        onChange={() =>
                          setSelectedDate(selectedDate === option ? "" : option)
                        }
                        className=" px-1.355 py-1.5625 accent-[#995DFF]"
                      />
                    </label>
                  ),
                )}
              </div>
            )}
            {filter.title === "Happening?" && (
              <div className="flex flex-col gap-4">
                {filter.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center justify-between rounded-[20px] border border-[#2E2E2E] px-4 py-3 hover:border-[#995DFF]"
                  >
                    <span className="text-[16px] text-[#ECECEC]">
                      {option}
                    </span>

                    <input
                      type="radio"
                      checked={selectedHappening === option}
                      onChange={() =>
                        setSelectedHappening(
                          selectedHappening === option ? "" : option,
                        )
                      }
                      className="accent-[#995DFF]"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
