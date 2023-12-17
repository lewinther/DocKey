import React, { useEffect } from "react";
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
        const newsTitle = selectedArticle.get('News_Title');
        const newsDate = selectedArticle.get('News_Date').toLocaleDateString();
        const newsContent = selectedArticle.get('News_Text');
        // Retrieve the Parse.File from the Image object
        const imageFile = selectedArticle.get('News_Img') ? selectedArticle.get('News_Img').get('Image_File') : null;
        const newsImg = imageFile ? imageFile.url() : null;

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
        <React.Fragment>
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
        </React.Fragment>
    );
}
