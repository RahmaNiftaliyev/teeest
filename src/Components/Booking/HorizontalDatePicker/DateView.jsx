/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import chevronRight from "./../../../Assets/Images/chevronRight.svg";
import chevronLeft from "./../../../Assets/Images/chevronLeft.svg";
import styles from "./DatePicker.module.css";
import dayjs from 'dayjs';

import {
  addDays,
  addMonths,
  differenceInMonths,
  format,
  isSameDay,
  lastDayOfMonth,
  startOfMonth,
  isBefore,
  isAfter,
  parse
} from "date-fns";
import { useSelector } from "react-redux";

const DateView = ({
  startDate,
  lastDate,
  selectDate,
  getSelectedDay,
  primaryColor,
  labelFormat,
  marked,
  prev,
  next,
}) => {
  const {  eventTreatments } = useSelector( (state) => state.bookingSlice);
  const selectedEventTreatmentsDate = eventTreatments?.length === 1 &&  parse(eventTreatments[0].reserveDate, 'yyyy-MM-dd', new Date()); 
  const [selectedDate, setSelectedDate] = useState();
  const firstSection = { marginLeft: "10px" };
  const selectedStyle = {
    fontWeight: "semibold",
    width: "40px",
    height: "66px",
    borderRadius: "8px",
    border: "none",
    background: "#000",
    color: "#fff",
  };
  



  const labelColor = { color: primaryColor };

  const getStyles = (day) => {
    if(selectedEventTreatmentsDate && isSameDay(day, selectedEventTreatmentsDate)){
      return selectedStyle
    }else{
      return !selectedEventTreatmentsDate && isSameDay(day, selectedDate) ? selectedStyle : null;
    }
  };

  const getId = (day) => {
    return  isSameDay(day, selectedDate) ? "selected" : "";
  };



  
  const renderDays = () => {
    const dayFormat = "E";
    const dateFormat = "d";

    const months = [];
    let days = [];
    let beginnigOfMonth = startOfMonth(startDate);

    for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
      let start, end;
      const month = startOfMonth(addMonths(startDate, i));
      start = i === 0 ? Number(format(beginnigOfMonth, dateFormat)) - 1 : 0;
      end =
        i === differenceInMonths(lastDate, startDate)
          ? Number(format(lastDate, "d"))
          : Number(format(lastDayOfMonth(month), "d"));
      for (let j = start; j < end; j++) {
        let currentDay = addDays(month, j);
        let isBeforeFromNow = isBefore(currentDay, new Date()) && !isSameDay(currentDay, new Date());
        let isBeforeFromChoosenDate = isBefore(currentDay, selectedEventTreatmentsDate);
        let isAfterFromChoosenDate = isAfter( currentDay, selectedEventTreatmentsDate) 
       
        days.push(
          <div
            id={`${getId(currentDay)}`}
            className={` ${(isBeforeFromNow || (isBeforeFromChoosenDate || isAfterFromChoosenDate)) && 'cursor-not-allowed'} flex flex-col justify-center gap-1 px-6 ${marked ? styles.dateDayItemMarked : styles.dateDayItem}`}
            style={getStyles( currentDay)}
            key={currentDay}
            onClick={() => selectedEventTreatmentsDate ? (!(isBeforeFromChoosenDate || isAfterFromChoosenDate) && onDateClick(currentDay)) : (!isBeforeFromNow  && onDateClick(currentDay))}
          >
            <div className={`
              ${selectedEventTreatmentsDate && (isBeforeFromChoosenDate || isAfterFromChoosenDate) &&  'text-gray-400'} 
              ${!selectedEventTreatmentsDate && isBeforeFromNow && 'text-gray-400'} 
              text-sm font-bold
            `}>
              {format(currentDay, dateFormat)}
            </div>
            <div className={`
              ${selectedEventTreatmentsDate && (isBeforeFromChoosenDate || isAfterFromChoosenDate) &&  'text-gray-400'} 
              ${!selectedEventTreatmentsDate && isBeforeFromNow && 'text-gray-400'} 
              ${styles.dayLabel}
              text-base font-normal 
            `}>
              {format(currentDay, dayFormat)}
            </div>
            {/* {getMarked(currentDay)} */}
          </div>
        );
      }
      months.push(
        <div className={styles.monthContainer} key={month}>
          <div className="flex ">
            <span
              className={`flex px-3 gap-6 text-lg ${styles.monthYearLabel}`}
              style={labelColor}
            >
              <div className={` ${styles.buttonWrapper}`} style={{ zIndex: 10 }}>
                <button onClick={prev}>
                  <img
                    src={chevronLeft}
                    className="h-5"
                    alt="chevron left icon"
                  />
                </button>
              </div>

              {format(month, labelFormat || "MMMM yyyy")}
              
              <div className={styles.buttonWrapper} style={{ zIndex: 10 }}>
                <button onClick={next}>
                  <img
                    src={chevronRight}
                    className="h-5"
                    alt="chevron right icon"
                  />
                </button>
              </div>
            </span>
          </div>
          <div
            className={styles.daysContainer}
            style={i === 0 ? firstSection : null}
          >
            {days}
          </div>
        </div>
      );
      days = [];
    }
    
    return (
      <div
        id={"container"}
        className={`pl-7 w-[150%] ${styles.dateListScrollable}`}
      >
        {months}
      </div>
    );

  };

  // if(selectedEventTreatmentsDate){
  //   setSelectedDate(selectedEventTreatmentsDate)
  // }

  const onDateClick = (day) => {
    setSelectedDate(day);
    if (getSelectedDay) {
      getSelectedDay(day);
    }
  };

  useEffect(() => {
    if (getSelectedDay) {
      if (selectDate) {
        getSelectedDay(selectDate);
      } else {
        getSelectedDay(startDate);
      }
    }
  }, []);

  useEffect(() => {
    
    if ( selectDate) {
      if ( !isSameDay(selectedDate, selectDate)) {
        setSelectedDate(selectDate);
        setTimeout(() => {
          let view = document.getElementById("selected");
          if (view) {
            view.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          }
        }, 20);
      }
    }
  }, [selectDate]);

  return <React.Fragment>{renderDays()}</React.Fragment>;
};

export { DateView };
