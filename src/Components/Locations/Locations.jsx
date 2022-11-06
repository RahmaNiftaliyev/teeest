import React, { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from "../../Config/config.constant";
import AllowLocations from "./AllowLocations";
import { getDistanceFromLatLonInKm } from "./distanceHook";

const Locations = ({ salons }) => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/report/landing-page/branches`).then(res => {
      if (res.status === 200) {
        setBranches(res?.data?.data)
      }
    })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      branches?.sort((loc1, loc2) => {
        const dist1 = getDistanceFromLatLonInKm(
          loc1?.location?.lat,
          loc1?.location?.lon,
          position.coords.latitude,
          position.coords.longitude,
        );
        const dist2 = getDistanceFromLatLonInKm(
          loc2?.location?.lat,
          loc2?.location?.lon,
          position.coords.latitude,
          position.coords.longitude,
        );
        return dist1 - dist2;
      })
    });
  }, [branches]);



  return (
    <>
      {/* {isActive ? ( */}
      {/* <Salons title="Location near you" salons={branches} /> */}
      {/* ) : (
      )} */}
      <AllowLocations />
      {/* <Modal visible={isVisible} onOk={() => setIsVisible(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
};

export default Locations;
