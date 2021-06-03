import React, { useState } from "react";

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
        <form autoComplete="false" onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              autoComplete="off"
              type="search"
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
