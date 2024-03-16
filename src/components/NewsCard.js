import { Fragment } from "react";

export default function NewsCard({ newsData, excerpt, isFeatured, onClick }) {
  const newsTitle = newsData.title;
  const newsDate = newsData.date;
  const newsImg = newsData.image; 
  const newsPreview = excerpt
  const imageContainerClass = isFeatured ? "news-image-container featured" : "news-image-container";

  return (
    <Fragment>
      <div className="card" onClick={onClick}>
      {isFeatured && newsImg && (
          <div className={imageContainerClass}>
            <img className="news-card-img" src={newsImg} alt={newsTitle + " image"} />
          </div>
        )}
        <section className="news-card-body">
          <div className="in-line">
            <p className="news-title">{newsTitle}</p>
            <h5 className="news-date">{newsDate}</h5>
          </div>
          <div className="meta-text">
            <p className="news-content">{newsPreview}</p>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
