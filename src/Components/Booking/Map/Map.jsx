import React from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_API_KEY } from "../../../Config/config.constant";
import BranchCard from "../Branches/BranchCard";

const Map = ({
  coords,
  setCoords,
  setCustomScaleValue,
  salonBranches,
  calcScaleValue,
  organizationData,
}) => {
  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        defaultCenter={{
          lat: coords ? Number(coords?.lat) : 40.409264,
          lng: coords ? Number(coords?.lng) : 49.867092,
        }}
        center={coords}
        defaultZoom={14}
        // options={''}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
        }}
        onZoomAnimationStart={(e) => setCustomScaleValue(e)}
        // onChildClick={''}
      >
        {salonBranches?.data?.map((salonBranch) => (
          <BranchCard
            salonBranch={salonBranch}
            customScaleValue={calcScaleValue(salonBranch)}
            lat={organizationData && Number(salonBranch?.lat?.toFixed(6))}
            lng={organizationData && Number(salonBranch?.lon?.toFixed(6))}
            key={salonBranch?.id}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
