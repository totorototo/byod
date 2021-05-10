import React from "react";
import Style from "./Chrome.Style";

const Chrome = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default Style(Chrome);
