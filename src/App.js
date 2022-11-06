import { useEffect } from "react";
import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import JoinUs from "./Components/JoinUs/JoinUs";
import Home from "./Pages/Home";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import ContactPage from "./Pages/Contact/ContactPage";
import { useState } from "react";
import {  useSelector } from "react-redux";
import AllSalons from "./Components/Salons/AllSalons";
import AllEmployees from "./Components/Employees/AllEmployees";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import { Toaster } from "react-hot-toast";
import Spinner from "./Components/Spinner/Spinner";
// import OTP from "./Pages/OTP";
import Privacy from "./Components/Privacy/Privacy";
import PrivateRoutes from "./Components/ProtectedRoute/ProtectedRoute";
import Branches from "./Components/Booking/Branches/Branches";
import Treatments from "./Components/Booking/Treatments/Treatments";
import Employees from "./Components/Booking/Employees/Employees";
import CalendarPage from "./Components/Booking/Calendar/CalendarPage";
import MasterPage from "./Components/Booking/MasterPage/MasterPage";
import SummaryPage from "./Components/Booking/SummaryPage/SummaryPage";
import SuccessPage from "./Components/Booking/SuccessPage/SuccessPage";
import { useTranslation } from "react-i18next";

function App() {
  const [currentPage, setCurrentPage] = useState("");

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const loadingSpinner = useSelector(
    (state) => state.loadingSpinner.loading,
  );
  const { i18n } = useTranslation();
  const language = useSelector(state => state.language.currentLang)


  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language, i18n]);
  return (
    <>
      {loadingSpinner && <Spinner />}
      <div>
        <Routes>
          {" "}
          <Route
            path="/"

            element={<Home setCurrentPage={setCurrentPage} />}
          ></Route>
          <Route
            path="/join-us"

            element={<JoinUs currentPage={currentPage} />}
          ></Route>
          <Route
            path="/coming-soon"

            element={<ComingSoon setCurrentPage={setCurrentPage} />}
          ></Route>
          <Route
            path="/learn"

            element={<ComingSoon setCurrentPage={setCurrentPage} />}
          ></Route>
          <Route
            path="/features"

            element={<ComingSoon setCurrentPage={setCurrentPage} />}
          ></Route>
          <Route
            path="/pricing"

            element={<ComingSoon setCurrentPage={setCurrentPage} />}
          ></Route>
          <Route
            path="/blog"

            element={<ComingSoon setCurrentPage={setCurrentPage} />}
          ></Route>
          <Route
            path="/social-media"

            element={<ComingSoon />}
          ></Route>
          <Route
            path="/signin"

            element={
              <PrivateRoutes>
                <SignIn setCurrentPage={setCurrentPage} />
              </PrivateRoutes>
            }
          ></Route>
          <Route
            path="booking/:slug"
            element={
              <Branches />
            }
          >
          </Route>
          <Route
            path="booking/:slug/treatments/branch/:branchId"
            element={
              <Treatments />
            }
          />
          <Route
            path="booking/:slug/treatments/branch/:branchId/employees"
            element={
              <Employees />
            }
          />
          <Route
            path="booking/:slug/treatments/branch/:branchId/employees/:employeeId/calendar"
            element={ <CalendarPage /> }
          />
          <Route
            path="booking/:slug/treatments/branch/:branchId/employees/:employeeId/calendar/summary"

            element={
              <SummaryPage />
            }
          />
          <Route
            path="/success"

            element={
              <SuccessPage />
            }
          />
          <Route
            path="/masters/:id"
            exact
            element={
              <MasterPage />
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoutes>
                <SignUp setCurrentPage={setCurrentPage} />
              </PrivateRoutes>
            }
          />
          <Route
            path="/contact"

            element={<ContactPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/privacy"

            element={<Privacy setCurrentPage={setCurrentPage} />}
          />
          <Route path="/all-salons" element={<AllSalons />} />
          <Route
            path="/all-employees"
            element={<AllEmployees />}
          ></Route>
          {/* <Route path="/otp" exact element={<OTP />}></Route> */}
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
