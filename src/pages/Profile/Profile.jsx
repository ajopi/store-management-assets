import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <hr />
      <div className="profile-page__container">
        <img src={user.avatar} alt="ini image avatar" />
        <div className="profile-page__details">
          <p>{user.name}</p>
          <p>{user.position}</p>
          <p>{user.id}</p>
          <p>{user.transaction.length} Total Transaction</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
