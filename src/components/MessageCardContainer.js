import { Fragment } from "react";

import MessageCard from "./MessageCard";

export default function MessageCardContainer(){

	return(
		<Fragment>
			<h3 className="centered"  style={{ marginTop: '30px' }}  >Check your inbox:</h3>
			<section className="message-card-container in-column">
			<MessageCard />
			</section>
		</Fragment>
	)
}