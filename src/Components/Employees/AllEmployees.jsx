import React from "react";
import {
  ACCESS_TOKEN,
  API_URL,
  // BOOKING_URL,
} from "../../Config/config.constant";
import {
  useAddFavoriteEmployeeMutation,
  useGetEmployeesQuery,
  useRemoveFavoriteEmployeeMutation,
} from "../../Redux/services/EmployeeApi";
import SVGIcon from "../Common/SVG";
import { addFavorite } from "../../Utils/isFavorites.util";
import Layout from "../../Layouts/Layout";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const token = localStorage.getItem(ACCESS_TOKEN);

const AllEmployees = () => {
  const { data: employeesData } = useGetEmployeesQuery();
  const [addFavoriteEmployee] = useAddFavoriteEmployeeMutation();
  const [removeFavoriteEmployee] = useRemoveFavoriteEmployeeMutation();
  const employees = employeesData?.data;
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
      <div className="xl:w-[1200px] mx-auto  mt-28 px-4">
        {/* <TabButton />
        <Filter /> */}
        <div className=" flex flex-wrap justify-center items-center gap-4">
          {employees?.map(
            ({
              id,
              name,
              surname,
              imagePath,
              profession,
              slug,
              isFavorite,
            }) => (
              <Link key={id} to={`/booking/${slug}`}>
                <div
                  className="bg-white w-[270px] rounded-xl flex flex-col justify-between relative"
                  style={{
                    height: "385px",
                    boxShadow: "4px 4px 40px rgba(140, 140, 140, 0.25)",
                  }}
                >
                  <div className=" h-[290px] flex justify-center items-center ">
                    {imagePath === null ? (
                      <div
                        className="w-[230px] h-[230px] rounded-full text-6xl font-semibold flex items-center text-white justify-center  "
                        style={{
                          backgroundColor: "#21D4FD",
                          backgroundImage:
                            "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
                        }}
                      >
                        {name[0]} {surname[0]}
                      </div>
                    ) : (
                      <img
                        alt="master"
                        className="w-[100%] h-[100%] object-cover rounded-t-xl"
                        src={`${API_URL}/file?fileName=${imagePath}`}
                      />
                    )}
                    <button
                      className="absolute z-20 top-3 right-3 md:top-5 md:right-5 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addFavorite(
                          id,
                          "EMPLOYEE",
                          removeFavoriteEmployee,
                          addFavoriteEmployee,
                          employees,
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
                      {name} {surname}
                    </h4>
                    <p className="font-light text-sx md:text-lg leading-5 md:leading-7 mb-0">
                      {profession}
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

export default AllEmployees;
