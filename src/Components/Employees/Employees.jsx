/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import ViewAllBtn from "../Common/ViewAllBtn";
import {
  useAddFavoriteEmployeeMutation,
  useGetEmployeesQuery,
  useRemoveFavoriteEmployeeMutation,
} from "../../Redux/services/EmployeeApi";
import {
  ACCESS_TOKEN,
  API_URL,
  // BOOKING_URL,
} from "../../Config/config.constant";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SVGIcon from "../Common/SVG";
import { Link } from "react-router-dom";
import { addFavorite } from "../../Utils/isFavorites.util";
import { useTranslation } from "react-i18next";
import axios from "axios";
import avaratF from "../../Assets/Images/female.png";
import avatarM from "../../Assets/Images/istockphoto-980239992-612x612.jpg";

const Employees = () => {
  const [favorites, setFavorites] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [flag, setFlag] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const { data, refetch } = useGetEmployeesQuery();
  const [addFavoriteEmployee] = useAddFavoriteEmployeeMutation();
  const [removeFavoriteEmployee] = useRemoveFavoriteEmployeeMutation();
  const token = localStorage.getItem(ACCESS_TOKEN);
  let local_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const { t } = useTranslation();

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${API_URL}/report/landing-page/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setEmployees(res.data?.data);
          setIsloading(false);
        }
      });
  }, []);

  useEffect(() => {
    // console.log('flag worked before setState: ', flag)

    setFlag(true);
    // console.log('flag worked after setState: ', flag)

    if (flag === true) {
      // console.log('flag worked in if: ', flag)
      if (employees?.length) {
        if (!favorites.length && !token) {
          //* !isFavorite.length yoxdursa sert odenir ve !token yoxdursa sert odenir

          setFavorites(local_favorites);
          setEmployees(getEmployeesListAsFav());
        }
        //* LOCALSTORAGE-DƏ DATA OLMAYANDA BU ŞƏRT ÖDƏNİR. setFavorites işə düşür və favorite-ləri dəyişməyə çalışır.
      }
    }
  }, [employees, token]);

  useEffect(() => {
    const employee_favs = getEmployeesListAsFav();
    setEmployees(employee_favs);
    setFlag(false);
  }, [favorites]);

  const getEmployeesListAsFav = () => {
    return employees.map((employee) => {
      employee.isFavorite = favorites.includes(employee.id);
      return { ...employee };
    });
  };

  const getFavoriteEmployeesLocal = () => {
    refetch(data);

    return data?.data?.filter((emp) => local_favorites?.includes(emp.id));
  };
  useEffect(() => {
    return () => {
      if (token) {
        for (let i = 0; i < getFavoriteEmployeesLocal()?.length; i++) {
          addFavorite(
            getFavoriteEmployeesLocal()[i]?.id,
            "EMPLOYEE",
            removeFavoriteEmployee,
            addFavoriteEmployee,
            employees,
            token,
            setEmployees,
            setIsloading
          );
        }
      }
    };
  }, []);

  const addFavoriteToLocalSTG = (id) => {
    const updated_favs = [...favorites, id];
    if (favorites.includes(id)) {
      let a = updated_favs?.filter((fav) => fav !== id);
      setFavorites(a);
      localStorage.setItem("favorites", JSON.stringify(a));
    } else {
      localStorage.setItem("favorites", JSON.stringify(updated_favs));
      setFavorites(updated_favs);
    }
  };

  const checkIsLoggedInForFavoriteIcon = (isFavorite) => {
    return isFavorite ? "favorite" : "notFavorite";
  };

  const handleClick = React.useCallback((e) => {
    e.stopPropagation();

    // This is what you are missing:
    e.preventDefault();
  }, []);

  // const formatImage = (gender) => {
  //   if (gender === "FEMALE") {
  //     return avaratF;
  //   } else {
  //     return avatarM;
  //   }
  // };

  const checkIsLoggedInForSendFavorites = (id, type) => {
    if (!token) {
      addFavoriteToLocalSTG(id);
    } else {
      addFavorite(
        id,
        type,
        removeFavoriteEmployee,
        addFavoriteEmployee,
        employees,
        token,
        setEmployees,
        setIsloading,
        t
      );
    }
  };

  // const checkImagePath = (url) => {
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       return true;
  //     })
  //     .catch((err) => {
  //       return false;
  //     });
  // };


  const rowSkeletons = 4;

  if (isLoading) {
    let rows = [];
    for (let i = 0; i < rowSkeletons; i++) {
      rows.push(
        <div key={i}>
          <div className="h-40 md:h-72">
            <Skeleton style={{ width: "100%", height: "100%" }} />

            <div className="absolute top-6 right-5">
              {/* <Skele src={heartImg} alt="like" /> */}
            </div>
          </div>
          <div className="skeleton bg-white rounded-b-xl pt-2.5 pb-4 px-2.5 shadow">
            <h4 className="text-sm md:text-xl font-medium leading-8 capitalize">
              <Skeleton count={1} />
            </h4>
            <p className="font-light text-sx md:text-lg leading-5 md:leading-7 mb-0">
              <Skeleton count={2} style={{ width: "100%" }} />
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="xl:max-w-[1200px] mx-auto px-2">
        <SkeletonTheme highlightColor="#ffffff">
          <div className="flex justify-between items-start lg:items-center py-10">
            <Title>{t("favorite_beauty_masters")}</Title>
            <ViewAllBtn path="all-employees" />
          </div>
          <div className="grid grid-cols-4 gap-x-5">{rows}</div>
        </SkeletonTheme>
      </div>
    );
  }
  // const checkImagePath = (url) => {
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res, true);
  //       return true;
  //     })
  //     .catch((err) => {
  //       return false;
  //     });
  // };
  return (
    <div className="xl:max-w-[1200px] relative mx-auto px-2">
      <div className="flex justify-between items-start lg:items-center py-10">
        <Title>{t("favorite_beauty_masters")}</Title>
        <ViewAllBtn path="all-employees" />
      </div>
      <div className="custom-long-swiper">
        <Swiper
          grabCursor={false}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }}
          navigation={true}
          preventClicks={true}
          a11y={false}
          // pagination={true}
          slidesPerView={2}
          spaceBetween={20}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  md:gap-12">
            {employees?.map((employee) => {
              const {
                id,
                name,
                surname,
                profession,
                imagePath,
                slug,
                isFavorite,
                gender,
              } = employee;
              return (
                <SwiperSlide className=" py-6 px-8 pb-14 flex justify-center" key={id}>
                  <Link
                    // to={`/masters/${employee?.id}`}
                    to={`booking/${employee?.slug}`}
                  >
                    <div 
                      className="bg-white w-[270px] rounded-xl flex flex-col justify-between relative"
                      style={{height: '385px', boxShadow: '4px 4px 40px rgba(140, 140, 140, 0.25)'}}
                    >
                      <div className=" h-[290px] flex justify-center items-center ">
                      {imagePath === null ? (
                        <div
                          className="w-[200px] mx-auto h-[200px]  rounded-full text-6xl font-semibold flex items-center text-white justify-center  "
                          style={{
                            backgroundColor: "#21D4FD",
                            backgroundImage:
                              "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
                          }}
                        >
                          {name[0].toUpperCase()} {surname[0].toUpperCase()}
                        </div>
                      ) : (
                        <img
                          alt="master"
                          className="w-[100%] h-[100%] object-cover rounded-t-xl"
                          src={`${API_URL}/file?fileName=${imagePath}`}
                        />
                      )}
                        <button
                          className="absolute z-20 top-5 right-5 cursor-pointer"
                          onClick={(e) => {
                            checkIsLoggedInForSendFavorites(id, "EMPLOYEE");
                            handleClick(e);
                          }}
                        >
                          <SVGIcon
                            name={checkIsLoggedInForFavoriteIcon(isFavorite, id)}
                          />
                        </button>
                      </div>
                      <div className="h-[90px] bg-white rounded-b-xl pt-2.5 pb-4 px-2.5 flex flex-col justify-between">
                        <h4 className="text-sm md:text-xl font-medium leading-8 capitalize">
                          {name} {surname}
                        </h4>
                        <p className="font-light text-sx md:text-lg leading-5 md:leading-7 mb-0">
                          {profession}
                        </p>
                      </div>

                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </div>

  );
};

export default Employees;
