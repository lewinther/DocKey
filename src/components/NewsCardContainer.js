import { Fragment } from "react";

import NewsCard from "./NewsCard";

export default function NewsCardContainer() {
  return (
    <Fragment>
        <h3>Harbor News</h3>
        <section className="news-card-container">
          <NewsCard />
      </section>
    </Fragment>
  );
}
