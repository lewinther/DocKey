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
    <>
      {user && (
        <div>
          <h1>Contact Information</h1>
          <div style={{ margin: "8% 0%" }}>
            <UserInfo
              profileImage={profile.profileImage}
              dockNr={profile.dockNr}
              fullName={getFullName()}
              phoneNr={profile.phoneNr}
              eMail={profile.email}
            />
          </div>
          <div style={{ alignSelf:'self-end' }}>
        <div className="button-container">
          <Link
            to="/"
            className="blue-button link"
            style={{ padding: "2% 8%" }}
            onClick={clickDoLogout}
          >
            Logout
          </Link>
        </div>
        <div>
          <p style={{ textAlign: "center" }}>
            {" "}
            <b>Contact the harbor office:</b>
            <br />
            Email: dockey@itu.dk
            <br />
            Give us a call on: +45 12345678
            <br />
            in hour opening hours:
            <br />
            Mon-Fri 10-14
          </p>
        </div>
      </div>
      </div>
      )}

      
      
      <NavbarBottom activeItem={"Profile"} />
    </>
  );
}
