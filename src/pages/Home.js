import { Fragment } from "react";

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
            </div>
        </Fragment>
    );
}