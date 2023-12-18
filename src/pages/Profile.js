import { useNavigate, Link } from "react-router-dom";

//Stores
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

//components import
import UserInfo from "../components/UserInfo";
import NavbarBottom from "../components/NavbarBottom";

export default function Profile() {
  const { user, profile, getFullName } = useUserStore();
  const doLogout = useUserStore((state) => state.doLogout);
  const navigate = useNavigate();

  async function clickDoLogout() {
    try {
      await doLogout();
    } finally {
      navigate("/");
    }
  }

  return (
    <div style={{ alignContent: "center" }}>
      {user && (
        <div className="">
          <h1>Contact information</h1>
          <UserInfo 
          profileImage={profile.profileImage}
          dockNr={profile.userName}
          fullName={getFullName()}
          phoneNr={profile.phoneNr}
          eMail={profile.email}
          />
        </div>
      )}
      <div style={{ justifyItems: "center", alignContent: "center" }}>
      {user !== undefined && (
          <Link to="/" className="blue-button link"  onClick={clickDoLogout}>
            Log out
          </Link>
      )}
      </div>
      <div style={{ alignSelf: "center" }}>
        <p style={{ textAlign: "center" }}>
          {" "}
          <b>Contact the harbor office:</b>
          <br />
          Email: dockey@itu.dk
          <br />
          Give us a call on: +45 123456
          <br />
          in hour opening hours:
          <br />
          Mon-Fri 10-14
        </p>
      </div>
      <NavbarBottom activeItem={"Profile"} />
    </div>
  );
}
