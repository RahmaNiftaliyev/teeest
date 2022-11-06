import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN, API_URL } from "../../../Config/config.constant";
import Layout from "../../../Layouts/Layout";
import MasterComponent from "./MasterComponent";

const MasterPage = () => {
  const [category, setCategory] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [masterData, setMasterData] = useState();
  const token = localStorage.getItem(ACCESS_TOKEN);

  const { id } = useParams();

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${API_URL}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMasterData(res.data?.data);
          setIsloading(false);
        }
      });
  }, []);
  const categories = [
    {
      id: 1,
      categoryName: "Kataloq",
    },
    {
      id: 2,
      categoryName: "Seminarlar",
    },
    {
      id: 3,
      categoryName: "Sertifikatlar",
    },
    {
      id: 4,
      categoryName: "Kurslar",
    },
    {
      id: 5,
      categoryName: "Tələbələr",
    },
    {
      id: 6,
      categoryName: "Müəllimlər",
    },
  ];
  return (
    <Layout>
      <div className="pt-28 w-full">
        <div className="w-full h-[300px] bg-[#E7C2C2]"></div>
        <div className="flex xl:gap-10 gap-5 xl:px-20 px-5 py-[60px]">
          <div className="w-[290px] relative flex-shrink-0">
            <MasterComponent
              masterData={masterData}
              setCategory={setCategory}
              categories={categories}
              category={category}
            />
          </div>
          <div className="w-full">
            <div className="flex gap-8 mb-8">
              {categories.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => setCategory(item?.id)}
                  className={`font-medium xl:text-xl text-lg ${
                    item?.id === category && "text-[#E7C2C2]"
                  } `}
                >
                  {item.categoryName}
                </button>
              ))}
            </div>

            <div className="app__custom-gallery-container1">
              {masterData?.instagramImagesPaths?.map((instaImgPath) => (
                <div
                  key={masterData?.id}
                  className="app__custom-gallery-item-custom"
                >
                  <img
                    src={`${API_URL}/file?fileName=${instaImgPath}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MasterPage;
