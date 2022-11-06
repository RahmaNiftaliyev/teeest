import React, { useEffect } from "react";
import Spin from "./Spin";

const Spinner = () => {
  useEffect(() => {
    spinnerDot();
    setInterval(() => {
      spinnerDot();
    }, 800);
  }, []);

  const spinnerDot = () => {
    const spinnerDots = document.querySelectorAll(".custom-spinner-dot");
    spinnerDots.forEach((dot, index) => {
      setTimeout(() => {
        for (let i = 0; i < spinnerDots.length; i++) {
          spinnerDots[i].classList.remove("purple-color");
        }
        dot.classList.add("purple-color");
      }, 100 * index);
    });
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center h-full w-[100vw] bg-white bg-opacity-[0.6]">
      <Spin/>
    </div>
  );
};

export default Spinner;
