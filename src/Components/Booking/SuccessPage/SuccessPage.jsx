import React from "react";
import Layout from "../../../Layouts/Layout";
import succesIcon from "./../../../Assets/Images/success.svg";
import { Link } from "react-router-dom";
import blueCycle from "./../../../Assets/Images/success-b-c-1.svg";
import greenCycle from "./../../../Assets/Images/success-g-c-1.svg";
import redCycle from "./../../../Assets/Images/success-r-c-1.svg";
import bluePoligon from "./../../../Assets/Images/success-b-p-1.svg";
import purplePoligon from "./../../../Assets/Images/success-p-p-1.svg";
import redPoligon from "./../../../Assets/Images/success-r-p-1.svg";
import yellowPoligon from "./../../../Assets/Images/success-y-p-1.svg";
import yellowPoligon2 from "./../../../Assets/Images/success-y-p-2.svg";




const SuccessPage = () => {
  return (
    <Layout>
      <div className="pt-[180px] px-4 lg:px-2.5 xl:px-0  xl:w-[1200px] relative mx-auto flex justify-center items-center gap-16 ">
        <div
          className="max-w-[700px] w-[700px] pt-[48px] pb-[62px] flex flex-col items-center"
          style={{ boxShadow: "4px 4px 40px 0px rgba(140, 140, 140, 0.25)" }}
        >
          <img src={succesIcon} alt="success" className="mb-12" />
          <h1 className="mb-4 font-medium lg:text-2xl text-xl leading-9 text-center">
            Your Order is Successfull
          </h1>
          <p className="font-normal lg:text-xl text-base lg:leading-[30px] text-[#8c8c8c] mb-10 lg:w-[470px] text-center">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s{" "}
          </p>
          <Link to={'/'}>
            <button className="font-normal lg:text-2xl text-xl leading-9 text-black pb-1 border-b border-black">Back to Home</button>
          </Link>
        </div>
        <img className="absolute top-[20%] left-[30%]" src={yellowPoligon} alt="" />
        <img className="absolute top-[40%] left-[10%]" src={redPoligon} alt="" />
        <img className="absolute top-[85%] left-[12%]" src={blueCycle} alt="" />
        <img className="absolute top-[110%] left-[27%]" src={purplePoligon} alt="" />
        <img className="absolute top-[110%] right-[35%]" src={redCycle} alt="" />
        <img className="absolute top-[25%] right-[8%]" src={greenCycle} alt="" />
        <img className="absolute top-[60%] right-[15%]" src={yellowPoligon2} alt="" />
        <img className="absolute top-[95%] right-[10%]" src={bluePoligon} alt="" />
      </div>
    </Layout>
  );
};

export default SuccessPage;
