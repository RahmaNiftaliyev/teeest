import axios from "axios";
import React, { useEffect, useState } from "react";
import AppDownload from "../Components/AppDownload/AppDownload";
import Employees from "../Components/Employees/Employees";
import Hero from "../Components/Hero/Hero";
import Locations from "../Components/Locations/Locations";
import Partners from "../Components/Partners/Partners";
import Salons from "../Components/Salons/Salons";
import Statistic from "../Components/Statistic/Statistic";
import ScrollTop from "../Components/ScrollTop/ScrollTop";
import { API_URL } from "../Config/config.constant";
import Layout from "../Layouts/Layout";
import { useGetSalonsQuery } from "../Redux/services/SalonsApi";
import Spinner from "../Components/Spinner/Spinner";

const Home = ({ setCurrentPage, currentPage }) => {
  // const { data: salonsData, isLoading, refetch } = useGetSalonsQuery();
  // const salons = salonsData?.data;
  const [salons, setSalons] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   refetch(salonsData);
  // }, [refetch, salonsData]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/report/landing-page/organizations`)
      .then((res) => {
        if (res.status === 200) {
          setSalons(res.data?.data);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    // <div className="relative w-full min-h-[100vh]">
    //   <ScrollTop />
    <Layout setCurrentPage={setCurrentPage}>
      <div className="bg-main-color relative">
        {/* <Spinner /> */}
        <Hero />
      </div>
      <div className="pb-12">
        <div className="relative">
          <Employees />
        </div>
        <div className="relative">
          <Salons
            title="Favorite Beauty Salons"
            salons={salons}
            isLoading={isLoading}
          />
        </div>
      </div>
      <AppDownload />
      <Statistic />
      {/* <Partners /> */}
      <Locations salons={salons} />
    </Layout>
    // </div>
  );
};

export default Home;
