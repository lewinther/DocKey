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
            // if news is in local storage and last fetch time is not older than 24 hours
            // parse stored news from local storage and update newsArticles
            if (storedNews && lastFetchTime && (currentTime - lastFetchTime < twentyFourHours)) {
                set({ newsArticles: JSON.parse(storedNews) });
                // return to prevent fetching from server
                return;
            }
    
            // REST API call to fetch news articles
            // Fetch from server if not in local storage or data is old
            const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
            const PARSE_REST_API_KEY = "xGP7JLxEVdOsdPX4pfJXik7nN3NHxz86Tdj9GUDP";
            const PARSE_HOST_URL = "https://parseapi.back4app.com/";

            // Fetch news articles from Parse server with REST API call over HTTPS
            const response = await fetch(`${PARSE_HOST_URL}classes/News?include=News_Img&order=-createdAt&limit=3`, {
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': PARSE_APPLICATION_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY
                }
            });
            // Error handling
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response data
            const responseData = await response.json();
            const newsData = responseData.results; 

            // Adjust data to be more readable
            const adjustedResults = newsData.map(article => {
                // Date is in ISO format, convert to Date object
                const newsDateIso = article.News_Date ? article.News_Date.iso : null;
                const newsDate = newsDateIso ? new Date(newsDateIso) : null;
                const formattedDate = newsDate ? newsDate.toLocaleDateString() : 'Unknown Date';

                // Image is in Parse File format, convert to url
                // when image and imagefile is truthy, return image url, else return null
                const imageUrl = article.News_Img && article.News_Img.Image_File 
                ? article.News_Img.Image_File.url 
                : null;
        
                return {
                    // spread operator to copy all properties of article
                    ...article, 
                    // overwrite following properties with adjusted values
                    News_Img: imageUrl,
                    News_Date: formattedDate 
                };
            });
            
            // Update newsArticles state with adjusted results
            set({ newsArticles: adjustedResults });

            // Update local storage with adjusted results and current time
            localStorage.setItem('newsArticles', JSON.stringify(adjustedResults));
            localStorage.setItem('lastFetchTime', currentTime.toString());
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    // function to set selected article
    setSelectedArticle: (article) => {
        set({ selectedArticle: article });
    },
    // selectedArticle is null by default
    selectedArticle: null,
    
}));
