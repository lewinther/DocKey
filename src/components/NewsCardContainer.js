import { Fragment, useEffect } from "react";
import useNewsStore from "../stores/NewsStore"; 
import NewsCard from "./NewsCard";
import CloseButton from "../assets/IconCloseButton";

export default function NewsCardContainer() {
    const { 
        newsArticles, 
        fetchNewsArticles, 
        setSelectedArticle, 
        selectedArticle, 
        getArticleExcerpt 
    } = useNewsStore();


    useEffect(() => {
        async function updateViewData(){
            await fetchNewsArticles();
        }
        (async () => {
          await updateViewData();
        })();
      }, []);

    const renderModal = () => {
        if (!selectedArticle) return null;

        const newsTitle = selectedArticle.title;
        const newsDate = selectedArticle.date;
        const newsContent = selectedArticle.text;
        const newsImg = selectedArticle.image; 

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="modal-close-button" onClick={() => setSelectedArticle(null)}>
                        <CloseButton />
                    </button>
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
            {newsArticles === undefined && (
            <div>
                <h3 className="h3-home">Harbor News</h3>
                <section className="news-card-container scrollbar-hidden">
                    {newsArticles.map((article, index) => (
                        <NewsCard
                            key={article.objectId}
                            newsData={article}
                            excerpt={getArticleExcerpt(article.id)}
                            isFeatured={index === 0} // isFeatured prop based on index - first article is featured
                            onClick={() => setSelectedArticle(article)}
                        />
                    ))}
                </section>
                {renderModal()}
            </div>
            )} 
        </Fragment>
    );
}
