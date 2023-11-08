import { Fragment } from "react";
import { Link } from "react-router-dom";

// CSS import
import "../../src/styles.css";

// Components
import NewsCardContainer from "../components/NewsCardContainer";
import MessageCardContainer from "../components/MessageCardContainer";

export default function Home(){
    return (
        <Fragment>
            <div className="in-column">
                <h1>Welcome Flemming!</h1>
                <NewsCardContainer />
                <MessageCardContainer/>
                <div className="centered">
                <Link Button className="BlueButton link" to={`/NewMessage`}> Send new message </Link>
                </div>
            </div>
        </Fragment>
    );
}