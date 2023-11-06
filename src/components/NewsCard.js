import { Fragment, useState, useEffect } from "react";

export default function NewsCard(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("../data/news.json");
            const newsData = await res.json();
            setData(newsData);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div><h2 className="load">Loading...</h2></div>
    }

    const {newsImg, newsTitle, newsDate, newsTekst} = data;

    return(
        <Fragment>
            <div className="card" id={props.newsId}>
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