import React, { useState } from "react";
import SignUpForm from "../../Auth/SignUpForm";
import SignInForm from "../../Auth/SignInForm";
import closeIcon from "./../../../Assets/Images/closeIcon.svg";
import { Col } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/features/loadingSpinnerSlice";
import { onLogin } from "../../Auth/auth.util";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../../Config/config.constant";
import { useParams } from "react-router-dom";
import { useGetOrganizationInfoQuery } from "../../../Redux/services/OrganizationInfo";

const organizationUrl = `${API_URL}/organizations`;

const AuthModal = ({ setOpenModal, submitEvent }) => {
  const [signInOrSignUp, setSignInOrSignUp] = useState("signIn");
  // const [organizationInfo, setOrganizationInfo] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { data: orgInfo, refetch } = useGetOrganizationInfoQuery({ slug });

  const getClientInfo = async () => {
    await axios
      .get(`${API_URL}/clients/info`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let isInfoTrue = true;
          let orgId = orgInfo?.data?.id;
          let { name, surname, gender, phoneNumber } = res.data?.data;
          let clientInfo = { name, surname, gender, phoneNumber };
          submitEvent(clientInfo, isInfoTrue, orgId);
        }
      })
      .catch((err) => {
        console.log("something went wrong. please try again :((");
      });
  };

  const handleLogin = (values, login) => {
    dispatch(setLoading(true));
    onLogin(values, dispatch, login)
      .then((res) => {
        if (res === "SUCCESS") {
          getClientInfo();
        }
      })
      .catch((err) => {
        if (err?.status === 401) {
          toast.error(t("PasswordOrPhoneNotCorrect"));
        } else {
          err.response?.data.message &&
            toast.error(t(err.response?.data.message));
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="app__terms_modal fixed w-full h-screen top-0 left-0 z-[51]  flex justify-center items-center">
      <div
        onClick={() => setOpenModal(false)}
        className="absolute w-full h-screen top-0 left-0 z-40 bg-[#00000050]"
      ></div>
      <div className="app__terms_modal_overlay relative bg-white w-[720px] max-w-[720px] h-[90%] md:px-9 px-2 md:m-0 m-1   pt-20 pb-4 rounded-3xl z-50">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-9 right-9 "
        >
          <img src={closeIcon} alt="close icon" />
        </button>
        <div className="w-full h-[99%]  app__terms_custom_scrollbar flex flex-col items-center justify-start relative p-1 md:px-12 px-2">
          {signInOrSignUp === "signIn" ? (
            <>
              <SignInForm handleLogin={handleLogin} />

              <div className="text-[#8C8C8C] font-normal text-base pt-10 flex justify-center items-center text-center">
                {t("dont_have_account")}
                <button
                  onClick={() => setSignInOrSignUp("signUp")}
                  className="ml-1 text-primary-color"
                >
                  {t("signup_long")}
                </button>
              </div>
            </>
          ) : (
            <>
              <SignUpForm loginAfterRegister={handleLogin} />

              <div className="text-[#8C8C8C] font-normal text-base pt-10 flex justify-center items-center text-center">
                {t("already_have_account")}
                <button className="ml-1 text-primary-color">
                  <button onClick={() => setSignInOrSignUp("signIn")}>
                    {t("login")}
                  </button>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
