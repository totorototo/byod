import React, { useState } from "react";
import { UserPlus, LogIn, Phone, Users } from "@styled-icons/feather";

import style from "./SessionSettings.Style";

const SessionSettings = ({ className, open }) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    open({ name: userName });
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className={className}>
      <div className={"container"}>
        <div className={"icons"}>
          <LogIn width={40} height={40} />
          <Phone width={40} height={40} />
          <Users width={40} height={40} />
          <UserPlus width={40} height={40} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="userName"
              required
              value={userName}
              onChange={handleUserNameChange}
            />
            <label>User name</label>
          </div>
          <button type="submit">open session</button>
        </form>
      </div>

      <div className={"dolby"}>powered by dolby.io</div>
    </div>
  );
};

export default style(SessionSettings);
