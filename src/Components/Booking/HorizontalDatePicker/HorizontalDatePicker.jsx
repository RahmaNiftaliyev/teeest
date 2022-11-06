/* eslint-disable react-hooks/exhaustive-deps */
import { addDays } from "date-fns";
import React from "react";
import styles from "./DatePicker.module.css";
import { DateView } from "./DateView";
import { MonthView } from "./MonthView";

const DatePicker = (props) => {
  const next = (event) => {
    event.preventDefault();
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width - 60;
  };
  const prev = (event) => {
    event.preventDefault();
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width - 60;
  };

  const startDate = props.startDate || new Date();
  const lastDate = addDays(startDate, props.days || 365);

  let Component = DateView;

  if (props.type === "month") {
    Component = MonthView;
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.buttonWrapper} style={buttonzIndex}>
        <button className="w-10 h-10 " onClick={prev}>
          <img src={chevronLeft} className="h-5" alt="chevron left icon" />
        </button>
      </div> */}
      <Component
        {...props}
        primaryColor={"#000"}
        startDate={startDate}
        lastDate={lastDate}
        prev={prev}
        next={next}
      />
      {/* <div className={styles.buttonWrapper} style={buttonzIndex}>
        <button className="w-10 h-10 " onClick={next}>
          <img src={chevronRight} className="h-5" alt="chevron right icon" />
        </button>
      </div> */}
    </div>
  );
};

export { DatePicker };
