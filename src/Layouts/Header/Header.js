import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";

const Header = ({ setCurrentPage, language, setLanguage }) => {
  return (
    <div>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Header;
