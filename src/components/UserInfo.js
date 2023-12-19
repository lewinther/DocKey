import { Fragment, useRef, useState } from "react";
import Parse from "parse";
import { setProfileImage } from '../parse/parseHelper';

// stores
import useUserStore from "../stores/UserStore";

//import default profile image and edit-picture
import defaultProfileImage from "../assets/logo6.png";
import editProfileIcon from "../assets/Icon-edit-profile.png";

// Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function UserInfo({ profileImage, fullName, phoneNr, eMail }) {
  //const {imageFile, setImageFile} = useUserStore();
  const { user } = useUserStore();
  const fileInputRef = useRef(null);
  const [editProfile, setEditProfile] = useState(false);
  const [changePhoto, setChangePhoto] = useState(false);
  const [imageFile, setImageFile] = useState(null)
  let imagePreview = imageFile ? imageFile.previewUrl : null;


  function handleClickEditProfile() {
    setEditProfile(true);
    return editProfile;
  }

  function handleClickChangePhoto(){
    setChangePhoto(true);
    return changePhoto;
  }

  function handleGoBack(){
    setEditProfile(false);
    return editProfile;
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
  };

  function onDeleteImage(){
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setChangePhoto(false);
  };

  async function handleSaveClick() {
    //await setProfileImage(user, imageFile.file);
    console.log(user, await setProfileImage(user, imageFile.file));
    console.log(imageFile.file);
    console.log('you tried to save a new picture');
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
              Phone: <br /> <b>{phoneNr}</b>
            </p>
            <p>
              E-mail: <br /> <b>{eMail}</b>
            </p>
          </div>
          <img
            onClick={handleClickEditProfile}
            src={editProfileIcon}
            style={{ width: "8%", height: "8%" }}
            alt="Edit profile"
          />
        </div>
        <p className="bold">Change password</p>
      </div>
      {editProfile === true && (
        <>
        {changePhoto === false && (
        <>
          <div className="in-column" style={{alignSelf:'right', alignItems: 'center'}}>
            <button
              className="blue-button"
              style={{ marginBottom:'2%', width:'20vh'}}
              onClick={handleClickChangePhoto}
            >
              Change photo
            </button>
            <button 
              className="blue-button" 
              style={{ height:'5vh', width:'20vh', backgroundColor:'#b3251b', borderColor:'#b3251b'}}
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </>
        )}
        {changePhoto === true && (
        <>
          <div className="in-line" style={{marginTop:'3%', height:'11vh'}}>
            <div style={{ width:'50%', display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
            {imagePreview && (
                <div style={{ display: 'flex',flexDirection:'column', alignContent: 'center' }} >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ display: 'block', marginLeft: 'auto', marginRight:'auto', width:'52%' }}
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
              style={{height:'5vh', width:'50%', alignSelf:'right', alignItems: 'center'}}
            >
            <button
              className="blue-button"
              style={{ marginBottom:'4%', width:'20vh'}}
              onClick={handleUploadClick}
            >
              New photo
            </button>
            <button
              className="blue-button"
              style={{ marginBottom:'4%', width:'20vh'}}
              onClick={handleSaveClick}
            >
              Save changes
            </button>
            <button 
              className="blue-button" 
              style={{ height:'5vh', width:'20vh', backgroundColor:'#b3251b', borderColor:'#b3251b'}}
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
