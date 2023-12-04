import { Fragment } from "react";

import NewsCard from "./NewsCard";

export default function NewsCardContainer() {
  return (
    <Fragment>
        <h3  className="h3-home">Harbor News</h3>
        <section className="news-card-container">
          <NewsCard />
      </section>
    </Fragment>
  );
}
