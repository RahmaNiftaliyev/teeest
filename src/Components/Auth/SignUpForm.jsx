import { Button, Col, Form, Input, Radio, Row, Checkbox } from "antd";
import React, { useState } from "react";
import PhoneInput from "../Common/PhoneInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config/config.constant";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/features/loadingSpinnerSlice";
import { useTranslation } from "react-i18next";
import TermsAndConditionsModal from "../TermsAndConditionsModal/TermsAndConditionsModal";
import { onRegister } from "./auth.util";
import { useLoginMutation } from "../../Redux/features/loginApiSlice";

const SignUpForm = ({loginAfterRegister}) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [login] = useLoginMutation();

  const register = async (values) => {
    dispatch(setLoading(true));
    await onRegister(values)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const { loginData } = res;
          loginAfterRegister(loginData, login);
        }
      }) 
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error(t("USER_IS_ALREADY_REGISTERED_WITH_SUCH_PHONE"));
        } else {
          err.response?.data.message && toast(t(err.response?.data?.message));
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };


  const handleOpenTermsAndConditionsModal = () => {
    setOpenModal(true);
  };

  const handleDeclineTerms = () => {
    setOpenModal(false);
    form.setFieldsValue({
      agreement: false,
    });
  };

  const handleAcceptTerms = () => {
    setOpenModal(false);
    form.setFieldsValue({
      agreement: true,
    });
  };

  return (
    <div className="max-w-[440px]">
      {openModal && (
        <TermsAndConditionsModal
          handleAcceptTerms={handleAcceptTerms}
          handleDeclineTerms={handleDeclineTerms}
          setOpenModal={setOpenModal}
        />
      )}
      <h3 className="text-3xl md:text-5xl font-normal leading-[72px]">
        {t("create_account")}
      </h3>

      <Form form={form} layout="vertical" onFinish={register}>
        <Row gutter={8}>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={t("first_name")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("ThisFieldMustBeFilled"),
                },
              ]}
            >
              <Input autoComplete="new-name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item label={t("last_name")} name="surname">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Col md={24}>
          <Form.Item label={t("gender")} name="gender">
            <Radio.Group>
              <Radio value="FEMALE">{t("female")}</Radio>
              <Radio value="MALE">{t("male")}</Radio>
              <Radio value="UNI">{t("other")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col md={24}>
          <PhoneInput />
        </Col>

        <Col md={24} lg={24}>
          <Form.Item
            label={t("password")}
            name="password"
            type="password"
            rules={[
              {
                required: true,
                message: t("ThisFieldMustBeFilled"),
              },
              {
                min: 8,
                message: t("passwordValidation"),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={24} lg={24}>
          <Form.Item
            label={t("re-enter_password")}
            name="password2"
            type="password"
            rules={[
              {
                required: true,
                message: t("PasswordsAreNotTheSame"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error(t("PasswordsAreNotTheSame")));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Should accept Terms and Conditions")
                      ),
              },
            ]}
          >
            <Checkbox>
              I accept &nbsp;
              <button
                type="button"
                className="text-[#8A59BA] hover:underline"
                onClick={() => handleOpenTermsAndConditionsModal()}
              >
                Terms and Conditions
              </button>
            </Checkbox>
          </Form.Item>
        </Col>
        <Col
          style={{
            justifyContent: "space-between",
          }}
        >
          <p className="mb-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <a className="" href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </p>
        </Col>

        <Col md={24} lg={24}>
          <Form.Item>
            <Button htmlType="submit" className="signin-btn">
              {t("signup_long")}
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  );
};

export default SignUpForm;
