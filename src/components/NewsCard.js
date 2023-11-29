import { Fragment, useState, useEffect } from "react";
import Parse from 'parse';

export default function NewsCard(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const News = Parse.Object.extend("News");
      const query = new Parse.Query(News);
      query.descending("createdAt"); // Assuming you want the latest news article
      query.first().then((latestNews) => {
        if (latestNews) {
          const newsData = {
            newsImg: latestNews.get('News_Img') ? latestNews.get('News_Img').url() : null,
            newsTitle: latestNews.get('News_Title'),
            newsDate: latestNews.get('News_Date').toLocaleDateString(),
            newsTekst: latestNews.get('News_Text')
          };
          setData(newsData);
        }
      }).catch(error => {
        console.error('Error fetching latest news:', error);
      });
    }
    fetchData();
  }, []);

  if (!data) {
    return (
      <div>
        <h2 className="load">Loading...</h2>
      </div>
    );
  }

  const { newsImg, newsTitle, newsDate, newsTekst } = data;

  return (
    <Fragment>
      <div className="card" id={props.newsId}>
          {newsImg && (
            <img
              className="news-card-img"
              src={newsImg}
              alt={newsTitle + " image"}
            />
          )}
          <section className="news-card-body">
            <div className="in-line">
              <p className="bold" id="newsTitle">
                {newsTitle}
              </p>
              <h5 id="newsDate">{newsDate}</h5>
            </div>
            <div className="meta-text">
              <p>{newsTekst}</p>
            </div>
          </section>
        </div>
    </Fragment>
  );
}
