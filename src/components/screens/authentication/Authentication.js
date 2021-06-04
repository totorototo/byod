import React from "react";

import style from "./Authentication.Style";

const Authentication = ({ className }) => {
  return (
    <div className={className}>
      <label>initializing...</label>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </div>
  );
};

export default style(Authentication);
