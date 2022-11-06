import React, { useRef, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { BsTelephoneFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/features/loadingSpinnerSlice";
import { useTranslation } from "react-i18next";
import Layout from "../../Layouts/Layout";

//? DONT DELETE BELOW COMMENTS
// import { GoogleReCaptchaProvider, useGoogleReCaptcha, GoogleReCaptcha} from 'react-google-recaptcha-v3';
// import { GOOGLE_RECAPTCHA_KEY } from "../../Config/config.constant";

const Contact = () => {
  const form = useRef();
  const [isShowError, setIsShowError] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { t } = useTranslation();
  //? DONT DELETE BELOW COMMENT
  // const { executeRecaptcha } = useGoogleReCaptcha();

  const sendEmail = (e) => {
    dispatch(setLoading(true));
    e.preventDefault();

    if (!emailInput && !phoneNumberInput) {
      setIsShowError(true);
    } else {
      //? DONT DELETE BELOW COMMENT
      // const newToken = executeRecaptcha("Contact_Form_With_Recaptcha");
      setIsShowError(false);
      emailjs
        .sendForm(
          "service_o4wkynp",
          "template_aatsocj",
          form.current,
          "6SjvRGZVTmUIlJak2",
        )
        .then(
          (result) => {
            dispatch(setLoading(false));
          },
          (error) => {
            dispatch(setLoading(false));
          },
        );
    }
    toast.success("Successfully toasted!");
  };

  return (
    //? DONT DELETE BELOW COMMENTS
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={GOOGLE_RECAPTCHA_KEY}
    // >
    <Layout>
      <div className="mt-24 px-4 lg:px-2.5 xl:px-0 xl:w-[1200px] mx-auto">
        <h3 className="text-black font-semibold text-4xl py-10 mb-0">
          {t("get_in_touch")}
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="bg-primary-color pt-10  pl-6 md:pl-8 lg:pl-10 pr-10 md:pr-14 lg:pr-24 text-white rounded-xl flex-1 z-[10] pb-14 md:pb-40">
            <h5 className="text-center font-medium text-lg md:text-[28px] text-white mb-2.5 md:mb-5">
              {t("contact_information")}
            </h5>
            {/* <p className="text-center md:text-left font-normal text-sm md:text-lg leading-7">
              It is a long established fact that a reader will distracted
              by the readable content of a page{" "}
            </p> */}
            <ul className="mt-6">
              <li>
                <a
                  href="/#"
                  className="text-white flex gap-6 items-center mb-10 hover:text-white"
                >
                  <ImLocation2 className="text-lg text-white hover:text-white" />
                  Bakı şəhəri, Nərimanov rayonu, Zaur Nudirəliyev küçəsi,
                  79
                </a>
              </li>
              <li>
                <a
                  href="mailto:help@.rihand.az"
                  className="text-white flex gap-6 items-center  mb-10 hover:text-white"
                >
                  <FaEnvelope className="text-lg" />
                  help@rihand.az
                </a>
              </li>
              <li>
                <a
                  href="tel:(+994) 55 997 66 44"
                  className="text-white flex gap-6 items-center  mb-10 hover:text-white"
                >
                  <BsTelephoneFill className="text-lg" />
                  (+994) 55 997 66 44
                </a>
              </li>
            </ul>
            <ul className="flex gap-7 justify-center items-center mt-10 md:mt-40 px-1">
              <li>
                <a
                  href="https://instagram.com/rihand_az?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  <FaInstagram className="text-white text-xl" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/rihand.azerbaycan"
                  target="_blank"
                >
                  <FaFacebook className="text-white text-xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/rihand-mmc/mycompany/"
                  target="_blank"
                >
                  <FaLinkedin className="text-white text-xl" />
                </a>
              </li>
              {/* <li>
                <Link to="" target="_blank">
                  <FaTelegram className="text-white text-xl" />
                </Link>
              </li> */}
              <a href="https://api.whatsapp.com/send?text=Salam, RIHAND! &phone=+994559976644">
                <FaWhatsapp className="text-white text-xl" />
              </a>
            </ul>
          </div>
          <div className="bg-white pb-10 shadow pt-10 pl-8 md:pl-10 lg:pl-20 pr-12 md:pr-14 lg:pr-24  rounded-xl flex-1 -ml-0 md:-ml-6">
            <div className="flex-1 bg-white ">
              <h5 className="text-center font-medium text-[28px] text-[#FFCD68] white mb-5"></h5>
              <form ref={form} onSubmit={sendEmail}>
                {/* 
                  //? DONT DELETE BELOW COMMENT
                
                 <GoogleReCaptcha onVerify={t => console.log({ t })} /> 
                 */}
                <div className="mb-5">
                  <label className="block">{t("full_name")}</label>
                  <input
                    className="outline-none w-[100%] border-[0.5px] border-[#8C8C8C] h-12 pl-2 rounded-lg mt-2.5"
                    type="text"
                    name="user_name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />

                  {/* <span className="required-message">
                      Adınızı daxil edin
                    </span> */}
                </div>
                <div>
                  <div className="flex-col lg:flex-row flex gap-x-4">
                    <div className="flex-1 mb-3">
                      <label className="block">{t("email")}</label>
                      <input
                        className="outline-none w-[100%] border-[0.5px] border-[#8C8C8C] h-12 pl-2 rounded-lg mt-2.5"
                        type="email"
                        name="user_email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 mb-3">
                      <label className="block">{t("phoneNumber")}</label>
                      <input
                        className="outline-none w-[100%] border-[0.5px] border-[#8C8C8C] h-12 pl-2 rounded-lg mt-2.5"
                        type="text"
                        name="user_number"
                        value={phoneNumberInput}
                        onChange={(e) =>
                          setPhoneNumberInput(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  {isShowError ? (
                    <span className="required-message">
                      Email və ya şifrədən birini daxil edin!
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-2">
                  <label className="block">{t("message")}</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="outline-none h-24 w-[100%] border-[0.5px] border-[#8C8C8C]  pl-2 rounded-lg mt-2.5"
                  ></textarea>
                </div>
                <div className="flex justify-center md:justify-end">
                  <input
                    className="w-[100%] mt-10 bg-primary-color text-white md:w-52 h-14 rounded-xl cursor-pointer text-xl"
                    type="submit"
                    value={t("send")}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    //? DONT DELETE BELOW COMMENT
    // </GoogleReCaptchaProvider>
  );
};

export default Contact;
