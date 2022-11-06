import React from "react";
import spinner from "../../Assets/Images/Spinner-3.gif";

const Loader = (props) => {
  return props.isLoading ? (
    <div className="loader">
      <img alt="" src={spinner} />
    </div>
  ) : (
    <div></div>
  );
};

export default Loader;
