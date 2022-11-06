import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../../Layouts/Layout";
import empPic from "./../../../Assets/Images/treatment-employee.png";
import instaPurple from "./../../../Assets/Images/instagram-purple.svg";
import fbPurple from "./../../../Assets/Images/fb-purple.svg";
import twitterPurple from "./../../../Assets/Images/twitter-purple.svg";
// import rightArrow from "./../../../Assets/Images/right-arrow.svg";
import TotalPriceCard from "../TotalPriceCard/TotalPriceCard";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  addEventsToTotal,
  selectEmployee,
} from "../../../Redux/features/bookingSlice";
import { getPrice } from "../../../Utils/PriccingOptions.util";
import { useTranslation } from "react-i18next";
import leftArrow from "./../../../Assets/Images/arrow-left.svg";

const Employees = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { pricingOption, treatment } = useSelector(
    (state) => state.bookingSlice
  );
  // let branchId = localStorage.getItem("branchId");
  const calcPercentOfSpecialPrice = (employee) => {
    return Math.floor(
      ((employee.price - employee.specialPrice) * 100) / employee.price
    );
  };


  const getEmployees = () => {
    const individualPricingEmployeeIds = pricingOption?.employees?.map(
      (emp) => emp.employeeId
    );

    return treatment?.employees?.map((emp) => {
      let employee = {
        ...emp,
        price: pricingOption.price,
        specialPrice: pricingOption.specialPrice,
        priceType: pricingOption.priceType,
        duration: pricingOption.duration,
        priceMin: pricingOption.priceMin,
        isIndividual: false,
      };

      if (individualPricingEmployeeIds?.includes(emp.id)) {
        const index = pricingOption?.employees?.findIndex(
          (poe) => poe.employeeId === emp.id
        );
        employee = {
          ...employee,
          price: pricingOption.employees[index].price,
          specialPrice: pricingOption.employees[index].specialPrice,
          priceType: pricingOption.employees[index].priceType,
          duration: pricingOption.employees[index].duration,
          priceMin: pricingOption.employees[index].priceMin,
          discountPercentage: calcPercentOfSpecialPrice(
            pricingOption.employees[index]
          ),
          isIndividual: true,
        };
      }

      return employee;
    });
  };

  // useEffect(() => {
  //   if (getEmployees().length === 1) {
  //     dispatch(selectEmployee(getEmployees()[0]));
  //     dispatch(addEventsToTotal(["employee", getEmployees()[0]]));
  //     navigate(`${getEmployees()[0].id}/calendar`);
  //   }
  // }, []);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  return (
    <Layout showNavbar={screenWidth >= 1024 ? false : true}>
      <div className="lg:pt-[110px] pt-[170px]  px-4 lg:px-2.5 xl:px-0 xl:w-[1200px] mx-auto justify-center flex gap-16 ">
        <div className=" pt-0 " style={{ flex: 2 }}>
          <h1 className="hidden lg:block font-medium text-[40px] lead mb-[90px]">
            {t("find_a_master")}
          </h1>
          <div className="lg:hidden fixed top-0 left-0 z-50 w-full pt-11 px-5 pb-8 bg-[#FF00001A] flex justify-between items-center">
            <button onClick={() => navigate(-1)}>
              <img src={leftArrow} alt="left arrow" />
            </button>
            <p className="m-0 text-2xl font-medium">{t("master")}</p>
            <p className="m-0"></p>
          </div>
          <div className="w-full sm:grid md:grid-cols-3 sm:grid-cols-2  flex flex-col items-center gap-x-10 gap-y-[90px]">
            {getEmployees()?.map((employee) => {
              return (
                <div
                  key={employee?.id}
                  className="  lg:w-[210px] w-[230px] pt-[60px] px-[25px] pb-[30px] bg-white custom-purple-shadow rounded-lg relative"
                >
                  {employee?.discountPercentage && (
                    <div
                      className="absolute py-1 px-3 bg-[#FF00001A] text-black font-medium text-[11px] leading-5 flex items-center justify-center top-0 right-0 "
                      style={{ borderRadius: "0px 8px 8px 8px" }}
                    >
                      {`-${employee?.discountPercentage}%`}
                    </div>
                  )}
                  <div className="w-[90px] h-[90px] absolute -top-[45px] left-1/2 -translate-x-1/2">
                    <img src={empPic} alt="employee" />
                  </div>
                  <div>
                    <h2 className=" text-center font-medium text-xl leading-[30px] m-0">
                      {employee.name + " " + employee?.surname}
                    </h2>
                    <p className="text-center font-light text-base leading-6 text-[#8c8c8c]">
                      Make up artist
                    </p>
                    <div className="w-full flex justify-center items-center gap-[30px] mb-5">
                      <p>
                        <img src={instaPurple} alt="instagram" />
                      </p>
                      <p>
                        <img src={fbPurple} alt="facebook" />
                      </p>
                      <p>
                        <img src={twitterPurple} alt="twitter" />
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between g-1">
                      <p className="text-sm m-0  text-[#8c8c8c] w-full text-center">
                        {getPrice(employee)}
                      </p>
                      <Link
                        to={`${employee.id}/calendar`}
                        onClick={() => {
                          dispatch(selectEmployee(employee));
                          dispatch(addEventsToTotal(["employee", employee]));
                        }}
                      >
                        <BsArrowRight color="black" size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden lg:block" style={{ flex: 1 }}>
          <TotalPriceCard />
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
