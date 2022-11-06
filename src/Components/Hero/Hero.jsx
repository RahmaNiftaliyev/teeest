import React from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { handleShowSearch } from "../../Redux/features/searchSlice";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  return (
    <div className="relative bg-pos mt-0 md:mt-24 h-[100vh] min-h[400px] w-[100%] bg-cover bg-no-repeat bg-hero-pattern">
      <div className="hidden lg:block h-[100vh] font-light max-w-[400px] lg:max-w-[520px] pt-36 pl-10 lg:pl-20  absolute top-0 left-0  z-1 bottom-0 mt-24 ">
        <h4 className="text-primary-color font-medium font-xl text-xl lg:text-[32px]">
          {t("mainslogan1")}
        </h4>
        <p className="text-xl lg:text-2xl leading-10">
          {t("mainslogan2")}
        </p>
      </div>
      <div
        onClick={() => dispatch(handleShowSearch(true))}
        className="block lg:hidden bg-white w-80 rounded-xl absolute bottom-10 left-[50%] translate-x-[-50%]"
      >
        <div className="flex py-2.5 px-3">
          <FiSearch className="mr-2.5  w-6 h-6 font-normal" />
          <input
            className="w-[100%] outline-none"
            type="text"
            placeholder={t("search")}
          ></input>
        </div>
      </div>
      <div className="hidden md:flex absolute right-5 top-[35%]  flex-col gap-5 ">
        <a
          target="_blank"
          href="https://instagram.com/rihand_az?igshid=YmMyMTA2M2Y="
          className="rounded-full border-[1px] w-12 h-12 flex justify-center items-center"
        >
          <AiFillInstagram className="text-white text-2xl" />
        </a>
        <a
          target="_blank"
          className="rounded-full border-[1px] w-12 h-12 flex justify-center items-center"
          href="https://www.facebook.com/rihand.azerbaycan"
        >
          <FaFacebookF className="text-white text-2xl" />
        </a>
        <a
          target="_blank"
          className="rounded-full border-[1px] w-12 h-12 flex justify-center items-center"
          href="https://api.whatsapp.com/send?text=Salam, RIHAND! &phone=+994559976644"
        >
          <FaWhatsapp className="text-white text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
