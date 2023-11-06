import { Fragment } from "react";
import { Link } from "react-router-dom";

// CSS import
import "../../src/styles.css";

// Components
import NewsCardContainer from "../components/NewsCardContainer";

export default function Home(){
    return (
        <Fragment>
            <div className="in-column">
                <h1>Welcome Flemming</h1>
                <h3>Check harbor news:</h3>
                <NewsCardContainer />
                <h3>Check your inbox:</h3>
                <Link Button className="BlueButton link" to={`/NewMessage`}> Send new message </Link>
            </div>
        </Fragment>
    );
}