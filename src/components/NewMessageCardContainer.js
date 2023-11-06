import { Fragment } from "react";

import InputMessage from "./InputMessage";

export default function NewMessageCardContainer(){

    return(
        <Fragment>
            <section className="new-message-container in-column">
                <InputMessage />
            </section>
        </Fragment>
    )
}