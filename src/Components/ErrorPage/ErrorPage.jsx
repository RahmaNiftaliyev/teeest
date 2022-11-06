import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col text-center justify-center h-[100vh]">
        <h1 className="text-6xl text-primary-color">
          <p className="mb-2.5">404</p> Page Not Found 😟
        </h1>
        <Link
          className="text-white bg-primary-color py-3 px-12 rounded-full"
          to="/"
        >
          {t("go_to_home")}
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ErrorPage;
