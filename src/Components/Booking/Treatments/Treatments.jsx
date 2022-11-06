import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import {
  useGetTreatmentsByBranchQuery,
  useGetTreatmentsByEmployeeQuery,
  useGetTreatmentsQuery,
} from "./../../../Redux/services/TreatmentsApi";
import { Collapse, Space } from "antd";
import { getPrice } from "../../../Utils/PriccingOptions.util";
import { getDurationText } from "../../../Utils/duration.util";
import TotalPriceCard from "../TotalPriceCard/TotalPriceCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addEventsToTotal,
  selectCategory,
  selectPricingOption,
  selectTreatment,
} from "../../../Redux/features/bookingSlice";
import { BsArrowRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import leftArrow from "./../../../Assets/Images/arrow-left.svg";
// import { AiOutlineWarning } from "react-icons/ai";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import Spinner from "../../Spinner/Spinner";

// import { AiOutlineWarning } from "react-icons/ai";
const { Panel } = Collapse;
const Treatments = () => {
  const navigate = useNavigate();
  // const { eventTreatments } = useSelector(state => state.bookingSlice)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { branchId } = useParams();
  const [currentCategory, setCurrentCategoty] = useState();
  const [treatments, setTreatments] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const {branch} = useSelector((state) => state.bookingSlice);
  let selectedBranch = branch ? branch : null
  // const { data: treatments, isLoading } = useGetTreatmentsQuery({ branchId });

  const { data: categoriesInfoByBranch, isLoading: isLoadingByBranch } =
    useGetTreatmentsByBranchQuery({ branchId });
  const { data: categoriesInfoByEmployee, isLoading: isLoadingByEmployee } =
    useGetTreatmentsByEmployeeQuery({ selectedBranch });
  const findCategoryTreatments = () => {
    let categoryTreatments = treatments?.data.find(
      (branchSer) => branchSer?.id === currentCategory?.id
    );
    return categoryTreatments?.treatments;
  };
  useEffect(() => {
    if (selectedBranch?.employeeId) {
      setTreatments(categoriesInfoByEmployee);
    } else {
      setTreatments(categoriesInfoByBranch);
    }
  }, [
    isLoadingByEmployee,
    isLoadingByBranch,
    selectedBranch?.employeeId,
    categoriesInfoByEmployee,
    categoriesInfoByBranch,
  ]);

  useEffect(() => {
    setCurrentCategoty({
      name: treatments?.data[0].name,
      id: treatments?.data[0].id,
    });
    dispatch(
      selectCategory({
        name: treatments?.data[0].name,
        id: treatments?.data[0].id,
      })
    );
  }, [treatments]);


  
  // window.location.reload( navigate(-1) );




  // const empTreatments = () => {
  //   return treatments?.data?.map((treatment) => {
  //     let empPricingOptions = treatment.treatments?.map((pricingOpt) => {
  //      return pricingOpt?.pricingOptions?.map(po => po?.employees[0])
  //     });
  //     return empPricingOptions
  //   }); 
  // }
  // console.log(empTreatments())

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  if (isLoadingByBranch || isLoadingByEmployee) {
    return <Spinner />;
  }

  return (
    <Layout showNavbar={screenWidth >= 1024 ? false : true}>
      <div className="pt-[110px] px-4 lg:px-2.5 xl:px-0 xl:w-[1200px] mx-auto flex gap-16 ">
        <div className=" pt-0 " style={{ flex: 2 }}>
          <h1 className="hidden lg:block font-medium text-[40px] lead">
            {" "}
            {t("select_date_and_time")}
          </h1>
          <div className="lg:hidden fixed top-0 left-0 z-50 w-full pt-11 px-5 pb-8 bg-[#FF00001A] flex justify-between items-center">
            <button onClick={() => navigate(-1)}>
              <img src={leftArrow} alt="left arrow" />
            </button>
            <p className="m-0 text-2xl font-medium">{t("service")}</p>
            <p className="m-0"></p>
          </div>
          <div className="flex lg:flex-row flex-col">
            <div className=" hidden lg:block " style={{ flex: 1 }}>
              <h2 className=" font-medium text-2xl leading-9 mb-5">
                {t("categories")}
              </h2>
              <ul className="flex flex-col gap-5">
                {treatments?.data.map((branchService) => (
                  <li
                    onClick={() => {
                      setCurrentCategoty({
                        name: branchService.name,
                        id: branchService.id,
                      });
                      dispatch(
                        selectCategory({
                          name: branchService.name,
                          id: branchService.id,
                        })
                      );
                      dispatch(
                        addEventsToTotal([
                          "category",
                          {
                            name: branchService.name,
                            id: branchService.id,
                          },
                        ])
                      );
                    }}
                    key={branchService?.id}
                  >
                    <label className="app__custom_checkbox cursor-pointer flex items-center gap-2 capitalize font-normal text-lg leading-7">
                      <input
                        checked={branchService?.id === currentCategory?.id}
                        type="radio"
                        name="branchServiceCategory"
                        className="option-input radio"
                        onChange={() => {}}
                      />
                      {branchService?.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-16 custom_treatments_scroll p-1">
              <div className="h-full flex items-center flex-nowrap gap-4">
                {treatments?.data.map((branchService) => (
                  <button
                    onClick={() => {
                      setCurrentCategoty({
                        name: branchService.name,
                        id: branchService.id,
                      });
                      dispatch(
                        selectCategory({
                          name: branchService.name,
                          id: branchService.id,
                        })
                      );
                      dispatch(
                        addEventsToTotal([
                          "category",
                          {
                            name: branchService.name,
                            id: branchService.id,
                          },
                        ])
                      );
                    }}
                    key={branchService?.id}
                    className={`m-0 px-5 py-2  rounded-lg text-xl  inline-block ${
                      currentCategory?.id === branchService.id &&
                      "bg-black text-white"
                    }`}
                  >
                    {branchService?.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="py-3" style={{ flex: 2 }}>
              <Space direction="vertical" style={{ display: "flex" }}>
                {findCategoryTreatments()?.map((categoryTreatment) => (
                  <Collapse
                    expandIconPosition="end"
                    style={{ background: "#fff" }}
                    key={categoryTreatment?.id}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <IoIosArrowUp size={24} color="#292D32" />
                      ) : (
                        <IoIosArrowDown size={24} color="#292D32" />
                      )
                    }
                  >
                    <Panel
                      header={
                        <h1 className="font-normal text-[22px] leading-7">
                          {categoryTreatment?.name}
                        </h1>
                      }
                    >
                      {categoryTreatment?.pricingOptions?.map(
                        (pricingOption, index) => (
                          <Link
                            to={`employees`}
                            onClick={() => {
                              dispatch(selectTreatment(categoryTreatment));
                              dispatch(selectPricingOption(pricingOption));
                              dispatch(
                                addEventsToTotal([
                                  "treatment",
                                  categoryTreatment,
                                ])
                              );
                              dispatch(
                                addEventsToTotal([
                                  "pricingOption",
                                  pricingOption,
                                ])
                              );
                            }}
                            key={index}
                          >
                            <div
                              className="flex flex-col gap-5 pb-4 pl-5"
                              style={{ borderBottom: " 0.8px solid #8C8C8C" }}
                            >
                              <div>
                                {/* <label className="app__custom_checkbox cursor-pointer flex items-center gap-2 capitalize font-normal text-lg leading-7">
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedOptions(selectedOptions.concat(pricingOption))
                                } else {
                                  setSelectedOptions(
                                    selectedOptions.filter(
                                      (opt) => opt?.id !== pricingOption?.id
                                    )
                                  );
                                }
                              }}
                              type="checkbox"
                              name="branchServiceCategoryItems"
                              className="option-input-items"
                            />
                          </label> */}
                              </div>
                              <div>
                                <h1 className="font-normal text-[18px] leading-[22px]">
                                  {pricingOption?.name}
                                </h1>
                                <div className="w-full flex justify-between mb-4">
                                  <p
                                    style={{ flex: 4 }}
                                    className=" font-light text-[15px] leading-5 text-[#8c8c8c] m-0"
                                  >
                                    {pricingOption?.description}
                                  </p>
                                  <div
                                    style={{ flex: 1 }}
                                    className="font-medium text-base leading-5 text-[#FFCD68]"
                                  >
                                    {getPrice(pricingOption)}
                                  </div>
                                </div>

                                <div className="flex gap-5 mt-2">
                                  <p className=" font-light text-[15px] leading-5 text-[#8c8c8c]">
                                    {getDurationText(pricingOption?.duration)}
                                  </p>
                                  <p className=" font-light text-[15px] leading-5 text-[#8c8c8c]">
                                    Only{" "}
                                    <span className=" lowercase">
                                      {" "}
                                      {categoryTreatment?.gender}
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full flex items-center justify-between cursor-pointer">
                                {pricingOption?.employees?.length > 0 ? (
                                  <p className="flex flex-row items-center text-[#FFCD68] text-[15px] font-medium m-0">
                                    {/* <AiOutlineWarning color="#FFCD68" size={24}/>  */}
                                    Qiymət və müddət ustaya görə fərqlənir.
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                                <BsArrowRight color="black" size={32} />
                              </div>
                            </div>
                          </Link>
                        )
                      )}
                    </Panel>
                  </Collapse>
                ))}
              </Space>
            </div>
          </div>
        </div>
        <div className="hidden lg:block" style={{ flex: 1 }}>
          <TotalPriceCard />
        </div>
      </div>
    </Layout>
  );
};
// api/treatments/branch/{branchId}

export default Treatments;
