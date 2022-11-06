import React from "react";
import { useState } from "react";

const buttons = [
  { id: 1, title: "All" },
  { id: 2, title: "Favorite" },
  { id: 3, title: "Recommended" },
  { id: 4, title: "Nearest" },
  { id: 5, title: "Newest" },
  { id: 6, title: "Top rated" },
  { id: 7, title: "Lawest price" },
  { id: 8, title: "Discount" },
];

const TabButton = () => {
  const [activeButton, setActiveButton] = useState(buttons[0].id);

  return (
    <div className="hidden md:flex md:gap-x-5 lg:gap-x-10 py-12">
      {buttons.map(({ id, title }) => (
        <button
          onClick={() => setActiveButton(id)}
          className={`text-base lg:text-lg font-normal leading-7 ${
            activeButton === id ? "text-primary-color" : "text-black"
          }`}
          key={id}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default TabButton;
