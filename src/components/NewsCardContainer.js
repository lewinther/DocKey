// fragment and useEffect
import { Fragment, useEffect } from "react";
// zustand: global state store
import useNewsStore from "../stores/NewsStore"; 
// components
import NewsCard from "./NewsCard";
import CloseButton from "../assets/IconCloseButton";


export default function NewsCardContainer() {
    // useNewsStore returns newsArticles, fetchNewsArticles, setSelectedArticle, selectedArticle from Zustand store
    const { newsArticles, fetchNewsArticles, setSelectedArticle, selectedArticle } = useNewsStore();

    // useEffect: runs after the first render and after every update of the dependencies
    useEffect(() => {
        // if newsArticles is empty, fetch news articles
        if (newsArticles.length === 0) {
            fetchNewsArticles();
        }
    }, [newsArticles.length, fetchNewsArticles]);

    // if selectedArticle is not null, returns a modal (= window/dialog box)
    // on close button click, setSelectedArticle is set to null
    const renderModal = () => {
        if (!selectedArticle) return null;

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
    // returns a fragment with a section containing news articles
    return (
        <Fragment>
            <h3 className="h3-home">Harbor News</h3>
            <section className="news-card-container scrollbar-hidden">
                {// map through newsArticles and return a NewsCard component for each article
                    newsArticles.map((article, index) => (
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
