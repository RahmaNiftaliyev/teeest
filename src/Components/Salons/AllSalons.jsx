import React from "react";
import {
  ACCESS_TOKEN,
  API_URL,
  BOOKING_URL,
} from "../../Config/config.constant";
import {
  useRemoveFavoriteSalonsMutation,
  useAddFavoriteSalonsMutation,
  useGetSalonsQuery,
} from "../../Redux/services/SalonsApi";
import SVGIcon from "../Common/SVG";
import Layout from "./../../Layouts/Layout";

import {
  addSalontoFavorites,
  redirectToBooking,
} from "../../Utils/isFavorites.util";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem(ACCESS_TOKEN);
const AllSalons = () => {
  const { data: salonsData } = useGetSalonsQuery();
  const salons = salonsData?.data;
  const [addFavoriteSalons] = useAddFavoriteSalonsMutation();
  const [removeFavoriteSalons] = useRemoveFavoriteSalonsMutation();
  const { t } = useTranslation();
  const handleClick = React.useCallback((e) => {
    e.stopPropagation();

    // This is what you are missing:
    e.preventDefault();
  }, []);

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

  return (
    <Layout>
      <div className="xl:w-[1200px] mx-auto  mt-28">
        {/* <TabButton />
        <Filter /> */}
        <div className=" flex flex-wrap lg:justify-start justify-center items-center gap-4 px-2">
          {salons?.map(
            ({
              imagePath,
              name,
              id,
              rating,
              description,
              isFavorite,
              slug,
            }) => (
              <Link
                // onClick={() => redirectToBooking(BOOKING_URL, slug)}
                to={`/booking/${slug}`}
                key={id}
              >
                <div
                  className="bg-white w-[270px] rounded-xl overflow-hidden flex flex-col justify-between relative"
                  style={{
                    height: "385px",
                    boxShadow: "4px 4px 40px rgba(140, 140, 140, 0.25)",
                  }}
                >
                  <div className=" h-[290px] flex justify-center items-center ">
                    {imagePath === null ? (
                      <div
                        className="w-[230px] mx-auto h-[230px]  rounded-full text-6xl font-semibold flex items-center text-white justify-center  "
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
                      className="absolute z-20 top-5 right-5 cursor-pointer"
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
                      <SVGIcon name={isFavorite ? "favorite" : "notFavorite"} />
                    </button>
                  </div>
                  <div className="h-[90px] bg-white rounded-b-xl pt-2.5 pb-4 px-2.5 flex flex-col justify-between">
                    <h4 className="text-sm md:text-xl font-medium leading-8 capitalize">
                      {name}
                    </h4>
                    <p className="font-light text-sx md:text-lg leading-5 md:leading-7 mb-0">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllSalons;
