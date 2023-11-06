import { Fragment, useState } from "react";

// CSS import
import "../../src/styles.css";

// Components
import NewMessageCardContainer from "../components/NewMessageCardContainer";
import DockFilter from "../components/DockFilter";


export default function NewMessage() {
    const dockNumbers = ['D1', 'D2', 'D3', 'D4'];
  
    const handleDockSelection = (selectedDockNumber) => {
    console.log(`Selected dock number: ${selectedDockNumber}`);
  };

    return(
        <Fragment>
            <h1>New Message</h1>
            <h3>Which dock do you want to contact ?</h3>
            <DockFilter onDockSelect={handleDockSelection} dockNumbers={dockNumbers} />
            <h3>Your Message:</h3>
            <NewMessageCardContainer />
        </Fragment>
    )
}