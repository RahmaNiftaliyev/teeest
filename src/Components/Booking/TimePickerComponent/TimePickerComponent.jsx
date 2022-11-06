import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addEventsToTotal,
  selectTime,
} from "../../../Redux/features/bookingSlice";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./../../../Assets/Styles/customTimePicker.css";
const { Option } = Select;

const TimePickerComponent = ({ hourData, setShowBookButton }) => {
  const dispatch = useDispatch();
  const defaultValue = `${hourData?.hour} - ${
    hourData?.minutes[hourData?.minutes?.length - 1]?.minute
  }`; // bunu constant kimi teyin etmek daha duzgun olar
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(null);

  const { time } = useSelector((state) => state.bookingSlice);
  useEffect(() => {
    // useEffect will work in all `TimePickerComponent` components and reset select value
    setValue(null);
  }, [time]);

  const handleChange = (value) => {
    dispatch(selectTime(value));
    dispatch(addEventsToTotal(["time", value]));

    setTimeout(() => {
      // waiting for reset to work
      setValue(value);
      setShowBookButton(true);
    }, 50);
  };
  return (
    <div className={`w-[300px] h-[68px] app__custom_box_shadow rounded-lg overflow-hidde`}>
      <Select
        placeholder={defaultValue}
        className="h-[68px] customSelect"
        onBlur={false}
        style={{
          width: 300,
          borderRadius: 40,
        }}
        // getPopupContainer={triggerNode => triggerNode.parentElement}
        dropdownClassName="test_class"
        onDropdownVisibleChange={(open) => setIsActive(open)}
        onChange={(value, option, index) => handleChange(value)}
        bordered={false}
        value={value}
        suffixIcon={
          isActive ? (
            <IoIosArrowUp size={24} color="#292D32" />
          ) : (
            <IoIosArrowDown size={24} color="#292D32" />
          )
        }
      >
        {hourData?.minutes?.map((hourItem, index) => (
          <Option
            style={{
              color: "#000",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "30px",
              padding: 10,
            }}
            value={hourItem?.minute}
            disabled={hourItem?.blocked}
            className={`${hourItem?.blocked && "bg-[#ececec] text-[#ccc] "}`}
            key={index}
          >
            
            {hourItem?.minute}
          </Option>
        ))}
      </Select>
    </div>
  );
};
// className='my-[10px] font-normal text-2xl leading-9 text-[#000]'
export default TimePickerComponent;
