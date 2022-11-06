import React from "react";
import { useTranslation } from "react-i18next";
import Title from "../Common/Title";
import locationImg1 from "./../../Assets/Images/locations_section-img-1.png";
import locationImg2 from "./../../Assets/Images/locations_section-img-2.png";

import locNearImg from "./../../Assets/Images/loc-near-you-img.png";

const AlongLocations = ({ getCurrentPositions }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#F2F2F7] flex justify-center">
      <div className="w-[1200px] flex flex-col sm:flex-row md:justify-between items-center pt-[60px] m-auto p-4 px-4  ">
        <div className="flex flex-col sm:items-start items-center w-full">
          <h2
            className={`text-xl lg:text-3xl font-semibold leading-7 lg:leading-10 w-full text-center sm:text-left `}
          >
            {t("locations_near_you")}
          </h2>
          {/* <p className="font-normal text-2xl leading-10 mt-5 text-[#8c8c8c]">
            {t("locations_near_you_desc")}
          </p> */}
          <p
            className="text-primary-color text-4xl font-medium"
            // className="text-primary-color font-medium text-[22px] py-3 px-[60px] rounded-[48px] bg-white custom-purple-shadow hover:bg-primary-color hover:text-white transition-all "
            // type="button"
            // onClick={getCurrentPositions}
          >
            {t("coming_soon")}...
          </p>
          {/* <button
            style={{ boxShadow: "4px 4px 40px 0px #8C8C8C40" }}
            className="font-semibold md:text-[28px] text-xl md:leading-[42px] md:py-[15px] py-[10px] md:px-16 px-8 bg-white text-[#7338AC] rounded-[48px] hover:text-white hover:bg-[#7338AC]  "
          >
            Activate
          </button> */}
        </div>
        {/* <div className="relative top-0 right-0 w-full h-[520px] m-0"> */}
        <img
          src={locNearImg}
          alt="locations near you"
          className="lg:w-[516px] md:w-[400px] w-[300px] m-0"
        />
        {/* <div className="absolute top-[-35px] left-0">
            <img className="lg:w-[300px] w-[230px] object-cover " src={locationImg1} alt="test" />
          </div>
          <div className="absolute top-[130px] left-60">
            <img className="lg:w-[300px] w-[230px] object-cover " src={locationImg2} alt="test" />
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AlongLocations;
