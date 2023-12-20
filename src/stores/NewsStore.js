import { create } from "zustand";

export default create((set, get) => ({
    newsArticles: [],

    fetchNewsArticles: async () => {
        try {
            // Check if news articles are in local storage
            const storedNews = localStorage.getItem('newsArticles');
            const lastFetchTime = localStorage.getItem('lastFetchTime');
    
            const currentTime = new Date().getTime();
            const twentyFourHours = 24 * 60 * 60 * 1000; 
    
            // Check if stored news is valid
            if (storedNews && lastFetchTime && (currentTime - lastFetchTime < twentyFourHours)) {
                set({ newsArticles: JSON.parse(storedNews) });
                return;
            }
    
            // Fetch from server if not in local storage or data is old
            const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
            const PARSE_REST_API_KEY = "xGP7JLxEVdOsdPX4pfJXik7nN3NHxz86Tdj9GUDP";
            const PARSE_HOST_URL = "https://parseapi.back4app.com/";

            const response = await fetch(`${PARSE_HOST_URL}classes/News?include=News_Img&order=-createdAt&limit=3`, {
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': PARSE_APPLICATION_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            const newsData = responseData.results; 

            const adjustedResults = newsData.map(article => {
                const newsDateIso = article.News_Date ? article.News_Date.iso : null;
                const newsDate = newsDateIso ? new Date(newsDateIso) : null;
                const formattedDate = newsDate ? newsDate.toLocaleDateString() : 'Unknown Date';

                const imageUrl = article.News_Img && article.News_Img.Image_File 
                ? article.News_Img.Image_File.url 
                : null;
        
                return {
                    ...article, 
                    News_Img: imageUrl,
                    News_Date: formattedDate 
                };
            });

            set({ newsArticles: adjustedResults });
    
            localStorage.setItem('newsArticles', JSON.stringify(adjustedResults));
            localStorage.setItem('lastFetchTime', currentTime.toString());
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    
    setSelectedArticle: (article) => {
        set({ selectedArticle: article });
    },

    selectedArticle: null,
    
}));
