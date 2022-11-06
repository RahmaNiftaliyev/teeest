import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollTop = () => {
  const [showScrollTopIcon, setShowScrollTopIcon] = useState(false);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const setShowScollTopFunc = () => {
    if (window.scrollY > 200) {
      setShowScrollTopIcon(true);
    } else {
      setShowScrollTopIcon(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", setShowScollTopFunc);
    return () => {
      window.removeEventListener("scroll", setShowScollTopFunc);
    };
  });

  return (
    <>
      {showScrollTopIcon && (
        <button
          onClick={() => scrollTop()}
          type="button"
          className="border-none shadow-xl outline-none fixed lg:bottom-[90px] md:right-[27px] bottom-5 right-1 z-[999999] w-12 h-12 rounded-full bg-[#7338AC] text-[28px] flex justify-center items-center text-white hover:cursor-pointer hover:bg-[#68319c] transition-all"
        >
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollTop;
