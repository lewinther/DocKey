import { Fragment } from "react";

export default function UserInfo({
  profileImage,
  dockNr,
  fullName,
  phoneNr,
  eMail,
}) {
  return (
    <Fragment>
      <div className="user-container">
        <div className="user-image">
          {profileImage &&(
          <img 
          className="news-card-img"
          src={profileImage}
          />
          )}
          {!profileImage &&(
            <div style={{
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(216, 221, 229, 0.847)',
              borderRadius: '10%'
              }}>
              <big>{dockNr}</big>
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
