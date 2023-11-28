import { Fragment } from "react";

import MessageCard from "./MessageCard";

export default function MessageCardContainer() {
  return (
    <Fragment>
      <h3 className="centered margin-top-30px">
        Check your inbox:
      </h3>
      <section className="news-card-container in-column">
        <MessageCard />
      </section>
    </Fragment>
  );
}
