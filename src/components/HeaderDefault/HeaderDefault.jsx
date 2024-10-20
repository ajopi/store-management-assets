import React from "react";

const HeaderDefault = ({ avatar, userName, userPosition }) => {
  return (
    <>
      <header className="dashboard-user__header">
        <img src={avatar} alt="ini image" />
        <div className="dashboard-user__header-person">
          <h4>{userName}</h4>
          <p>{userPosition}</p>
        </div>
      </header>
    </>
  );
};

export default HeaderDefault;
