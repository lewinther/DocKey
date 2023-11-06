import { Fragment } from "react";

// CSS import
import "../../src/styles.css";

//components import
import UserInfo from "../components/UserInfo";

export default function Profile() {
    return(
    <Fragment>
        <div className="container-container">
        <h1>Welcome Flemming</h1>
        <h2 className="bold">Contact information</h2>
        <UserInfo />
        </div>
    </Fragment>
    )
}