import { Fragment } from "react";

//import default profile image
import defaultProfileImage from "../assets/logo6.png";

export default function UserInfo({ 
  profileImage, 
  fullName, 
  phoneNr, 
  eMail 
}) {
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
      </div>
    </Fragment>
  );
}
