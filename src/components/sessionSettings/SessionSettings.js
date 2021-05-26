import React, { useState } from "react";
import { UserPlus } from "@styled-icons/feather";

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
        <h1>test app</h1>
        <div className={"icons"}>
          <UserPlus width={60} height={60} />
        </div>
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
      <div className={"dolby"}>powered by dolby.io</div>
    </div>
  );
};

export default style(SessionSettings);
