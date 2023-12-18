import { create } from "zustand";
import Parse from 'parse';

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
            const News = Parse.Object.extend("News");
            const query = new Parse.Query(News);
            query.include('News_Img');
            query.descending("createdAt");
            query.limit(3);
    
            const results = await query.find();
            const adjustedResults = results.map(article => {
                // Format the date
                const newsDate = article.get('News_Date');
                const formattedDate = newsDate ? newsDate.toLocaleDateString() : 'Unknown Date';
        
                // Format the Image object into a URL
                const imageObject = article.get('News_Img');
                const imageUrl = imageObject ? imageObject.get('Image_File').url() : null;
        
                return {
                    // Convert Parse object to plain object
                    ...article.toJSON(), 
                    // Store only the URL
                    News_Img: imageUrl,
                    // Store the formatted date  
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