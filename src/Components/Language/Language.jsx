import React from "react";
import { Select } from "antd";
import az from "./../../Assets/Images/az.png";
import ru from "./../../Assets/Images/ru.png";
import en from "../../Assets/Images/en.png";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Redux/features/languageSlice";
const { Option } = Select;

const Language = () => {
//   const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.currentLang)
    return (
    <Select
      onChange={(value) => dispatch(setLanguage(value))}
      value={language}
      defaultValue={localStorage.getItem("lang")}
      style={{ width: 100 }}
      bordered={false}
      optionLabelProp="label"
    >
      <Option style={{ fontSize: "18px", width: "100%" }} value="az" label="Az">
        <div className="flex items-center">
          <span className="flex" role="img">
            <img src={az} alt="" className="lang-img" />
          </span>
          <span className="ml-2.5">Az</span>
        </div>
      </Option>
      <Option style={{ fontSize: "18px" }} value="ru" label="Ру">
        <div className="flex items-center justify-start">
          <span role="img">
            <img src={ru} alt="flag" className="lang-img" />
          </span>
          <span className="ml-2.5">Ру</span>
        </div>
      </Option>
      <Option style={{ fontSize: "18px" }} value="en" label="En">
        <div className="flex items-center justify-start">
          <span role="img">
            <img src={en} alt="flag" className="lang-img" />
          </span>
          <span className="ml-2.5">En</span>
        </div>
      </Option>
    </Select>
  );
};

export default Language;
