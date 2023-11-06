import { Fragment } from "react";

export default function NewsCard({
    newsId,
    newsImg,
    newsTitle,
    newsDate,
    newsTekst,
}) {

async function getNewsData(){
    
}

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