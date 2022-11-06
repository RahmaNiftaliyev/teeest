import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ACCESS_TOKEN, API_URL } from "../../../Config/config.constant";
import { useSendEventMutation } from "../../../Redux/services/SendEventsApi";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useGetClientQuery } from "../../../Redux/services/ClientInfoApi";
import { useTranslation } from "react-i18next";
import AuthModal from "../AuthModal/AuthModal";
import leftArrow from "./../../../Assets/Images/arrow-left.svg";
import addCycle from "./../../../Assets/Images/add-circle.svg";

import { resetStates } from "../../../Redux/features/bookingSlice";
import { selectTime } from "../../../Redux/features/bookingSlice";
import { setLoading } from "../../../Redux/features/loadingSpinnerSlice";
import axios from "axios";
import toast from "react-hot-toast";

import Layout from "../../../Layouts/Layout";
import Spinner from "../../Spinner/Spinner";
import SummaryItem from "./SummaryItem";
import { useGetOrganizationInfoQuery } from "../../../Redux/services/OrganizationInfo";

// const organizationUrl = `${API_URL}/organizations`;

const SummaryPage = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug, branchId } = useParams();
  const { eventTreatments, date, total } = useSelector(
    (state) => state.bookingSlice
  );
  const loading = useSelector((state) => state.loadingSpinner.loading);
  const [openModal, setOpenModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const selectedBranch = useSelector((state) => state.bookingSlice);
  const [
    sendEvent,
    {
      isLoading: isEventSendLoading,
      isSuccess: isEventSendSuccess,
      isError: isEventSendError,
      error: eventSendError,
      status: eventSendStatus,
      originalArgs,
    },
  ] = useSendEventMutation();
  const { 
    data: clientData,
    isLoading, 
    isError, 
    isSuccess: isClientInfoSuccess
  } = useGetClientQuery();
  const { 
    data: orgInfo,
    isSuccess: isOrgInfoSucces, 
     refetch
    } = useGetOrganizationInfoQuery(slug)
  const { executeRecaptcha } = useGoogleReCaptcha();
  const totalAmount = [];
  const totalDuration = [];

  // useEffect(() => {
  //   console.log(isOrgInfoSucces, 'org nfo successs')
  //   if(isOrgInfoSucces) console.log(orgInfo,'orginfo')
  // }, [isOrgInfoSucces]);
  
  const getSumPrice = (eventTreatment) => {
    return eventTreatment?.specialPrice
      ? eventTreatment.specialPrice
      : eventTreatment.price;
  };
  eventTreatments?.map((price) => totalAmount.push(getSumPrice(price)));
  eventTreatments?.map((duration) => totalDuration.push(duration.duration));

  const add = (acc, x) => {
    return acc + x;
  };

  const addNewTreatment = () => {
    dispatch(selectTime(null));
    navigate(`/booking/${slug}/treatments/branch/${branchId}`);
  };
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  const bookEvent = async (clientInfo, orgId) => {
    refetch();
    dispatch(setLoading(true));

    if (!executeRecaptcha) {
      return;
    }

    const getToken = await executeRecaptcha("client");

    //? research below commented code block
    // if (selectedBranch?.employeeId) {
    //   client = {
    //     ...client,
    //     favoriteEmployeeId: parseInt(selectedBranch?.employeeId),
    //   };
    // }
    let organizationId = orgId ? orgId : (orgInfo?.data?.id || selectedBranch?.branch?.organizationId  )
    let data = {
      data: {
        organizationId,
        branchId,
        client: clientInfo,
        reserveDate: date,
        treatments: eventTreatments,
      },
      header: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        "captcha-response": getToken,
      },
    };
    sendEvent(data)
      .unwrap()
      .then(() => {
        // Reset all states
        navigate("/success");
        dispatch(resetStates());
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // Show error message and why client see this message
        toast.error("Something went wrong. Please try again later");
        dispatch(setLoading(false));
        // navigate(`/booking/${slug}`)
      });
  };

  const submitEvent = useCallback(
    async (clientInfo, isInfoTrue, orgId) => {

      if (isInfoTrue) {
        await bookEvent(clientInfo, orgId);
        return;
      }
      if (token) {
        const { name, surname, gender, phoneNumber } = clientData?.data;
        let client = {
          name,
          surname,
          gender,
          phoneNumber,
        };
        if (client.surname === null || client.surname === undefined) {
          client.surname = " ";
        }
        await bookEvent(client, orgId);
      } else {
        // dispatch(setLoading(false));
        setOpenModal(true);
      }
    },
    [token, isClientInfoSuccess, isOrgInfoSucces, isClientInfoSuccess]
  );


  return (
    <>
      {!token && openModal ? (
        <AuthModal setOpenModal={setOpenModal} submitEvent={submitEvent} />
      ) : null}
      <Layout showNavbar={screenWidth >= 1024 ? false : true}>
        <div>
          <div className="lg:hidden fixed top-0 left-0 z-50 w-full pt-11 px-5 pb-8 bg-[#FF00001A] flex justify-between items-center">
            <button onClick={() => navigate(-1)}>
              <img src={leftArrow} alt="left arrow" />
            </button>
            <p className="m-0 text-2xl font-medium">{t("summary")}</p>
            <p className="m-0"></p>
          </div>
          <div className="p-4 pt-[130px]  lg:px-2.5 xl:px-0  xl:w-[1200px] relative mx-auto flex flex-col gap-8 ">
            <div
              className="w-full bg-white rounded-3xl lg:px-10 lg:py-4 p-4 "
              style={{ boxShadow: "4px 4px 40px 0px #8C8C8C50" }}
            >
              {eventTreatments.map((eventTreatment, index) => (
                <SummaryItem key={index} eventTreatment={eventTreatment} />
              ))}
            </div>
            <button
              className="lg:hidden w-full flex justify-start items-center gap-2"
              onClick={addNewTreatment}
            >
              <img src={addCycle} alt="add icon" />
              <span className="text-base">Add new service</span>
            </button>
          </div>
          <div
            className="w-full sticky bottom-0 left-0  bg-white"
            style={{
              borderTop: "0.5px solid #8C8C8C40",
              borderBottom: "0.5px solid #8C8C8C40",
            }}
          >
            <div className="p-4  lg:px-2.5 xl:px-0  xl:w-[1200px] relative mx-auto  flex justify-between items-center">
              <h2 className="flex lg:gap-10 gap-2 font-medium lg:text-2xl text-lg leading-9 m-0">
                {t("total")} <span>{totalAmount.reduce(add, 0) + " AZN"}</span>
              </h2>
              <div className="flex gap-10">
                <button
                  onClick={addNewTreatment}
                  className="hidden lg:block font-light text-2xl leading-9 hover:cursor-pointer hover:underline"
                >
                  {t("add_new_service")}
                </button>
                <button
                  onClick={submitEvent}
                  className="px-10 py-3 bg-[#7338ac] hover:cursor-pointer hover:bg-[#5a2888] transition-all rounded-lg font-light text-white lg:text-2xl text-base leading-9"
                >
                  {t("confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SummaryPage;
