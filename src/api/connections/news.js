import {supabase} from "../supabase/supabaseClient";
export async function fetchNewsArticles() {
    const {data, error} = await supabase
    .from('news_articles')
    .select();
    if(error){
        console.log(error.message);
        throw new error(error);
    }

    const articles = [];
    data.map(x => {
        articles.push(
            {
                id: x.id,
                title: x.title,
                date: x.created_at,
                image: x.image, 
                text: x.text
            });
        }
    );
    return articles;
}