export async function fetchNewsArticles() {
    return Promise.resolve([{
        Id: 0,
        Title:'Lorem ipsum is cool',
        Date: '2024-02-20T15:44:00+00z',
        Image: 'http://tinyurl.com/m8eeusct', 
        Text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups',
    },
    {
        Id: 1,
        Title:'Lorem ipsum is cool',
        Date: '2024-02-20T15:44:00+00z',
        Image: 'http://tinyurl.com/m8eeusct', 
        Text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups',
    },
    ,
    {
        Id: 2,
        Title:'Lorem ipsum is cool',
        Date: '2024-02-20T15:44:00+00z',
        Image: 'http://tinyurl.com/m8eeusct', 
        Text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups',
    }]);
}