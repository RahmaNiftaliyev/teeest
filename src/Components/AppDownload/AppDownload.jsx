import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import appImg from "../../Assets/Images/app.png";
import appstore1 from "../../Assets/Images/appstore1.png";
import appstore2 from "../../Assets/Images/appstore2.png";
import { redirect } from "../../Utils/isFavorites.util";

const AppDownload = () => {
  const { t } = useTranslation();
  return (
    <div style={{ backgroundColor: "#f2f2f7" }}>
      <div className="xl:w-[1200px] mx-auto px-4 md:px-2">
        <div className="flex flex-col lg:flex-row items-center pt-12 justify-between">
          <div className="flex flex-col">
            <div className="w-[100%] lg:w-[500px] order-1">
              <h2 className="text-primary-color font-semibold text-4xl mb-25">
                {t("apptitle1")}
              </h2>
              <h4 className="font-normal text-3xl leading-10 w-72">
                {t("download_app")}
              </h4>
              <p className="text-xl font-light">{t("apptitle2")}</p>
            </div>
            <div className="hidden lg:flex gap-x-10  items-center order-3">
              <Link
                onClick={() =>
                  redirect(
                    "https://play.google.com/store/apps/details?id=com.rihandpartner",
                  )
                }
                to="redirect"
                className="h-[60px]"
              >
                <img
                  className=" h-[100%] object-cover"
                  src={appstore1}
                  alt="app"
                ></img>
              </Link>
              <div className="order-2">
                <img
                  className="h-[100%] object-cover"
                  src={appstore2}
                  alt="app"
                ></img>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden lg:gap-x-10 gap-x-2.5 h-20 items-center order-3">
            <a href="https://play.google.com/store/apps/details?id=com.rihandpartner">
              <img
                className="h-[40px] lg:h-[60px] object-cover"
                src={appstore1}
                alt="app"
              ></img>
            </a>
            <div className="h-[40px]  order-2">
              <img
                className="h-[100%] object-cover"
                src={appstore2}
                alt="app"
              ></img>
            </div>
          </div>
          <div className="h-[400px] lg:h-[630px] order-2">
            <img className="h-full" src={appImg} alt="app"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
