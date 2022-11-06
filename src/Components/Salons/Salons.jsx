import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import ViewAllBtn from "../Common/ViewAllBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper";
import {
  useAddFavoriteSalonsMutation,
  useRemoveFavoriteSalonsMutation,
} from "../../Redux/services/SalonsApi";
import {
  ACCESS_TOKEN,
  API_URL,
  // BOOKING_URL,
} from "../../Config/config.constant";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SVGIcon from "../Common/SVG";
import { Link } from "react-router-dom";
import { addSalontoFavorites } from "../../Utils/isFavorites.util";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Salons = ({ title }) => {
  const [favorites, setFavorites] = useState([]);
  const [addFavoriteSalons] = useAddFavoriteSalonsMutation();
  const [isLoading, setIsloading] = useState(false);
  const [removeFavoriteSalons] = useRemoveFavoriteSalonsMutation();
  const rowSkeletons = 3; 
  const { t } = useTranslation();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [salons, setSalons] = useState([]);
  const [flag, setFlag] = useState(true);

  // const addSalontoFavorites = (
  //   id,
  //   type,
  //   removeFavoritesSalons,
  //   addFavoriteSalons,
  // ) => {
  //   const selectedSalon = salons.find((item) => item.id === id);
  //   if (selectedSalon.isFavorite) {
  //     removeFavoriteSalons({ id, type });
  //     toast.error("Salon bəyənilərdən silindi");
  //   } else {
  //     addFavoriteSalons({ id, type });
  //     toast.success("Salon bəyənilərə əlavə edildi");
  //   }
  // };
  const handleClick = React.useCallback((e) => {
    e.stopPropagation();

    // This is what you are missing:
    e.preventDefault();
  }, []);
  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${API_URL}/report/landing-page/organizations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSalons(res.data?.data);
          setIsloading(false);
        }
      });
  }, []);
  useEffect(() => {
    setFlag(true);
    if (flag === true) {
      if (salons?.length) {
        if (!favorites.length && !token) {
          //* !isFavorite.length yoxdursa sert odenir ve !token yoxdursa sert odenir
          let local_favorites =
            JSON.parse(localStorage.getItem("favorites_salons")) || [];
          setFavorites(local_favorites);
          setSalons(getSalonsListAsFav());
        }
        //* LOCALSTORAGE-DƏ DATA OLMAYANDA BU ŞƏRT ÖDƏNİR. setFavorites işə düşür və favorite-ləri dəyişməyə çalışır.
      }
    }
  }, [salons, token]);

  useEffect(() => {
    const salons_favs = getSalonsListAsFav();
    setSalons(salons_favs);

    setFlag(false);
  }, [favorites, token]);

  useEffect(() => {
    if (token) {
      sendFavIds();
    }
  }, [token, favorites]);

  const getSalonsListAsFav = () => {
    return salons.map((salon) => {
      salon.isFavorite = favorites.includes(salon.id);
      return { ...salon };
    });
  };
  const getFavoriteSalonsLocal = () => {
    return salons?.filter((salon) => {
      let favs = localStorage.getItem("favorites_salons");
      return favs?.includes(salon.id);
    });
  };

  const sendFavIds = () => {
    for (let i = 0; i < getFavoriteSalonsLocal()?.length; i++) {
      addSalontoFavorites(getFavoriteSalonsLocal()[i], "ORGANIZATIONS", t);
    }
    // localStorage.removeItem('favorites');
  };

  const addFavoriteToLocalSTG = (id) => {
    const updated_salons_favs = [...favorites, id];
    if (favorites.includes(id)) {
      let a = updated_salons_favs?.filter((fav) => fav !== id);
      setFavorites(a);
      localStorage.setItem("favorites_salons", JSON.stringify(a));
    } else {
      localStorage.setItem(
        "favorites_salons",
        JSON.stringify(updated_salons_favs)
      );

      setFavorites(updated_salons_favs);
    }
  };
  const checkIsLoggedInForFavoriteIcon = (isFavorite) => {
    // if (!token) {
    //   return "notFavorite";
    // } else {
    return isFavorite ? "favorite" : "notFavorite";
    // }
  };
  const checkIsLoggedInForSendFavorites = (id, type) => {
    if (!token) {
      addFavoriteToLocalSTG(id);
    } else {
      addSalontoFavorites(
        id,
        type,
        removeFavoriteSalons,
        addFavoriteSalons,
        salons,
        token,
        setSalons,
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

  if (isLoading) {
    let rows = [];
    for (let i = 0; i < rowSkeletons; i++) {
      rows.push(
        <div key={i}>
          <div className="h-40 md:h-72">
            <Skeleton style={{ width: "100%", height: "100%" }} />

            <div className="absolute top-6 right-5"></div>
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
      <div className="xl:w-[1200px] mx-auto px-2">
        <SkeletonTheme highlightColor="#ffffff">
          <div className="flex justify-between items-start lg:items-center py-10">
            <Title>{t("favorite_beauty_salons")}</Title>
            <ViewAllBtn path="all-salons" />
          </div>
          <div className="grid grid-cols-3 gap-x-5">{rows}</div>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <>
      <div className="xl:max-w-[1200px] relative mx-auto px-2">
        <div className="flex justify-between items-start lg:items-center mb-10">
          <Title width={40}>{t("favorite_beauty_salons")}</Title>
          <ViewAllBtn path="all-salons" />
        </div>
        <div className="custom-long-swiper">
          <Swiper
            grabCursor={true}
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
            }}
            navigation={true}
            // pagination={true}
            slidesPerView={1.2}
            spaceBetween={20}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            <div>
              {salons?.map(
                ({
                  id,
                  rating,
                  description,
                  name,
                  imagePath,
                  slug,
                  isFavorite,
                }) => {
                  return (
                    <SwiperSlide
                      className=" py-6 px-8 pb-14 flex justify-center"
                      key={id}
                    >
                      <Link to={`booking/${slug}`}>
                        <div
                          className="bg-white lg:w-[330px] w-[270px]  rounded-xl flex flex-col justify-between relative"
                          style={{
                            height: "385px",
                            boxShadow: "4px 4px 40px rgba(140, 140, 140, 0.25)",
                          }}
                        >
                          <div className=" h-[290px] flex justify-center items-center ">
                            {!imagePath ? (
                              <div
                                className="w-[200px] mx-auto h-[200px]  rounded-full text-6xl font-semibold flex items-center text-white justify-center  "
                                style={{
                                  backgroundColor: "#21D4FD",
                                  backgroundImage:
                                    "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
                                }}
                              >
                                {name
                                  .split(" ")
                                  .map((item) => item[0][0].toUpperCase())}
                              </div>
                            ) : (
                              <img
                                className="w-[100%] h-[100%] object-cover rounded-t-xl"
                                src={`${API_URL}/file?fileName=${imagePath}`}
                                alt=""
                              />
                            )}

                            <button
                              className="absolute z-20 top-3 right-3 md:top-6 md:right-5 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addSalontoFavorites(
                                  id,
                                  "ORGANIZATION",
                                  removeFavoriteSalons,
                                  addFavoriteSalons,
                                  salons,
                                  t
                                );
                                handleClick(e);
                              }}
                            >
                              <SVGIcon
                                name={isFavorite ? "favorite" : "notFavorite"}
                              />
                            </button>
                          </div>
                          <div className="bg-white pt-3 px-3 pb-5  rounded-b-xl">
                            <div className="flex items-center justify-between">
                              <h4 className="capitalize text-sm md:text-xl font-medium leading-5 md:leading-8 ">
                                {name}
                              </h4>
                              {/* 
                                <div className="hidden flex items-center">
                                  <img
                                    alt="star-icon"
                                    className="w-5 h-5 mr-2.5 "
                                    src={starIcon}
                                  />
                                  <span className="font-medium text-xl">
                                    {rating}
                                  </span>
                                </div> 
                                */}
                            </div>
                            <p className="font-light text-sx md:text-lg leading-5 md:leading-7 mb-0">
                              {description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                }
              )}
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Salons;
