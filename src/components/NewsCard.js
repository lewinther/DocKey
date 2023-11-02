import { Fragment } from "react";

import NewsPic from "../assets/News_HarborPicture.jpg";

export default function NewsCard() {

    return(
        <Fragment>
            <div className="in-line">
            <img className="news-card-img" src={NewsPic}/>
                <section className="news-card">
                    <div className="in-line">
                        <p className="bold">Dock renovations</p> 
                        <h5>11-02-2023</h5>
                    </div>
                        <div className="meta-text">
                        <p>This is a random text, that should be a description of a news from the dock...</p>
                        </div>
                </section>
            </div>
        </Fragment>
    )
}