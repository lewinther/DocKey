import { create } from "zustand";

export default create((set, get) => ({
    newsArticles: [],

    fetchNewsArticles: async () => {
        try {
            // Check if news articles are in local storage
            const storedNews = localStorage.getItem('newsArticles');
            const lastFetchTime = localStorage.getItem('lastFetchTime');
    
            const currentTime = new Date().getTime();
            // 24 hours in milliseconds
            const twentyFourHours = 24 * 60 * 60 * 1000; 
    
            // Check if stored news is valid and not older than 24 hours
            if (storedNews && lastFetchTime && (currentTime - lastFetchTime < twentyFourHours)) {
                set({ newsArticles: JSON.parse(storedNews) });
                return;
            }
    
            // Fetch from server if not in local storage or data is old
            const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
            const PARSE_REST_API_KEY = "xGP7JLxEVdOsdPX4pfJXik7nN3NHxz86Tdj9GUDP";
            const PARSE_HOST_URL = "https://parseapi.back4app.com/";

            const response = await fetch(`${PARSE_HOST_URL}classes/News`, {
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
            const newsData = responseData.results; // Parse typically wraps results in a "results" array

            const adjustedResults = newsData.map(article => {
                // Format the date
                const newsDate = new Date(article.News_Date);
                const formattedDate = newsDate ? newsDate.toLocaleDateString() : 'Unknown Date';
        
                return {
                    ...article, 
                    News_Date: formattedDate
                };
            });

            set({ newsArticles: adjustedResults });
    
            // Store the fetched news and current timestamp in local storage
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
