import { Fragment } from "react";

export default function NewsCard({ newsData, isFeatured, onClick }) {
  const newsImg = newsData.News_Img; 
  const newsTitle = newsData.News_Title;
  const newsDate = newsData.News_Date;
  const newsText = newsData.News_Text;
  const newsPreview = newsText.length > 100 ? `${newsText.substring(0, 100)}...` : newsText;
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
