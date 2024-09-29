import "./App.css";
import React from "react";

function App() {
  const [isEditProfile, setIsEditProfile] = React.useState(false);
  const [isAddProfile, setIsAddProfile] = React.useState(false);
  const [isUpdateProfile, setIsUpdateProfile] = React.useState(false);
  const [profiles, setProfiles] = React.useState([{ name: "Profile 1" }]);
  const [newUserName, setNewUserName] = React.useState("");
  const [updateUserIndex, setUpdateUserIndex] = React.useState(null);

  const handleManageProfiles = () => {
    setIsEditProfile((v) => !v);
  };

  const handleAddButton = () => {
    setIsAddProfile(true);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewUserName(value);
  };

  const handleAddProfile = () => {
    if (isUpdateProfile) {
      setProfiles((v) => {
        if (typeof updateUserIndex == "number") {
          v[updateUserIndex].name = newUserName;
        }
        return v;
      });
      setIsUpdateProfile(false);
      setUpdateUserIndex(null);
      return;
    } else {
      setProfiles((v) => [...v, { name: newUserName }]);
    }
    setNewUserName("");
    setIsAddProfile(false);
  };

  const handleEditUser = (index) => {
    setIsUpdateProfile(true);
    setUpdateUserIndex(index);
    const editUser = profiles[index];
    setNewUserName(editUser.name);
  };

  return (
    <div className="main">
      <div className="profile-info-wrapper">
        <div className="title">Who is watching?</div>
        <div className="profile-manage-wrapper">
          <div className="profile-list-wrapper">
            {profiles.map(({ name }, i) => {
              const handleEdit = () => handleEditUser(i);
              return (
                <div key={name} className="profile-wrapper">
                  <div className="profile-img-wrapper">
                    <img
                      className="profile-img"
                      src="/profile-img.png"
                      alt="profile img"
                    />
                    {isEditProfile ? (
                      <div onClick={handleEdit} className="edit-overlay">
                        <div className="edit-profiles">Edit</div>
                      </div>
                    ) : null}
                  </div>
                  <div className="profile-name">{name}</div>
                </div>
              );
            })}
          </div>
          <div onClick={handleAddButton} className="add-profile">
            <div className="add">+</div>
          </div>
        </div>
        {isAddProfile || isUpdateProfile ? (
          <div className="new-profile-section">
            <div>
              <input
                placeholder="Enter new User Name"
                className="user-inp"
                onChange={handleChange}
                value={newUserName}
              />
              <button onClick={handleAddProfile} className="new-profile-add">
                {isUpdateProfile ? "update" : "add"}
              </button>
            </div>
          </div>
        ) : null}
        <div className="btn-wrapper">
          <button onClick={handleManageProfiles} className="cus-btn">
            {isEditProfile ? "Done" : "Manage profiles"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
