import axios from "axios";
import React, { useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Config/config.constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setLoading } from "../../Redux/features/loadingSpinnerSlice";
import { useTranslation } from "react-i18next";

const Otp = () => {
  const [inputValue, setInputValue] = useState();
  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const dispatch = useDispatch();
  const t = useTranslation();

  const tabChange = (val) => {
    let ele = document.querySelectorAll("input");
    if (ele[val - 1].value !== "") {
      ele[val]?.focus();
    } else if (ele[val - 1].value == "") {
      ele[val - 2]?.focus();
    }
  };
}
//   let digitValidate = function () {
//     setInputValue(inputValue?.replace(/[^0-9]/g, ""));
//   };
//   const handleChange = (value) => {
//     setValues((values) => [...values, value]);

//     // setInputValue((prev) => [...prev, value]);
//   };
//   const getData = (e) => {
//     e.preventDefault();
//     const verificationToken = localStorage.getItem("verificationToken");
//     let data = {
//       otp: values.join(""),
//       verificationToken,
//     };
//     axios({
//       method: "POST",
//       url: API_URL + "/api/otp/verify",
//       data,
//     }).then((response) => {
//       if (response.status === "200") {
//         let password = localStorage.getItem("password");
//         let phoneNumber = localStorage.getItem("phoneNumber");

//         let data = {
//           password,
//           phoneNumber,
//         };
//         axios({
//           method: "POST",
//           url: API_URL + "/auth/login",
//           data,
//         })
//           .then(() => {
//             navigate("/");
//           })
//           .catch((err) => {
//             dispatch(setLoading(false));
//             console.log(err.response);
//             if (err.response.status === 409) {
//               toast.error(t("USER_IS_ALREADY_REGISTERED_WITH_SUCH_PHONE"));
//             } else {
//               err.response?.data.message &&
//                 toast(t(err.response?.data?.message));
//             }
//           })
//           .finally(() => {
//             console.log("finally");
//           });
//       }
//     });
//   };
//   return (
//     <div>
//       <div class="px-2 w-[100%] h-[100vh] flex justify-center items-center rounded-lg m-auto">
//         <div class="shadow py-5 px-5 flex flex-col justify-center items-center">
//           <div className="bg-primary-color h-16 w-16 rounded-full flex justify-center items-center mb-3">
//             <BsShieldLock className="text-white text-3xl" />
//           </div>
//           <h4 className="text-primary-color font-semibold text-xl mt-3">
//             Zəhmət olmasa gələn kodu daxil edin
//           </h4>
//           <form
//             onSubmit={getData}
//             class="max-w-[600px] w-[100%]  flex items-center flex-col gap-5 my-2 "
//           >
//             <div className="flex gap-5">
//               <input
//                 onChange={(e) => handleChange(e.target.value)}
//                 class="w-14 h-16 rounded-lg border-[2px] text-2xl text-center"
//                 value={inputValue}
//                 onInput={() => digitValidate(this)}
//                 onKeyUp={() => tabChange(1)}
//                 maxlength="1"
//                 type="text"
//               />
//               <input
//                 onChange={(e) => handleChange(e.target.value)}
//                 class="w-14 h-16 rounded-lg border-[2px] text-2xl text-center"
//                 maxlength="1"
//                 value={inputValue}
//                 onInput={() => digitValidate(this)}
//                 onKeyUp={() => tabChange(2)}
//                 type="text"
//               />
//               <input
//                 onChange={(e) => handleChange(e.target.value)}
//                 class="w-14 h-16 rounded-lg border-[2px] text-2xl text-center"
//                 maxlength="1"
//                 value={inputValue}
//                 onInput={() => digitValidate(this)}
//                 onKeyUp={() => tabChange(3)}
//                 type="text"
//               />
//               <input
//                 onChange={(e) => handleChange(e.target.value)}
//                 class="w-14 h-16 rounded-lg border-[2px] text-2xl text-center"
//                 maxlength="1"
//                 value={inputValue}
//                 onInput={() => digitValidate(this)}
//                 onKeyUp={() => tabChange(4)}
//                 type="text"
//               />{" "}
//             </div>
//             <p class="receive-txt my-2">
//               Didn't receive the OTP?{" "}
//               <button className="resend-btn">Resend</button>
//             </p>
//             <button
//               onClick={getData}
//               type="submit"
//               class="text-base font-semibold bg-primary-color text-white block w-[60%]  p-3 rounded-lg mt-3"
//             >
//               Doğrula
//             </button>
//           </form>
//           <hr class="mt-4" />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Otp;