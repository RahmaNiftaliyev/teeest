import React from "react";
import Iphone from "../../Assets/Images/app.png";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../Layouts/Header/Header";
import { AiFillInstagram } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const ComingSoon = ({ setCurrentPage }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      <div className="">
        <div className=" xl:w-[1200px] mx-auto">
          <div className="flex-col md:flex-row flex px-2 justify-between mt-28">
            <div className="pt-0 md:pt-24">
              <h1 className="font-semibold text-primary-color text-3xl md:text-4xl lg:text-5xl">
                {t("coming_soon")}..
              </h1>
              <p className="font-light text-xl md:text-2xl lg:text-3xl w-[40] md:w-[260px] leading-10">
                {t("getnotified")}
              </p>
              <div className="h-12 md:h-[70px] border-[1px] border-color-[#7338AC]  py-5 rounded-[48px] w-[100%] md:w-[560px] pr-2 flex justify-between items-center">
                <input
                  type="text"
                  className="p-5 md:pl-10 outline-none h-4 bg-transparent w-[60%] text-xs md:text-base lg:text-xl text-black placeholder:text-black"
                  placeholder={t("enter_your_email_address")}
                ></input>
                <button className="text-xs md:text-base lg:text-xl font-medium bg-primary-color text-white md:h-[44px] h-9 lg:h-[54px] px-8 lg:px-10 rounded-[48px]">
                  {t("notify_me")}
                </button>
              </div>
            </div>
            <div className="pt-6">
              <img src={'../../Assets/Images/app.png'} alt="" />
            </div>
          </div>
          <div>
            <ul className="w-[100%]  flex gap-x-10 text-center justify-center items-center pt-20 lg:pt-0  pb-20">
              <a
                href="https://www.facebook.com/rihand.azerbaycan"
                className="border-[1px] border-[#FFCD68]  p-2.5 rounded-full"
              >
                <FaFacebookF className="text-[#FFCD68] text-xl order-[1px] " />
              </a>
              <a
                href="https://instagram.com/rihand_az?igshid=YmMyMTA2M2Y="
                className=" border-[1px] border-[#FFCD68] p-2.5 rounded-full"
              >
                <AiFillInstagram className="text-[#FFCD68] text-xl" />
              </a>
              <Link
                to=""
                className=" border-[1px] border-[#FFCD68] rounded-full p-2.5"
              >
                <FaTwitter className="text-[#FFCD68] text-xl" />
              </Link>
            </ul>
          </div>
          <div className="border-t-[1px] border-[#8C8C8C] px-2">
            <div className="flex justify-between py-10">
              <div>
                <span className="font-semibold text-lg leading-6 text-[#8C8C8C]">
                  2022 Copyright
                </span>
              </div>
              <div className="hidden md:flex">
                <span className="font-semibold text-lg leading-6 text-[#8C8C8C]">
                  Terms and Conditions | Privacy Policy
                </span>
              </div>
              {/* <div>
                <span className="font-semibold text-lg leading-6 text-[#8C8C8C]">
                  English
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
