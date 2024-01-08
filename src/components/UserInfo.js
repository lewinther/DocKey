import { Fragment, useRef, useState } from "react";
import Parse from "parse";
import { setProfileImage, setNewPassword } from "../parse/parseHelper";

// stores
import useUserStore from "../stores/UserStore";

//import default profile image and edit-picture
import defaultProfileImage from "../assets/logo6.png";
import editProfileIcon from "../assets/Icon-edit-profile.png";

// Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function UserInfo({ profileImage, fullName, phoneNr, eMail }) {
  const { user } = useUserStore();
  const fileInputRef = useRef(null);
  const [editProfile, setEditProfile] = useState(false);
  const [changePhoto, setChangePhoto] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [passwordText, setPasswordText] = useState("");
  const [secondPasswordText, setSecondPasswordText] = useState("");
  const [displayPasswordFieldsUnequal, setdisplayPasswordFieldsUnequal] = useState(false);
  const [passwordFormValidation, setPasswordFormValidation] = useState(false);
  const regPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

  let imagePreview = imageFile ? imageFile.previewUrl : null;

  function handleClickEditProfile() {
    setEditProfile(true);
  }

  function handleClickChangePhoto() {
    setChangePhoto(true);
  }

  function handleClickChangePassword() {
    setChangePassword(true);
  }

  function handlePassWordTextChange(content) {
    setPasswordText(content.target.value);
  }

  function handleSecondPassWordTextChange(content) {
    setSecondPasswordText(content.target.value);
  }

  function handleGoBack() {
    setEditProfile(false);
    setChangePassword(false);
    setPasswordText("");
    setSecondPasswordText("");
  }

  function handleUploadClick() {
    fileInputRef.current.click();
  }

  function handleImageChange(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImageFile({ file, previewUrl });
      event.target.value = null;
    }
  }

  function onDeleteImage() {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setChangePhoto(false);
  }

  function refresh() {
    window.location.reload("Refresh");
  }

  async function handleSaveClick() {
    if (imageFile) {
      await setProfileImage(user, imageFile.file);
      if ("Profile image updated successfully!") {
        refresh();
      }
    }
  }

  async function handleSavePasswordClick() {
    if (passwordText === secondPasswordText) {
      if(!regPassword.test(passwordText)){
        setPasswordFormValidation(true)
      }
      else {
      await setNewPassword(user, passwordText);
      if ("Password updated successfully!") {
        refresh();
      }
      }
    } 
    else {
      setdisplayPasswordFieldsUnequal(true);
    }
  }

  return (
    <Fragment>
      <div className="user-container-container">
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
              Phone No.: <br /> <b>{phoneNr}</b>
            </p>
            <p>
              E-Mail: <br /> <b>{eMail}</b>
            </p>
          </div>
          <img
            onClick={handleClickEditProfile}
            src={editProfileIcon}
            style={{ width: "8%", height: "8%" }}
            alt="Edit profile"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            padding: "2%",
          }}
        >
          <button className="blue-button link" onClick={handleClickChangePassword}>
            Change Password
          </button>
          {changePassword === true && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  paddingBottom: "0%",
                }}
              >
                <input
                  type={"password"}
                  className="search-input"
                  style={{
                    height: "6vh",
                    textAlign: "center",
                    fontSize: "90%",
                    width: "50%",
                    margin: "2%",
                    borderRadius: '10px',
                    color: "#012657",
                    
                  }}
                  id="password"
                  onChange={handlePassWordTextChange}
                  value={passwordText}
                  placeholder="Type in new password"
                />
                <input
                  type={"password"}
                  className="search-input"
                  style={{
                    height: "6vh",
                    textAlign: "center",
                    fontSize: "90%",
                    width: "50%",
                    margin: "2%",
                    borderRadius: '10px'
                  }}
                  id="password"
                  onChange={handleSecondPassWordTextChange}
                  value={secondPasswordText}
                  placeholder="Repeat new password"
                />
              </div>
                  {displayPasswordFieldsUnequal === true && (
                    <p className="error-messages">Passwords are not the same! </p>
                  )}
                  {passwordFormValidation === true && (
                    <p className="error-messages"
                    style={{textAlign:'center'}}>
                      Please enter a valid password. <br /> 
                      Your password must contain at least one capital letter, one number and the length of eight characters </p>
                  )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "95%",
                  margin: " auto",
                }}
              >
                <button
                  className="blue-button"
                  style={{
                    width: "40%",
                    height: "5vh",
                    marginRight: "2%",
                  }}
                  onClick={handleSavePasswordClick}
                >
                  Save Password
                </button>
                <button
                  className="blue-button"
                  style={{
                    height: "5vh",
                    width: "40%",
                    backgroundColor: "#b3251b",
                    borderColor: "#b3251b",
                  }}
                  onClick={handleGoBack}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {editProfile === true && (
        <>
          {changePhoto === false && (
            <>
              <div
                className="in-column"
                style={{ alignSelf: "right", alignItems: "center" }}
              >
                <button
                  className="blue-button"
                  style={{ marginBottom: "2%", width: "20vh" }}
                  onClick={handleClickChangePhoto}
                >
                  Change photo
                </button>
                <button
                  className="blue-button"
                  style={{
                    height: "5vh",
                    width: "20vh",
                    backgroundColor: "#b3251b",
                    borderColor: "#b3251b",
                  }}
                  onClick={handleGoBack}
                >
                  Go back
                </button>
              </div>
            </>
          )}
          {changePhoto === true && (
            <>
              <div
                className="in-line"
                style={{ marginTop: "3%", height: "11vh" }}
              >
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  {imagePreview && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "52%",
                        }}
                      />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div
                  className="in-column"
                  style={{
                    height: "5vh",
                    width: "50%",
                    alignSelf: "right",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="blue-button"
                    style={{ marginBottom: "4%", width: "20vh" }}
                    onClick={handleUploadClick}
                  >
                    New photo
                  </button>
                  <button
                    className="blue-button"
                    style={{ marginBottom: "4%", width: "20vh" }}
                    onClick={handleSaveClick}
                  >
                    Save changes
                  </button>
                  <button
                    className="blue-button"
                    style={{
                      height: "5vh",
                      width: "20vh",
                      backgroundColor: "#b3251b",
                      borderColor: "#b3251b",
                    }}
                    onClick={onDeleteImage}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Fragment>
  );
}
