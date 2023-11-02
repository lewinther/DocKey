import { Fragment } from "react";

import NewsCard from "./NewsCard";

export default function NewsCardContainer(){

    return(
        <Fragment>
            <section className="news-card-container">
                <NewsCard />
            </section>
        </Fragment>
    )
}