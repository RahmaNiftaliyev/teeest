import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEventsToTotal,
  addTotalServiceToTotalEvents,
  selectDate,
} from "../../../Redux/features/bookingSlice";
import { Link, useNavigate } from "react-router-dom";
import { addEventTreatments } from "../../../Redux/features/bookingSlice";
import { useGetBlockTimesMutation } from "../../../Redux/services/BlockTimesApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Spin from "../../Spinner/Spin";
import Layout from "../../../Layouts/Layout";
import Calendar from "react-calendar";
import TotalPriceCard from "../TotalPriceCard/TotalPriceCard";
import TimePickerComponent from "../TimePickerComponent/TimePickerComponent";
import calendarNavNext from "./../../../Assets/Images/calendar-nav-next.svg";
import calendarNavPrev from "./../../../Assets/Images/calendar-nav-prev.svg";
import "react-calendar/dist/Calendar.css";
import "../../../Assets/Styles/CustomCalendar.css";
import { useTranslation } from "react-i18next";
import IntlPolyfill from "intl";
import "intl/locale-data/jsonp/az.js";
import leftArrow from "./../../../Assets/Images/arrow-left.svg";
import MobileCalendar from "./MobileCalendar";
const loadSpinner = (
  <AiOutlineLoading3Quarters
    style={{
      fontSize: 24,
    }}
    spin
  />
);

if (global.Intl) {
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
} else {
  global.Intl = IntlPolyfill;
}
const CalendarPage = () => {
  const { t } = useTranslation();
  const [getBlockTimes] = useGetBlockTimesMutation();
  const currentLang = useSelector((state) => state.lang.lang);
  const { branch, employee, eventTreatments } = useSelector(
    (state) => state.bookingSlice
  );
  const [dateValue, onChange] = useState();
  const [hourDatas, setHourDatas] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showTimeComponent, setShowTimeComponent] = useState(true);
  const [showBookButton, setShowBookButton] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const format = "YYYY-MM-DD";
  let date = localStorage.getItem("selectedDate");

  useEffect(() => {
    if (eventTreatments?.length > 0) {
      let y = dayjs(date).format("YYYY");
      let m = dayjs(date).format("M") - 1;
      let d = dayjs(date).format("D");
      setSelectedDate(new Date(y, m, d));
      pickDate(date);
    }
  }, [dateValue]);

  const disableDate = (current) => {
    let beforeCurrentDay = dayjs().add(-1, "day") >= current;
    return beforeCurrentDay || (eventTreatments?.length > 0 && current);
  };

  const pickDate = useCallback(
    (value) => {
      let date = dayjs(value).format(format);
      setShowTimeComponent(false);
      setSelectedTime(null);
      dispatch(selectDate(date));
      dispatch(addEventsToTotal(["date", date]));
      let params = {
        branchId: branch?.id,
        date,
        employeeId: employee?.id,
      };
      // GET BLOCKED TIMES FOR EMPLOYEE
      getBlockTimes(params)
        .unwrap()
        .then((res) => {
          setHourDatas(res.data?.blockTimesDetailed);
          setShowTimeComponent(true);
        })
        .catch((err) => {
          setShowTimeComponent(false);
          if (err.status === 409) {
            toast.error("Employee doesn't work at selected date");
            setShowTimeComponent(false);
            setShowBookButton(false);
          }
          if (err.status === 500) {
            toast.error("Internal problem...");
            setShowTimeComponent(false);
            setShowBookButton(false);
          }
        });
    },
    [eventTreatments]
  );
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
  return screenWidth >= 1024 ? (
    <Layout showNavbar={screenWidth >= 1024 ? false : true}>
      <div className="pt-[110px] px-4 lg:px-2.5 xl:px-0 xl:w-[1200px] mx-auto flex gap-16 ">
        <div className=" pt-0 " style={{ flex: 2 }}>
          <h1 className="  font-medium text-[40px] lead mb-10">
            {t("select_date_and_time")}
          </h1>
          <div className="lg:flex hidden w-full  lg:flex-col lg:items-start capitalize lg:justify-start">
            <Calendar
              nextLabel={<img src={calendarNavNext} alt="calendar Nav Next" />}
              prevLabel={
                <img src={calendarNavPrev} alt="calendar navigation prev " />
              }
              onClickDay={(value) => {
                pickDate(value);
                setSelectedDate(value);
                localStorage.setItem("selectedDate", value);
              }}
              onChange={(value) => onChange(value)}
              locale="en-US"
              value={selectedDate}
              tileDisabled={({ date }) => disableDate(date)}
              defaultView="month"
              minDetail="month"
            />
          </div>
          <div>
            {showTimeComponent ? (
              <div className="max-w-[626px] mt-16 grid grid-cols-2 gap-6">
                {hourDatas?.map((hourData, index) => (
                  <TimePickerComponent
                    hourData={hourData}
                    setShowBookButton={setShowBookButton}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div className="max-w-[626px] mt-16 flex justify-center">
                <Spin />
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }} className="hidden lg:block">
          <TotalPriceCard />
          {showBookButton && (
            <Link to="summary">
              <button
                onClick={() => {
                  dispatch(addEventTreatments());
                  // dispatch(addTotalServiceToTotalEvents(totalServices))
                  dispatch(addEventsToTotal(["status", "BOOKED"]));
                }}
                className="w-full py-3 text-white font-light text-2xl leading-9 bg-[#7338AC] rounded-lg mt-10 hover:cursor-pointer hover:bg-[#652c9a] transition-all"
              >
                {t("book_in_calendar")}
              </button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  ) : (
    <MobileCalendar />
  );
};
export default CalendarPage;
