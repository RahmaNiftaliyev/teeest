import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import customer from "../../Assets/Images/customer.png";
import business from "../../Assets/Images/Business.png";
import Title from "../Common/Title";
import { Link } from "react-router-dom";
import { redirect } from "../../Utils/isFavorites.util";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const JoinUs = () => {
  const currentPage = localStorage.getItem("currentPage");
  const { t } = useTranslation();
  
  const {  i18n } = useTranslation();
  const language = useSelector(state => state.language.currentLang)
  

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language, i18n]);
  return (
    <>
      <Navbar  />
      <div className="max-w-[1000px] m-auto">
        <div className="mt-24 mb-36 p-4 md:p-0 ">
          <div className="pt-10 mb-14">
            <Title>{t("join_us")}</Title>
          </div>
          <div className="flex flex-col items-center lg:flex-row gap-x-28 gap-y-10">
            <Link className="text-black w-full" to={currentPage}>
              <div>
                <img src={customer} alt="customer" />
              </div>
              <div className="rounded-xl p-5 shadow">
                <h4 className="font-medium text-2xl ">{t("customer")}</h4>
                <p className="font-normal text-lg ">
                {t("book_salons_and_spas_near_you")}
                </p>
              </div>
            </Link>

            <Link
              target="_blank"
              className="text-black w-full"
              to="redirect"
              rel="noopener noreferrer"
              onClick={() =>
                redirect(
                  currentPage === "/signin"
                    ? "https://partner.rihand.az/login"
                    : "https://partner.rihand.az/register",
                )
              }
            >
              <div>
                <img src={business} alt="customer" />
              </div>
              <div className="rounded-xl p-5 shadow">
                <h4 className="font-medium text-2xl ">{t("business")}</h4>
                <p className="font-normal text-lg">
                {t("manage_and_grow_your_business")}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="border-t-[1px] border-[#8C8C8C] p-4 md:p-0">
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
            <div>
              <span className="font-semibold text-lg leading-6 text-[#8C8C8C]">
                English
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinUs;
