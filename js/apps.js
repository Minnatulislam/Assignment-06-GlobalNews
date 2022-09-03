const show_categories = document.getElementById("categories");



// Category option load 
const loadCategory = async() =>{
    try {
      const url = `https://openapi.programming-hero.com/api/news/categories`;
      const response = await fetch(url);
      const data = await response.json();
      showCategory(data.data.news_category);
    } catch (error) {
      throw error;
    }
  }


//   display  Categories function
  const showCategory = categories => {
    categories.forEach(category => {
      const CategoryDiv = document.createElement("div");
      CategoryDiv.innerHTML = `
      <a style="cursor:pointer;" class="text-primary" onclick=showCategoryNews(${category.category_id})>${category.category_name}</a>
        `;
      show_categories.appendChild(CategoryDiv);
    });
  }
  
//   display news category on UI interface
  const showCategoryNews = id => {
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(newsUrl)
      .then(res => res.json())
      .then(data => displayNews(data));
  }

  loadCategory();