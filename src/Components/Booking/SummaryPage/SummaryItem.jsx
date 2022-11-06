import React from "react";
import summaryItemImg from "./../../../Assets/Images/summaryItemImg.png";
import summaryRemoveIcon from "./../../../Assets/Images/summaryRemoveIcon.svg";
import summaryCalendar from "./../../../Assets/Images/summaryCalendar.svg";
import summaryClock from "./../../../Assets/Images/summaryClock.svg";
import { getPrice } from "../../../Utils/PriccingOptions.util";

const SummaryItem = ({ eventTreatment }) => {
  return (
    <div
      className="w-full lg:py-10 py-4 flex lg:gap-5 gap-2"
      style={{ borderBottom: "1px solid #8c8c8c40" }}
    >
      <div className=" w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]  lg:w-[280px] lg:h-[200px] flex-shrink-0 ">
        <img
          src={summaryItemImg}
          alt="summary item"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center lg:mb-4 mb-2">
          <h2 className="font-medium sm:text-2xl text-sm leading-9 m-0">
            {eventTreatment?.treatmentName}
          </h2>
          <button className="hover:cursor-pointer ">
            <img src={summaryRemoveIcon} alt="remove icon" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <p className="font-normal text-xs sm:text-xl sm:leading-[30px] text-[#8c8c8c] flex lg:gap-3 gap-1 items-center m-0">
              {eventTreatment?.employeeName} {eventTreatment?.employeeSurname}
            </p>
            <p className="max-w-[49px] sm:max-w-[150px] flex-shrink-0 font-medium sm:text-xl text-xs lg:leading-[30px] text-[#FFCD68]">
              {getPrice(eventTreatment)}
            </p>
          </div>
          <div className="flex flex-col w-full justify-between lg:gap-4 gap-1">
            <p className="font-normal text-xs sm:text-xl leading-[30px] text-[#8c8c8c] flex lg:gap-3 gap-1 items-center m-0">
              {" "}
              <img
                className="w-[18px] h-[18px] lg:w-6 lg:h-6"
                src={summaryCalendar}
                alt="calendar icon"
              />
              {eventTreatment?.reserveDate}
            </p>
            <p className="font-normal text-xs sm:text-xl leading-[30px] text-[#8c8c8c] flex lg:gap-3 gap-1 items-center m-0">
              {" "}
              <img
                className="w-[18px] h-[18px] lg:w-6 lg:h-6"
                src={summaryClock}
                alt="clock icon"
              />
              {eventTreatment?.reserveTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
