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
import { BsArrowLeft } from "react-icons/bs";
import TermsAndConditionsModal from "../TermsAndConditionsModal/TermsAndConditionsModal";
import SignUpForm from "./SignUpForm";
import { useLoginMutation } from "../../Redux/features/loginApiSlice";
import { onLogin } from "./auth.util";
import signUpImg from "../../Assets/Images/signup.png";

const SignUp = () => {
  const [openModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [login] = useLoginMutation();

  // BU KOD REGISTER MODALDA DA ISTIFADE OLUNMALI OLDUGUNA GORE SignUp KOMPONENTINE PROPS KIMI OTURULUR
  const loginAfterRegister = (values) => {
    dispatch(setLoading(true));
    onLogin(values, dispatch, login)
      .then((res) => {
        if (res === "SUCCESS") navigate("/");
      })
      .catch((err) => {
        err.response?.data.message && toast(t(err.response?.data?.message));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  // const register = (values) => {
  //   let phoneNumber = values.prefix + values.phoneNumber.replace(/[^+\d]/g, "");
  //   if (values.surname === undefined || values.surname === null) {
  //     values.surname = "";
  //   }
  //   delete values.prefix;
  //   delete values.password2;
  //   delete values.agreement;

  //   let data = {
  //     ...values,
  //     deleted: false,
  //     phoneNumber,
  //   };
  //   if (values.password.length < 8) {
  //     dispatch(setLoading(false));
  //   } else {
  //     dispatch(setLoading(true));
  //     axios({
  //       method: "POST",
  //       url: API_URL + "/auth/register",
  //       data,
  //     })
  //       .then((res) => {
  //         dispatch(setLoading(false));

  //         let data = res.data.data;

  //         localStorage.setItem("ACCESS_TOKEN", data?.accessToken);
  //         localStorage.setItem("clientName", data?.name);
  //         localStorage.setItem("clientSurname", data?.surname);
  //         localStorage.setItem("clientPassword", data?.password);
  //         localStorage.setItem("clientPhoneNumber", data?.phoneNumber);
  //         axios({
  //           method: "POST",
  //           url: API_URL + "/auth/login",
  //           data,
  //         }).then(async (response) => {
  //           navigate("/");
  //         });
  //       })
  //       .catch((err) => {
  //         dispatch(setLoading(false));
  //         console.log(err.response);
  //         if (err.response.status === 409) {
  //           toast.error(t("USER_IS_ALREADY_REGISTERED_WITH_SUCH_PHONE"));
  //         } else {
  //           err.response?.data.message && toast(t(err.response?.data?.message));
  //         }
  //       })
  //       .finally(() => {
  //         console.log("finally");
  //       });
  //   }
  // };

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
    <>
      {openModal && (
        <TermsAndConditionsModal
          handleAcceptTerms={handleAcceptTerms}
          handleDeclineTerms={handleDeclineTerms}
          setOpenModal={setOpenModal}
        />
      )}
          <button onClick={() => navigate(-1)} className="arrow-container">
            <BsArrowLeft className="auth-icon" />
          </button>
      <div className="block md:flex  mx-auto">
        <div className="hidden flex-1 md:block">
          <img alt="" src={signUpImg} className="h-full object-cover" />
        </div>
        {/* <div> */}
        <div className="flex md:flex-1 w-full flex-col justify-center min-h-screen ">
          <Row justify="center" className="w-full p-4">
            <SignUpForm loginAfterRegister={loginAfterRegister} />
          </Row>
          {/* <Row
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Col md={12}>
                <Button className="google-btn">
                  <img src={google} alt="google" className="mr-2.5" /> Sign
                  with Google
                </Button>
              </Col>
              <Col md={12}>
                <Button className="facebook-btn">
                  <img src={facebook} alt="facebook" className="mr-2.5" />
                  Sign with Facebook
                </Button>
              </Col>
            </Row> */}
          <Row md={24} justify="center">
            <p className="text-[#8C8C8C] font-normal text-base pt-10 flex justify-center items-center text-center">
              {t("already_have_account")}
              <button className="ml-1 text-primary-color">
                <Link to="/signin">{t("login")}</Link>
              </button>
            </p>
          </Row>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default SignUp;
