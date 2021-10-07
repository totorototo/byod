import React from "react";

import style from "./Aside.Style";

const Aside = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default style(Aside);
