import React from "react";

const Title = ({ children, width }) => {
  return (
    <div className="lg:w-[auto] w-40">
      <h2
        className={`text-xl lg:text-3xl font-semibold leading-7 lg:leading-10 w-full`}
      >
        {children}
      </h2>
    </div>
  );
};

export default Title;
