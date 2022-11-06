import React, { useState } from "react";
import { MaskedInput } from "antd-mask-input";
import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle initialValue={"+994"}>
    <Select
      size="large"
      className="select-prefix"
      style={{ width: "150px" }}
    >
      <Option value="+994">+994</Option>
    </Select>
  </Form.Item>
);

function PhoneNumberInput(props) {
  const [numberMask, setNumberMask] = useState("");
  const { t } = useTranslation();

  const onChange = (e) => {
    setNumberMask(e.target.value);
  };
  const regex =
    /^(5[015]|7[07]|99|60|10)([2-9][0-9]{2})([0-9]{2})([0-9]{2}){1}$/;

  return (
    <Form.Item
      name="phoneNumber"
      label={t("phoneNumber")}
      rules={[
        {
          required: true,
          message: t("ThisFieldMustBeFilled"),
        },
        {
          validator(_, value) {
            regex.test(value?.replace(/[^+\d]/g, ""));
            if (regex.test(value?.replace(/[^+\d]/g, ""))) {
              return Promise.resolve();
            } else {
              return Promise.reject(
                t("numberIsNotGivenInTheCorrectFormat"),
              );
            }
          },
        },
      ]}
    >
      <MaskedInput
        addonBefore={prefixSelector}
        className="input-phone-number"
        value={numberMask}
        name="phoneNumber"
        placeholder="(XX) XXX XX XX"
        mask="(00) 000 00 00"
        size="large"
        {...props}
        onChange={onChange}
        definitions={regex}
      />
    </Form.Item>
  );
}

export default PhoneNumberInput;
