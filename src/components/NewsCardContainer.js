import { Fragment, useState, useEffect } from "react";
import Parse from 'parse';
import NewsCard from "./NewsCard";

export default function NewsCardContainer() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      const News = Parse.Object.extend("News");
      const query = new Parse.Query(News);
      query.descending("createdAt");
      query.limit(3); // Limit to 3 articles
      try {
        const results = await query.find();
        setNewsArticles(results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    fetchNews();
  }, []);

  const renderModal = () => {
    if (!selectedArticle) return null;

    // Re-extract data from selected article 
    const newsTitle = selectedArticle.get('News_Title');
    const newsDate = selectedArticle.get('News_Date').toLocaleDateString();
    const newsContent = selectedArticle.get('News_Text');
    const newsImg = selectedArticle.get('News_Img') ? selectedArticle.get('News_Img').url() : null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
        <button className="modal-close-button" onClick={() => setSelectedArticle(null)}>X</button>
          {newsImg && <img src={newsImg} alt={newsTitle} />}
          <p className="bold" id="newsTitle">{newsTitle}</p>
          <p>{newsDate}</p>
          <div className="meta-text">
            <p>{newsContent}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <h3 className="h3-home">Harbor News</h3>
      <section className="news-card-container">
      {newsArticles.map((article) => (
          <NewsCard
            key={article.id}
            newsData={article}
            onClick={() => setSelectedArticle(article)}
          />
        ))}
      </section>
      {renderModal()}
    </Fragment>
  );
}