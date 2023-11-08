import { Fragment } from "react";

import NewsCard from "./NewsCard";

export default function NewsCardContainer(){

    return(
        <Fragment>
            <section className="in-column centered">
                <h3>Check harbor news:</h3>
                <section className="news-card-container in-column">
                  <NewsCard />
                </section>
            </section>
        </Fragment>
    )
}