import { Fragment, useState, useEffect } from "react";
import Parse from 'parse';
import NewsCard from "./NewsCard";

export default function NewsCardContainer() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const News = Parse.Object.extend("News");
    const query = new Parse.Query(News);
    // Include the Image object related to the News_Img pointer
    query.include('News_Img');
    query.descending("createdAt");
    query.limit(3); // Limit to 3 articles

    async function fetchNews() {
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

    // Extract data from selected article 
    const newsTitle = selectedArticle.get('News_Title');
    const newsDate = selectedArticle.get('News_Date').toLocaleDateString();
    const newsContent = selectedArticle.get('News_Text');
    // Retrieve the Parse.File from the Image object
    const imageFile = selectedArticle.get('News_Img') ? selectedArticle.get('News_Img').get('Image_File') : null;
    const newsImg = imageFile ? imageFile.url() : null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close-button" onClick={() => setSelectedArticle(null)}>x</button>
          {newsImg && <img src={newsImg} alt={newsTitle} />}
          <p className="news-title">{newsTitle}</p>
          <p>{newsDate}</p>
          <p className="news-content">{newsContent}</p>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <h3 className="h3-home">Harbor News</h3>
      <section className="news-card-container scrollbar-hidden">
        {newsArticles.map((article, index) => (
          <NewsCard
            key={article.id}
            newsData={article}
            isFeatured={index === 0} // isFeatured prop based on index - first article is featured
            onClick={() => setSelectedArticle(article)}
          />
        ))}
      </section>
      {renderModal()}
    </Fragment>
  );
}
