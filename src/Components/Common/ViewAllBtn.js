import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ViewAllBtn = ({ path }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={path}
      className="text-black font-normal text-sm lg:text-xl leading-5 lg:leading-8"
    >
      {t("view_all")}
    </Link>
  );
};

export default ViewAllBtn;
