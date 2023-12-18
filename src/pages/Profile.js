import { useNavigate, Link } from "react-router-dom";

//Stores
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

//components import
import UserInfo from "../components/UserInfo";
import NavbarBottom from "../components/NavbarBottom";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const doLogout = useUserStore((state) => state.doLogout);
  const navigate = useNavigate();

  async function clickDoLogout() {
    try{await doLogout();}
    finally{navigate("/")}
  };

  return (
    <div>
      {user && (
        <section className="in-column centered">
          <h1>Contact information</h1>
          <UserInfo />
          <NavbarBottom activeItem={"Profile"} />
        </section>
      )}
      {user !== undefined && (
        <section className="centered">
        <Link to="/"
          className="blue-button link"
          style={{	position: 'absolute', marginTop: '20vh'}}
          onClick={clickDoLogout}>
          Log out
        </Link>
        </section>
      )}
    </div>
  );
}
