import { Fragment, useRef } from "react";

//import default profile image
import defaultProfileImage from "../assets/logo6.png";
import editProfileIcon from "../assets/Icon-edit-profile.png";

export default function UserInfo({ profileImage, fullName, phoneNr, eMail }) {
  const fileInputRef = useRef(null);

  function editProfile() {}

  function onDeleteImage() {}

  function handleAttachClick() {
    fileInputRef.current.click();
  };


  return (
    <Fragment>
      <div className="user-container">
        <div className="user-image-container">
          {profileImage && (
            <div className="user-image">
              <img className="news-card-img" src={profileImage} />
            </div>
          )}
          {!profileImage && (
            <div className="user-image-empty">
              <img src={defaultProfileImage} style={{ width: "100%" }} />
            </div>
          )}
        </div>
        <div className="user-info">
          <p>
            Name: <br /> <b>{fullName}</b>
          </p>
          <p>
            Phone: <br /> <b>{phoneNr}</b>
          </p>
          <p>
            E-mail: <br /> <b>{eMail}</b>
          </p>
        </div>
        <img
          onClick={editProfile}
          src={editProfileIcon}
          style={{ width: "8%", height: "8%" }}
          alt="Edit profile"
        />
        {editProfile === true && (
          <>
            <div className="user-image-container">
              {profileImage && (
                <>
                  <div className="user-image">
                    <img className="news-card-img" src={profileImage} />
                  </div>
                  <button
                    className="delete-image-button"
                    onClick={onDeleteImage}
                    style={{ maxHeight: "6vh" }}
                  >
                    Delete
                  </button>
                  <button className="attach-button" onClick={handleAttachClick}>
                  Attach Photo
                </button>
                </>
              )}
              {!profileImage && (
                <><div className="user-image-empty">
                  <img src={defaultProfileImage} style={{ width: "100%" }} />
                </div><button className="attach-button" onClick={handleAttachClick}>
                    Attach Photo
                  </button></>
              )}
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}
