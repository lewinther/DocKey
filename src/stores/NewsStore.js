import { create } from "zustand";
import Parse from 'parse';

export default create((set, get) => ({
    newsArticles: [],

    fetchNewsArticles: async () => {
        try {
            const News = Parse.Object.extend("News");
            const query = new Parse.Query(News);
            query.include('News_Img');
            query.descending("createdAt");
            query.limit(3); 

            const results = await query.find();
            set({ newsArticles: results });
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },

    setSelectedArticle: (article) => {
        set({ selectedArticle: article });
    },

    selectedArticle: null,
    
}));