import React from "react";
import whitelogo from "../../Assets/Images/whitelogo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import az from "./../../Assets/Images/az.png";
import ru from "./../../Assets/Images/ru.png";
import en from "../../Assets/Images/en.png";
import { Select } from "antd";
import Language from "../../Components/Language/Language";

const { Option } = Select;
const Footer = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-footer-color pt-20 mt-10">
      <div className="xl:w-[1200px] mx-auto px-2 ">
        <div className="block lg:hidden mb-7">
          <img src={whitelogo} alt="logo" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 pb-14 ">
          <div className="hidden lg:block">
            <img src={whitelogo} alt="logo" />
          </div>
          <div>
            <ul>
              <h3 className="font-semibold text-white text-xl leading-7 mb-6">
                {t("information")}
              </h3>
              <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to="/blog"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to="/features"
                >
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to="/pricing"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to="/social-media"
                >
                  {t("social_media")}
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to="/contact"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white text-xl leading-7 mb-6">
              {t("locate_us")}
            </h3>
            <ul>
              <li>
                <a
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  href="tel:+9940125667834"
                >
                  +994 055 997 66 44
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  href="mailto:rihand@gmail.com"
                >
                  support@rihand.az
                </a>
              </li>
              <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to=""
                >
                  Bakı şəhəri, Nərimanov rayonu, Zaur Nudirəliyev küçəsi,
                  79
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white text-xl leading-7 mb-6">
              {t("social_media")}
            </h3>
            <ul>
              <li>
                <a
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  href="https://instagram.com/rihand_az?igshid=YmMyMTA2M2Y="
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  href="https://www.facebook.com/rihand.azerbaycan"
                >
                  Facebook
                </a>
              </li>
              {/* <li>
                <Link
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  to=""
                >
                  Pinterest
                </Link>
              </li> */}
              <li>
                <a
                  className="font-medium text-white text-base leading-6 mb-2 lg:mb-5 inline-block hover:text-primary-color"
                  href="https://www.linkedin.com/company/rihand-mmc/mycompany/"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white text-xl leading-7 mb-6">
              {t("subscribe")}
            </h3>
            <form>
              <input
                className="w-[100%] border-0  bg-transparent border-b-2 pb-2 outline-none text-white placeholder:text-white placeholder:text-base"
                type="text"
                placeholder={t("enter_your_email_address")}
              ></input>
            </form>
          </div>
        </div>
        <div className="border-t-2 border-[#8C8C8C]">
          <div className="flex justify-between py-10">
            <div>
              <span className="font-semibold text-lg leading-6 text-[#8C8C8C]">
                2022 Copyright
              </span>
            </div>
            <div className="hidden md:flex">
              <Link
                to={"/privacy"}
                className="font-semibold text-lg leading-6 text-[#8C8C8C]"
              >
                Terms and Conditions | Privacy Policy
              </Link>
            </div>
            <div>
              <div className="footer-lang-selector lang-selector">
                <Language/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
