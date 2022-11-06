import React from "react";
import Map from "../Map/Map";
import closeIcon from './../../../Assets/Images/closeIcon.svg';

const MapModal = ({
  coords,
  setCoords,
  setCustomScaleValue,
  salonBranches,
  calcScaleValue,
  organizationData,
  selectedBranch,
  setMapModal,
}) => {

  return (
    <div className="w-full h-full  fixed top-0 left-0 z-[51] lg:hidden">
      <div className="w-full p-5 fixed top-0 left-0 z-[51]  bg-white bg-opacity-90 flex justify-between ">
        <p className="m-0"></p>
        <p className="m-0 text-[22px] font-medium">{selectedBranch?.name}</p>
        <button onClick={() => setMapModal(false)}>
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
      <Map
        coords={coords}
        setCoords={setCoords}
        setCustomScaleValue={setCustomScaleValue}
        salonBranches={salonBranches}
        calcScaleValue={calcScaleValue}
        organizationData={organizationData}
      />
    </div>
  );
};

export default MapModal;
