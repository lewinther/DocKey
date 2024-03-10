import { create } from "zustand";
import { fetchNewsArticles } from "../api/connections/news";

export default create((set, get) => ({
    newsArticles: [],
    selectedArticle: null,
    fetchNewsArticles: async () => {
        const newsArticles = await fetchNewsArticles();
        set({ newsArticles });
    },
    getArticleExcerpt(id) {
        const article = get().newsArticles.find(x => x.id === id);
        if(article) return get().article.text.length > 100 ? article.substring(0, 100) : article.text;
        return undefined;
    },
    setSelectedArticle: (article) => {
        set({ selectedArticle: article });
    }
}));
