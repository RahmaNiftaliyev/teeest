import React, { useEffect } from "react";
import salonImg from "./../../../Assets/Images/salon_branch_img.png";
import { useSelector } from "react-redux";
import { getPrice } from "../../../Utils/PriccingOptions.util";
import { getDurationText } from "../../../Utils/duration.util";
import { nanoid } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

const TotalPriceCard = () => {
  const { t } = useTranslation();
  const { totalServices } = useSelector(state => state.bookingSlice);
  const totalAmount = [];

  useEffect(() => {
    servicePrice();
  }, [totalServices])

  const servicePrice = () => {
    return totalServices?.map((service) => {
      let { branch, pricingOption, treatment, employee, time, date, status } = service;
      let serv = {
        uniqueId: nanoid(),
        branchName: branch?.name,
        treatmentName: treatment?.name,
        pricingOptionName: pricingOption?.name,
        employeeName: employee?.name,
        price: pricingOption?.price,
        specialPrice: pricingOption?.specialPrice,
        priceMin: pricingOption?.priceMin,
        priceType: pricingOption?.priceType,
        duration: pricingOption?.duration,
        address: branch?.address,
        date,
        time,
        status,
      }
      let specEmp = pricingOption?.employees?.find(emp => emp.employeeId === employee?.id);
      if (specEmp) {
        serv = {
          ...serv,
          price: specEmp?.price,
          specialPrice: specEmp?.specialPrice,
          priceMin: specEmp?.priceMin,
          priceType: specEmp?.priceType,
          duration: specEmp?.duration,
        }
        return serv;
      }
      return serv;
    });
  }

  const getSumPrice = (serv) => {
    return serv?.specialPrice
      ? serv.specialPrice
      : serv.price;
  };

  servicePrice()?.map((service) => totalAmount.push(getSumPrice(service)));
  // eventTreatments?.map((duration) => totalDuration.push(duration.duration));

  const add = (acc, x) => {
    return acc + x;
  };

  const total = () => {
    if(isNaN(totalAmount?.reduce(add, 0))){
      return ''
    }
    return totalAmount?.reduce(add, 0) + " AZN";
  }
  return (
    <div>
      <div className="rounded-t-xl app__branches_box_shadow flex flex-col justify-between">
        {
          servicePrice()?.map(service => {
            return (
              <div key={service?.uniqueId} className="service_box flex flex-col gap-8 p-5 pb-0">
                <div className="flex gap-4">
                  <img src={salonImg} alt="" />
                  <div>
                    <h2 className="font-medium text-lg leading-7 text-[#7338AC]">
                      {service?.branchName}
                    </h2>
                    <p className="font-light text-sm text-[#8c8c8c]">
                      {service?.address}
                    </p>
                  </div>
                </div>
                <div className="serivce border-[#8c8c8c] border-b">
                  <h3 className="font-medium text-lg leading-7">{t("service")}</h3>
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base leading-6 text-[#8c8c8c]">
                      {
                        (service?.pricingOptionName && service?.employeeName) && (`${service?.pricingOptionName} with ${service?.employeeName}`)
                      }
                    </p>
                    <p className="font-normal text-sm text-[#FFCD68] leading-5">
                      {getPrice(service)}
                    </p>
                  </div>
                  <p className="font-normal text-sm text-[#8c8c8c] leading-5">{getDurationText(service?.duration)}</p>
                  <p className="font-normal text-sm text-[#8c8c8c] leading-5">
                    {service?.time && (service?.date + " " + service?.time)}
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="rounded-b-xl w-full flex justify-between p-5 bg-[#F2F2F7]">
        <p className="m-0 font-medium text-lg leading-7 ">{t("total")}</p>
        <p className="m-0 font-normal text-base leading-6">{total()}</p>
      </div>
    </div>
  );
};

export default TotalPriceCard;