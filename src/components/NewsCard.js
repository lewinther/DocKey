import { Fragment, useEffect } from "react";

//import news data
import data from "../data/news.json"

export default function NewsCard({
    newsId,
    newsImg,
    newsTitle,
    newsDate,
    newsTekst,
}) {

const getNewsData = async () => {
    const res = await fetch("../data/news.json");
    const data = await res.json();
    return data;
};

    return(
        <Fragment>
            <div className="card" id={newsId}>
            <div className="in-line">
            <img className="news-card-img" src={newsImg} alt={newsTitle + " image"}/>
                <section className="news-card-body">
                    <div className="in-line">
                        <p className="bold" id="newsTitle">{newsTitle}</p> 
                        <h5 id="newsDate">{newsDate}</h5>
                    </div>
                        <div className="meta-text">
                        <p>{newsTekst}</p>
                        </div>
                </section>
            </div>
            </div>
        </Fragment>
    )
}