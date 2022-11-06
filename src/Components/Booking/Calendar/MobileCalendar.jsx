import {
  addEventsToTotal,
  selectDate,
  selectTime,
} from "../../../Redux/features/bookingSlice";
import { addEventTreatments } from "../../../Redux/features/bookingSlice";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetBlockTimesMutation } from "../../../Redux/services/BlockTimesApi";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "../HorizontalDatePicker/HorizontalDatePicker";
import leftArrow from "./../../../Assets/Images/arrow-left.svg";
import { format, parse } from "date-fns";
import { useEffect } from "react";
import toast from "react-hot-toast";

const MobileCalendar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [getBlockTimes] = useGetBlockTimesMutation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const [datas, setDatas] = useState();
  const [selectedStateDate, setSelectedStateDate] = useState();
  const [showBookButton, setShowBookButton] = useState(false);
  const { branch, employee, eventTreatments } = useSelector(
    (state) => state.bookingSlice
  );
  const selectedEventTreatmentsDate = eventTreatments?.length === 1 &&  eventTreatments[0].reserveDate;

  const selectedDayFunc = (val) => {
    let formattedDate = format(val, "yyyy-MM-dd");
    // console.log(formattedDate);
    setSelectedDate(val);
    setSelectedStateDate(formattedDate);
  };
  useEffect(() => {
    let formattedDate = format(selectedDate, "yyyy-MM-dd");
    
    dispatch(selectDate(formattedDate));
    dispatch(addEventsToTotal(["date", formattedDate]));
    checkDate(selectedEventTreatmentsDate ? selectedEventTreatmentsDate : formattedDate)
  }, [selectedDate]);
  useEffect(() => {
    if (selectedTime) {
      dispatch(selectTime(selectedTime));
      dispatch(addEventsToTotal(["time", selectedTime]));
      setShowBookButton(true);
    }
  }, [selectedTime]);


 
  const checkDate = useCallback((test) => {
    
    let params = {
      branchId: branch?.id,
      date: test,
      employeeId: employee?.id,
    };
    // GET BLOCKED TIMES FOR EMPLOYEE
    // console.log(params, 'paaaaaaaraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaams');
    getBlockTimes(params)
      .unwrap()
      .then((res) => {
        setDatas(res.data?.blockTimesDetailed);
      })
      .catch((err) => {
        if (err.status === 409) {
          toast.error("Employee doesn't work at selected date");
          setDatas([])
        } else if (err.status === 500) {
          toast.error("Internal problem...");
          setDatas([])
        }
      });
  }, []);


  return (
    <div>
      <div className="pt-[150px] px-4">
        <div className="lg:hidden fixed top-0 left-0 z-50 w-full pt-11 px-5 pb-8 bg-[#FF00001A] flex justify-between items-center">
          <button onClick={() => navigate(-1)}>
            <img src={leftArrow} alt="left arrow" />
          </button>
          <p className="m-0 text-2xl md:text-3xl font-medium">
            {t("date_and_time")}
          </p>
          <p className="m-0"></p>
        </div>
        <div>
          <DatePicker
            getSelectedDay={selectedDayFunc}
            endDate={365}
            selectDate={selectedDate}
            labelFormat={"MMMM"}
            color={"#000"}
            marked={[
              {
                date: selectedDate,
                marked: true,
                style: {
                  color: "#000000",
                  padding: "2px",
                  fontSize: 21,
                },
              },
            ]}
          />
        </div>
        <div>
          <h2 className="custom_mobile_calendar_time_header text-2xl md:text-3xl font-bold">
            {t("available_time")}
          </h2>
          <div>
            { datas?.map((hourItem) => (
              <div key={ hourItem?.hour.split(":") } className="grid grid-cols-3 gap-x-4">
                {hourItem?.minutes?.map((hourMinute) => (
                  <div
                    className={`border-[2px]  py-[10px] px-4 rounded-md text-center my-2   ${
                      hourMinute?.blocked
                        ? "border-[#D4B8B7] text-[#D4B8B7] hover:cursor-not-allowed hover:text-[#D4B8B7] hover:border-[#D4B8B7]"
                        : "border-black hover:bg-black hover:text-white cursor-pointer"
                    }
                  ${
                    selectedTime === hourMinute?.minute &&
                    "bg-black text-white "
                  }
                  `}
                    onClick={() => !hourMinute?.blocked &&   setSelectedTime(hourMinute?.minute)}
                    key={hourMinute?.minute.split(":")}
                  >
                    {hourMinute?.minute}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showBookButton && (
        <div
          className="w-full sticky bottom-0 left-0  bg-white"
          style={{
            borderTop: "0.5px solid #8C8C8C40",
            borderBottom: "0.5px solid #8C8C8C40",
          }}
        >
          <div className="p-2  lg:px-2.5 xl:px-0  xl:w-[1200px] relative mx-auto  flex justify-end items-center">
            <div className="flex gap-10">
              <Link to="summary">
                <button
                  onClick={() => {
                    dispatch(addEventTreatments());
                    dispatch(addEventsToTotal(["status", "BOOKED"]));
                  }}
                  className="px-7 py-1 bg-[#7338ac] hover:cursor-pointer hover:bg-[#5a2888] transition-all rounded-lg font-light text-white  text-sm leading-9"
                >
                  {t("book_in_calendar")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCalendar;
