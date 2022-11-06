import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ScrollTop from "../Components/ScrollTop/ScrollTop";
import Footer from "./Footer/Footer";
import { useTranslation } from "react-i18next";

const Layout = ({ children, setCurrentPage, currentPage, showNavbar }) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "az"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language, i18n]);

  return (
    <div className="w-full min-h-[100vh] relative">
      <ScrollTop />
      {!showNavbar && <Navbar
        language={language}
        setLanguage={setLanguage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      /> }
      <main> {children}</main>
      <Footer language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Layout;
