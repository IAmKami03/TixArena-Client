export interface FilterSection {
  id: number;
  title: string;
  type: "chip" | "checkbox" | "radio";
  options: string[];
}

export const filters: FilterSection[] = [
  {
    id: 1,
    title: "Category",
    type: "chip",
    options: [
      "All",
      "Entertainment",
      "Tech",
      "Corporate",
      "Sport",
      "Education",
      "Charity",
      "Comedy",
      "Concert",
    ],
  },
  {
    id: 2,
    title: "Date",
    type: "checkbox",
    options: ["Today", "Tomorrow", "This weekend", "Pick Date"],
  },
  {
    id: 3,
    title: "Happening?",
    type: "radio",
    options: ["Morning Event", "Midday Event", "Night Event"],
  },
];
