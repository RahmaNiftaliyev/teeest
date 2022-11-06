import React from "react";
import Title from "../Common/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Autoplay,
  Pagination,
} from "swiper";
import ViewAllBtn from "../Common/ViewAllBtn";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { t } = useTranslation();
  return (
    <div className="pb-10">
      <div className="xl:w-[1200px] mx-auto px-10 xl:px-2">
        <div className="flex justify-between items-start lg:items-center py-10">
          <Title>{t("our_partners")}</Title>
          <ViewAllBtn path="all-partners" />
        </div>
      </div>

      <div className="custom-long-swiper xl:w-[1200px] relative mx-auto px-2 ">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          breakpoints={{
            376: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          navigation={true}
          pagination={false}
          slidesPerView={1.2}
          spaceBetween={20}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className=" h-44">
              <img
                className="w-[100%] h-[100%] object-cover"
                src="https://images.fresha.com/locations/location-profile-images/175689/526671/cf2bc254-27b5-40ee-9231-cad3e1cdd1df.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-44">
              <img
                className="w-[100%] h-[100%] object-cover"
                src="https://cdn.dribbble.com/users/947358/screenshots/11166747/media/387bf90bc3fa2eb61091b4f37e51b682.png?compress=1&resize=400x300&vertical=top"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" h-44">
              <img
                className="w-[100%] h-[100%] object-cover"
                src="https://cdn.dribbble.com/users/1664006/screenshots/10863832/media/f4f78e81d4a53c62f794a1480060ae47.png?compress=1&resize=400x300"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" h-44">
              <img
                className="w-[100%] h-[100%] object-cover"
                src="https://cdn.dribbble.com/users/1664006/screenshots/10863832/media/f4f78e81d4a53c62f794a1480060ae47.png?compress=1&resize=400x300"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" h-44">
              <img
                className="w-[100%] h-[100%] object-cover"
                src="https://images.fresha.com/locations/location-profile-images/175689/526671/cf2bc254-27b5-40ee-9231-cad3e1cdd1df.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-44">
              <img
                className="w-[100%] h-[100%] object-cover"
                src="https://cdn.dribbble.com/users/1664006/screenshots/10863832/media/f4f78e81d4a53c62f794a1480060ae47.png?compress=1&resize=400x300"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Partners;
