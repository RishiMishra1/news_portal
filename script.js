const apiKey = '63fbd8a775114fbcab9d339dd7bfd4c1';
const blogContainer = document.getElementById('blog-container');

const searchField=document.getElementById("search-input");
const searchbutton=document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles; // Access the articles property
    } catch (error) {
        console.error("error fetching random news", error);
        return [];
    }
}

searchbutton.addEventListener("click",async ()=>{
    const query=searchField.value.trim();
    if (query != ""){
        try{
            const articles=await fetchNewsQuery(query);
            displayBlogs(articles);

        }catch(err){
            console.log("error fetching news by query",err)

        }
    }
})


async function fetchNewsQuery(query) {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        return data.articles;
      } else {
        console.error('Error fetching news by query:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching news by query:', error);
      return [];
    }
  }

function displayBlogs(articles) {
    if (!articles || articles.length === 0) {
      blogContainer.innerHTML = 'No news found for this query.';
    } else {
      blogContainer.innerHTML = '';
      articles.forEach((article) => {
        // ... (rest of the code remains the same)
        blogContainer.innerHTML = '';
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card")
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
            const truncatedTitle= article.title.length > 30 ? article.title.slice(0,30) + "....":article.title;
            title.textContent=truncatedTitle;
            const description = document.createElement("p");
            //const truncatedescription= article.description.length > 30 ? article.description.slice(0,30) + "....":article.description;
            description.textContent=article.description;
    
            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener('click',()=>{
                window.open(article.url,"_blank")
            })
            blogContainer.appendChild(blogCard);
        });
      });
    }
  }



(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (err) {
        console.error("error fetching random news", err);
    }
})();
