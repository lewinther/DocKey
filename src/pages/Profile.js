import { Fragment } from "react";

//Stores
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

//components import
import UserInfo from "../components/UserInfo";
import NavbarBottom from "../components/NavbarBottom";
import PageHeader from "../components/PageHeader";

export default function Profile({ userName }) {
  const user = useUserStore((state) => state.user);
	const doLogout = useUserStore((state) => state.doLogout);

  return (
    <Fragment>
      {user !== undefined && (
        <h3 onClick={async () => await doLogout()} className="h3-home">
          Log out
        </h3>
      )}
      <div className="container-container">
        <h1>Welcome {userName}</h1>
        <h2 className="bold">Contact information</h2>
        <UserInfo />
        <h2 className="bold">Privacy settings</h2>
      </div>
      <NavbarBottom activeItem={"Profile"} />
    </Fragment>
  );
}
