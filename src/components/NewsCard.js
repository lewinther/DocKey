import { Fragment, useState } from "react";

export default function NewsCard({ newsData, isFeatured, onClick }) {
  const [showFullText, setShowFullText] = useState(false);
  const newsImg = newsData.get('News_Img') ? newsData.get('News_Img').url() : null;
  const newsTitle = newsData.get('News_Title');
  const newsDate = newsData.get('News_Date').toLocaleDateString();
  const newsText = newsData.get('News_Text');
  const cardStyle = isFeatured ? "card featured" : "card";
  const newsPreview = newsText.length > 100 ? `${newsText.substring(0, 100)}...` : newsText;
  const newsContent = showFullText ? newsText : (newsText.length > 100 ? `${newsText.substring(0, 100)}...` : newsText);

  const handleCardClick = () => {
    setShowFullText(!showFullText); // Toggle between preview and full text
    if (onClick) onClick();
  };

  return (
    <Fragment>
      <div className={cardStyle} onClick={handleCardClick}>
        {newsImg && (
          <img className="news-card-img" src={newsImg} alt={newsTitle + " image"} />
        )}
        <section className="news-card-body">
          <div className="in-line">
            <p className="bold" id="newsTitle">{newsTitle}</p>
            <h5 id="newsDate">{newsDate}</h5>
          </div>
          <div className="meta-text">
            <p>{newsContent}</p>
          </div>
        </section>
      </div>
    </Fragment>
  );
}