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
        <button className="blue-button"
          style={{	position: 'absolute', marginTop: '20vh'}}
          onClick={async () => await doLogout()}>
          Log out
        </button>
        </section>
      )}
    </div>
  );
}
