import { Fragment } from "react";

// CSS import
import "../../src/styles.css";

//Components import
import SearchBar from '../components/SearchBar';
import MessageCardContainerINBOX from '../components/MessageCardContainerINBOX'

export default function MyInbox() {
    return(
    <Fragment>
    <div className="centered">
    <SearchBar />
    </div>
    <MessageCardContainerINBOX />
    </Fragment>
    )
}