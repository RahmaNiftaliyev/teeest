import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./../../../Assets/Styles/customBranchesSwiper.css";
import BranchCard from "./BranchCard";
import Spinner from "../../Spinner/Spinner";

import GoogleMapReact from "google-map-react";
import axios from "axios";

import { API_URL, GOOGLE_MAP_API_KEY } from "../../../Config/config.constant";
import { useGetSalonBranchesQuery } from "../../../Redux/services/SalonBranchesApi";
import {
  addEventsToTotal,
  addEventTreatments,
  selectBranch,
} from "../../../Redux/features/bookingSlice";

import Layout from "../../../Layouts/Layout";
import salonBranchImg from "./../../../Assets/Images/salon_branch_img.png";
import locationMinus from "./../../../Assets/Images/location-minus.svg";
// import yellowStar from "./../../../Assets/Images/yellowStar.svg";
// import salonImg from "./../../../Assets/Images/salon_branch_img.png";
import branchMainImg from "./../../../Assets/Images/salon_branch_main_img.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import Map from "../Map/Map";
import MapModal from "../MapModal/MapModal";
import { useGetBranchesByEmpQuery, useGetBranchesByOrgQuery } from "../../../Redux/services/BranchApi";

const Branches = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  // const {
  //   data: salonBranches,
  //   isLoading,
  //   refetch,
  // } = useGetSalonBranchesQuery({ slug });
  const dispatch = useDispatch();
  const [branchId, setBranchId] = useState();
  const [organizationData, setOrganizationData] = useState();
  const [customScaleValue, setCustomScaleValue] = useState(14);
  const [selectedBranch, setSelectedBranch] = useState();
  const [salonBranches, setSalonBranches] = useState();
  const [coords, setCoords] = useState();
  const [mapModal, setMapModal] = useState(false);
  // const [treatmentUrl, setTreatmentUrl] = useState(null);
  // const { data: salons } = useGetSalonsQuery();
  const branchIdSelector = branchId ? branchId : salonBranches?.data[0]?.id;
  const loading = useSelector((state) => state.loadingSpinner.loading);


  const {
    data: orgBranches,
    isError: orgIsError,
    isLoading: orgIsLoading,
  } = useGetBranchesByOrgQuery({slug});

  const {
    data: empBranches,
    isError: empIsError,
    isLoading: empIsLoading,
  } = useGetBranchesByEmpQuery({slug});

  useEffect(() => {
    if (orgBranches && !orgIsError && !orgIsLoading) {
      setSalonBranches(orgBranches);
      // setTreatmentUrl(`treatments/branch/${selectedBranch?.id}`)
    } else {
      setSalonBranches(empBranches)

    }
  }, [orgIsLoading, empIsLoading])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({
          lat: Number(latitude?.toFixed(6)),
          lng: Number(longitude?.toFixed(6)),
        });
      }
    );
  }, []);
  useEffect(() => {
    setCoords({
      lat: organizationData && Number(organizationData?.lat?.toFixed(6)),
      lng: organizationData && Number(organizationData?.lon?.toFixed(6)),
    });
  }, [organizationData]);
  useEffect(() => {
    axios
      .get(`${API_URL}/organizations/branch/${branchIdSelector}`)
      .then((response) => {
        setOrganizationData(response.data.data);
      })
      .catch(() => console.log("ERROR"));
  }, [branchId, branchIdSelector]);

  useEffect(() => {
    if (!selectedBranch) {
      setSelectedBranch(salonBranches?.data[0]);
    }
  }, [salonBranches?.data]);

  if (loading || orgIsLoading || empIsLoading) {
    // refetch();
    return <Spinner />;
  }

  const calcScaleValue = (salonBranch) => {
    if (organizationData?.branchId === salonBranch?.id) {
      return customScaleValue;
    } else {
      if (customScaleValue > 5) {
        return customScaleValue - 4;
      } else {
        return 1;
      }
    }
  };


  return (
    <div className="w-full min-h-screen relative">
      {mapModal && (
        <MapModal
          coords={coords}
          setCoords={setCoords}
          setCustomScaleValue={setCustomScaleValue}
          salonBranches={salonBranches}
          calcScaleValue={calcScaleValue}
          organizationData={organizationData}
          selectedBranch={selectedBranch}
          setMapModal={setMapModal}
        />
      )}
      <Layout>
        <div className="pt-[110px] px-4 lg:px-2.5 xl:px-0 xl:w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-20 gap-5">
            <div className=" flex-1 ">
              <Swiper
                pagination={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper custom-branches-swiper"
                navigation={true}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {selectedBranch?.media.length ? selectedBranch?.media?.map((mediaItem)  => (
                  <SwiperSlide key={mediaItem?.id}>
                    <img
                      className="w-[100%] h-[100%] object-cover rounded-xl "
                      src={`${API_URL}/file?fileName=${mediaItem?.path}`}
                      alt=""
                    />
                  </SwiperSlide>
                )) : (
                  <SwiperSlide>
                    <img
                      className="w-[100%] h-[100%] object-cover rounded-xl "
                      src={branchMainImg}
                      alt=""
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className=" flex-1 flex flex-col sm:gap-4 gap-2">
              <h1 className=" font-medium md:text-[40px] text-2xl leading-[60px] text-[#7338ac] max-w-[300px] m-0">
                {selectedBranch?.name}
              </h1>
              <p className=" font-light leading-7 text-[#8c8c8c] max-w-[75%]">
                {selectedBranch?.description}
              </p>
              <p className=" font-light leading-7 text-[#8c8c8c] max-w-[75%]">
                <span className="mr-2">{selectedBranch?.address}</span>
                <button
                  className="font-normal lg:hidden text-sm text-[#FFCD68] hover:underline"
                  onClick={() => setMapModal(true)}
                >
                  Map View
                </button>
              </p>
              {/* <ul className="mt-8">
                  <li className="flex gap-3 mb-6">
                    <img src={medalIcon} alt="medal icon" />
                    <span>Lorem Ipsum has been</span>
                  </li>
                  <li className="flex gap-3 mb-6">
                    <img src={purpleStar} alt="star icon" />
                    <span>Lorem Ipsum has been</span>
                  </li>
                  <li className="flex gap-3 mb-6">
                    <img src={iconPurple} alt=" icon" />
                    <span>Lorem Ipsum has been</span>
                  </li>
                </ul>*/}
              <Link
                to={`treatments/branch/${selectedBranch?.id}/`}                
                onClick={() => localStorage.setItem("branchId", selectedBranch?.id)}
              >
                <button
                  type="button"
                  className="hidden lg:block text-white bg-[#7338ac] rounded-lg xl:w-[450px] w-full py-3 font-light text-2xl hover:cursor-pointer hover:bg-[#662c9d] transition-all"
                >
                  {" "}
                  {t("book")}
                </button>
              </Link>
            </div>
          </div>
          <div className=" mt-10 lg:mt-20">
            <h2 className=" font-medium md:text-[40px] text-2xl leading-[60px] mb-10">
              {t("branches")}
            </h2>
            <div className="flex gap-24 ">
              <div className="flex-1  flex flex-col gap-8 w-full">
                {salonBranches?.data.map((salonBranch) => (
                  <div
                    onClick={() => {
                      setBranchId(salonBranch?.id);
                      dispatch(selectBranch(salonBranch));
                      dispatch(addEventsToTotal(["branch", salonBranch]));
                    }}
                    className="w-full bg-white app__branches_box_shadow sm:p-5 p-3 rounded-[12px] flex sm:gap-4 gap-2"
                    key={salonBranch?.id}
                  >
                    <img
                      src={salonBranch?.media.length ? `${API_URL}/file?fileName=${salonBranch?.media[0]?.path}` : salonBranchImg}
                      alt="salon branch"
                      className="object-cover lg:w-32 lg:h-32 w-24 h-24 rounded-lg"
                    />
                    <div className="w-full">
                      <h3 className=" font-medium sm:text-2xl text-lg leading-9 mb-[10px]">
                        {salonBranch?.name}
                      </h3>
                      <p className="flex sm:gap-3 gap-1 w-full ">
                        <img src={locationMinus} alt="location minus" />
                        <span className="w-36 lg:w-64 font-light sm:text-[15px]  sm:leading-[22px] text-[12px] text-[#8c8c8c]   text-ellipsis overflow-hidden whitespace-nowrap  ">
                          {salonBranch?.address}
                        </span>
                      </p>
                      <div className="w-full flex items-center justify-between ">
                        {/* <div className="flex gap-[5px] items-start">
                            <img src={yellowStar} alt="star" />
                            <p className="font-medium text-[20px] m-0">5</p>
                          </div> */}
                        <div className="flex sm:gap-5 gap-1">
                          <button
                            className="font-medium"
                            onClick={() =>{ setSelectedBranch(salonBranch); setMapModal(true) }}
                          >
                            {t("view_branch")}
                          </button>
                          <Link
                            to={`treatments/branch/${salonBranch?.id}`}
                            onClick={() =>
                              localStorage.setItem("branchId", salonBranch?.id)
                            }
                          >
                            <button className="py-[10px] sm:px-[22px] px-3 text-white font-normal text-[11px] md:text-sm rounded-[12px] bg-[#7338AC] hover:bg-[#6a309f] hover:cursor-pointer transition-all">
                              {t("book_now")}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1  lg:block hidden">
                <div className="w-full h-[550px] rounded-xl overflow-hidden">
                  <Map
                    coords={coords}
                    setCoords={setCoords}
                    setCustomScaleValue={setCustomScaleValue}
                    salonBranches={salonBranches}
                    calcScaleValue={calcScaleValue}
                    organizationData={organizationData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Outlet /> */}
      </Layout>
    </div>
  );
};

export default Branches;
