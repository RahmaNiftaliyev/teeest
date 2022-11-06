import React from "react";
import Title from "../Common/Title";
import { FaArrowUp } from "react-icons/fa";
import { useGetStatisticsQuery } from "../../Redux/services/StatisticApi";
import { AiFillFire } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsFillCalendarFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Statistic = () => {
  const { data: statisticsData } = useGetStatisticsQuery();
  const statistics = statisticsData?.data;
  const { t } = useTranslation();

  return (
    <div className=" m-auto pt-20 px-4 md:px-8 mb-20">
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="max-w-[430px]">
          <Title>{t("statistics")}</Title>
          <p className="text-primary-color font-medium text-2xl leading-10 mt-8">
            {t("onesolution")}
          </p>
        </div>
        <div className="flex  gap-x-5 lg:gap-x-24 lg:items-center">
          <div className="statistic-box mt-0 flex-1 lg:mt-10  lg:w-[280px">
            <h5 className="font-normal lg:text-[22px] text-[#464646] flex items-center gap-x-2.5 capitalize">
              <span className="bg-[#11A9FF] p-2.5 rounded-full text-white text-sm">
                <FaUserAlt />
              </span>
              {statistics && t(Object.keys(statistics)[0])}
            </h5>
            <p className="font-semibold text-2xl lg:text-4xl">
              {/* +{statistics?.customers.count} */}3000+
            </p>
            {/* <div className="flex">
              <span className="text-[#02c121] text-xs lg:text-lg flex items-center gap-1.5 lg:gap-3">
                <FaArrowUp />
                {statistics?.customers.increasePercentage.toFixed(2)}%
              </span>
              <span className=" font-normal text-xs lg:text-lg text-[#818181] ml-2 lg:ml-2.5">
                {t("last_7days")}
              </span>
            </div> */}
          </div>
          <div className="statistic-box flex-1  lg:w-[280px]">
            <h5 className="font-normal lg:text-[22px] text-[#464646] flex items-center gap-x-2.5 capitalize">
              <span className="bg-[#8A59BA] p-2.5 rounded-full text-white text-sm">
                <BsFillCalendarFill />
              </span>
              {statistics && t(Object.keys(statistics)[1])}
            </h5>
            <p className="font-semibold text-2xl lg:text-4xl">
              {/* +{statistics?.booking.count} */}8000+
            </p>
            {/* <div className="flex">
              <span className="text-[#02c121] text-xs lg:text-lg flex items-cente gap-1.5 lg:gap-3">
                <FaArrowUp />
                {statistics?.booking.increasePercentage.toFixed(2)}%
              </span>
              <span className=" font-normal text-xs lg:text-lg text-[#818181] ml-2 lg:ml-2.5">
                {t("last_7days")}
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex gap-x-5 lg:gap-x-36 mt-5 lg:mt-14 lg:items-center w-[100%] lg:justify-end -ml-0 lg:-ml-24">
        <div className="statistic-box mt-0 lg:mt-10  w-[50%]   lg:w-[280px]">
          <h5 className="font-normal lg:text-[22px]  text-[#464646] flex items-center gap-x-2.5 capitalize">
            <span className="bg-[#FF6E1D] p-2.5 rounded-full text-white text-sm">
              <AiFillFire />
            </span>
            {statistics && t(Object.keys(statistics)[2])}
          </h5>
          <p className="font-semibold text-2xl lg:text-4xl">
            +{statistics?.partners.count}
          </p>
          {/* <div className="flex">
            <span className="text-[#02c121] text-xs lg:text-lg flex items-center gap-1.5 lg:gap-3">
              <FaArrowUp />
              {statistics?.partners.increasePercentage.toFixed(2)}%
            </span>
            <span className=" font-normal text-xs lg:text-lg text-[#818181] ml-2 lg:ml-2.5">
              {t("last_7days")}
            </span>
          </div> */}
        </div>
        <div className="statistic-box w-[50%]  lg:w-[280px]">
          <h5 className="font-normal text-xs lg:text-[22px]  text-[#464646] flex items-center gap-x-2.5">
            <span className="bg-[#FF6E1D] p-2 rounded-full text-white text-sm">
              <AiFillFire />
            </span>
            {t("professionals")}
          </h5>
          <p className="font-semibold text-2xl lg:text-4xl">400+</p>
          {/* <div className="flex">
            <span className="text-[#02c121] text-xs lg:text-lg flex items-center gap-1.5 lg:gap-3">
              <FaArrowUp />
              {statistics?.customers.increasePercentage.toFixed(2)}%
            </span>
            <span className=" font-normal text-xs lg:text-lg text-[#818181] ml-2 lg:ml-2.5">
              {t("last_7days")}
            </span>
          </div> */}
        </div>
      </div>
      {/* <div className="flex">
        <div className="max-w-[430px]">
          <Title>Statistics</Title>
          <p className="text-primary-color font-medium text-2xl leading-10 mt-8">
            “There are three types of lies lies, damn lies, and
            statistics.”
          </p>
        </div>
      </div>
      <div className="statistic-container-2 ml-28 relative h-[580px]">
        <div className="relative w-full">
          <div className="statistic-box absolute">
            <div className="ml-[20px] mt-[20px] mr-[60px] mb-[27px]">
              <h5 className="font-normal text-[22px]  text-[#464646] flex items-center gap-x-2.5">
                <img src={statistic1} /> Customers
              </h5>
              <p className="font-semibold text-4xl">
                +{statistics?.customers.count}
              </p>
              <div className="flex">
                <span className="text-[#02c121] text-lg flex items-center gap-3">
                  <FaArrowUp />
                  {statistics?.customers.increasePercentage.toFixed(2)}%
                </span>
                <span className="font-normal text-lg text-[#818181] ml-2.5">
                  vs last 7 days
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="statistic-box absolute">
            <h5 className="font-normal text-[22px] leading-8 text-[#464646] flex items-center gap-2.5">
              <img src={statistic2} /> Booking
            </h5>
            <p className="font-semibold text-4xl mt-5">
              +{statistics?.booking.count}
            </p>
            <div className="flex">
              <span className="text-[#02c121] text-lg flex items-center gap-3">
                <FaArrowUp />
                {statistics?.booking.increasePercentage.toFixed(2)}%
              </span>
              <span className="font-normal text-lg text-[#818181] ml-2.5">
                vs last 7 days
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="statistic-box absolute">
            <h5 className="font-normal text-[22px] leading-8 text-[#464646] flex items-center gap-2.5">
              <img src={statistic2} /> Booking
            </h5>
            <p className="font-semibold text-4xl mt-5">
              +{statistics?.partners.count}
            </p>
            <div className="flex">
              <span className="text-[#02c121] text-lg flex items-center gap-3">
                <FaArrowUp />
                {statistics?.partners.increasePercentage.toFixed(2)}%
              </span>
              <span className="font-normal text-lg text-[#818181] ml-2.5">
                vs last 7 days
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="statistic-box absolute ">
            <h5 className="font-normal text-[22px] leading-8 text-[#464646]">
              Partners
            </h5>
            <p className="font-semibold text-4xl mt-5">
              +{statistics?.partners.count}
            </p>
            <div className="flex">
              <span className="text-[#02c121] text-lg flex items-center gap-3">
                <FaArrowUp />
                {statistics?.partners.increasePercentage.toFixed(2)}%
              </span>
              <span className="font-normal text-lg text-[#818181] ml-2.5">
                vs last 7 days
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Statistic;
