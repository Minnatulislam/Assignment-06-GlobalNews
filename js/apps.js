async function loadCategory() {
    try {
      const url = `https://openapi.programming-hero.com/api/news/categories`;
      const response = await fetch(url);
      const data = await response.json();
      showCategory(data.data.news_category);
    } catch (error) {
      throw error;
    }
  }
  loadCategory();