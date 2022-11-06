import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import SignIn from "../Components/Auth/SignIn";
import SignUp from "../Components/Auth/SignUp";
import ComingSoon from "../Components/ComingSoon/ComingSoon";
import JoinUs from "../Components/JoinUs/JoinUs";
import ContactPage from "../Pages/Contact/ContactPage";
import Home from "../Pages/Home";

const routes = (
  <Routes>
    <Route path="/" exact element={<Home />}></Route>

    <Route path="/join-us" exact element={<JoinUs />}></Route>
    <Route path="/coming-soon" exact element={<ComingSoon />}></Route>
    <Route path="/learn" exact element={<ComingSoon />}></Route>
    <Route path="/features" exact element={<ComingSoon />}></Route>
    <Route path="/pricing" exact element={<ComingSoon />}></Route>
    <Route path="/social-media" exact element={<ComingSoon />}></Route>
    <Route path="/signin" exact element={<SignIn />}></Route>
    <Route path="/signup" exact element={<SignUp />}></Route>
    <Route path="/contact" exact element={<ContactPage />}></Route>
  </Routes>
);

export default routes;
