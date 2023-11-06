import { Fragment } from "react";
import { useParams } from "react-router";


export default function News({
    newsImg,
    newsTitle,
    newsDate,
    newsTekst,
}){

    const { newsId: newsId } = useParams();

    const getNewsData = async () => {
        const res = await fetch('../data/news.json');
        const data = await res.json();
        return (data);
    };

    return (
        <Fragment>
            <div className="col">
                {/* News Picture */}
                <div className="col-xs-12 col-md-7">
                    <img
                    className="news-card-img"
                    id="newsImg"
                    src={"../assets/" + newsImg}
                    alt={newsTitle + " image"}
                    />
                </div>
            </div>
            {/* Text box for meta-text, date etc */}
            <div className="col-xs-12 col-md-5 second-box">
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

        </Fragment>
    )
}