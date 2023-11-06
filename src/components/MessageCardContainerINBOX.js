import { Fragment } from "react";
import { Link } from "react-router-dom";

import "../../src/styles.css";
import MessageCard from "./MessageCard";

export default function MessageCardContainerINBOX(){
	return(
		<Fragment>
			 <section className="news-card-container in-column">
                <MessageCard />
            </section>
		</Fragment>
	)
	
}