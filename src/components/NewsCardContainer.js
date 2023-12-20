import { Fragment, useEffect } from "react";
import useNewsStore from "../stores/NewsStore"; // Adjust the import path to your NewsStore
import NewsCard from "./NewsCard";
import CloseButton from "../assets/IconCloseButton";

export default function NewsCardContainer() {
    const { newsArticles, fetchNewsArticles, setSelectedArticle, selectedArticle } = useNewsStore();

    useEffect(() => {
        if (newsArticles.length === 0) {
            fetchNewsArticles();
        }
    }, [newsArticles.length, fetchNewsArticles]);

    const renderModal = () => {
        if (!selectedArticle) return null;

        // Extract data from selected article
        const newsTitle = selectedArticle.News_Title;
        const newsDate = selectedArticle.News_Date;
        const newsContent = selectedArticle.News_Text;
        const newsImg = selectedArticle.News_Img; 

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
            <h3 className="h3-home">Harbor News</h3>
            <section className="news-card-container scrollbar-hidden">
                {newsArticles.map((article, index) => (
                    <NewsCard
                        key={article.objectId}
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
