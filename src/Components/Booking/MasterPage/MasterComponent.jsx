import axios from "axios";
import React, { useEffect, useState } from "react";
import masterImage from "./../../../Assets/Images/masterImg.png";
import dote from "./../../../Assets/Images/dote.svg";

const MasterComponent = ({ masterData, setCategory, categories, category }) => {
  return (
    <div className="relative -top-56 left-0 w-full bg-white py-[30px] px-5 app__branches_box_shadow rounded-xl">
      <div className="w-full flex justify-center mb-5">
        <img src={masterImage} alt="master" />
      </div>
      <h2 className="font-normal text-2xl leading-9 text-center w-full">
        {masterData?.name} {masterData?.surname}
      </h2>
      <div className="font-normal text-xl leading-7 flex flex-wrap justify-center gap-3 text-[#8c8c8c] text-center px-1 mb-10">
        {masterData?.profession.split(' ').map((prof) => (
          <span >
            &#8226;
            <span className="font-normal text-xl leading-7 text-[#8c8c8c]">
              {prof}
            </span>
          </span>
        ))}
      </div>
      <div className="flex flex-col py-10 gap-5">
        <button className="py-2 rounded-xl w-full cursor-pointer text-base  bg-[#7338AC] text-white ">
          Book
        </button>
        <button className="py-2 rounded-xl w-full cursor-pointer text-base  border border-[#7338AC] text-[#7338AC] ">
          Portfolio
        </button>
      </div>
      <div>
        <ul className="flex flex-col gap-5">
          <li className="w-full flex justify-between">
            <h3 className="font-light text-lg">Portfoliosundakı işlər</h3>
            <p className="font-normal text-lg">1361</p>
          </li>
          <li className="w-full flex justify-between">
            <h3 className="font-light text-lg">Reytinq və rəylər</h3>
            <p className="font-normal text-lg">-</p>
          </li>
          <li className="w-full flex justify-between">
            <h3 className="font-light text-lg">Followers</h3>
            <p className="font-normal text-lg">52K</p>
          </li>
          <li className="w-full flex justify-between">
            <h3 className="font-light text-lg">Tələbələri</h3>
            <p className="font-normal text-lg">52K</p>
          </li>
        </ul>
      </div>

      <div className="w-full h-[0.5px] bg-[#8c8c8c]" />

      {masterData?.description && (
        <div className="mt-5 mb-8">
          <h2 className="font-normal text-lg mb-[10px]">Haqqımda</h2>
          <p className="font-light text-[15px] leading-[22px]">
            {masterData?.description}
          </p>
        </div>
      )}

      <div>
        <ul className="flex flex-col gap-5">
          {categories.map((item) => (
            <li
              className={`w-full flex gap-[10px] cursor-pointer ${
                item?.id === category && "text-[#E7C2C2]"
              }`}
              onClick={() => setCategory(item.id)}
              key={item.id}
            >
              <img src={dote} alt="dote" />
              <span className="font-light text-lg">{item.categoryName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MasterComponent;
