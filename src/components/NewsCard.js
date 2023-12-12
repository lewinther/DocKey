import { Fragment } from "react";

export default function NewsCard({ newsData, onClick }) {
  const newsImg = newsData.get('News_Img') ? newsData.get('News_Img').url() : null;
  const newsTitle = newsData.get('News_Title');
  const newsDate = newsData.get('News_Date').toLocaleDateString();
  const newsText = newsData.get('News_Text');
  const newsPreview = newsText.length > 100 ? `${newsText.substring(0, 100)}...` : newsText;

  return (
    <Fragment>
      <div className="card" onClick={onClick}>
        {newsImg && (
          <img className="news-card-img" src={newsImg} alt={newsTitle + " image"} />
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