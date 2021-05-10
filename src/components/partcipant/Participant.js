import React from "react";
import { User } from "@styled-icons/feather";

import style from "./Participant.Style";

const Participant = ({
  className,
  x,
  y,
  participant = { id: 12345 },
  ...rest
}) => {
  return (
    <div className={className} {...rest}>
      <div className={"icon"}>
        <User width={50} />
      </div>
      <label>{participant.info.name}</label>
    </div>
  );
};

export default style(Participant);
