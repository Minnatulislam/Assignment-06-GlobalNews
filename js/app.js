const show_categories = document.getElementById("categories");
const countCategories = document.getElementById("countCategories");
const showCards = document.getElementById("showCards");
const modal_body = document.getElementById("modal_body");


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
  loadCategory();

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

//   display all data news 
const displayNews = alldata => {
    const datalist = alldata.data;
    countCategories.innerHTML = "";
    const p = document.createElement("p");
    const dataLength = alldata.data.length;
    if (dataLength) {
      p.innerHTML = dataLength + `   News Found`;
      countCategories.appendChild(p);
    } else {
      p.innerHTML = `No Data Found`;
      countCategories.appendChild(p);
    }
    showCards.innerHTML = "";
    datalist.forEach(data => {
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="card mb-3" style="max-width: 540px" >
              
          </div>
          <div  class="row g-0">
            <div class="col-md-4">
              <img src=${data.thumbnail_url} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text text-truncate">
                  ${data.details}
                </p>
                <div class="d-flex align-items-center justify-content-around">
                   <div>
                        <img src=${data.author.img} class="img-fluid rounded-start w-25"  alt="..." />
                        <p class="card-text">
                              ${data.author.name}
                        </p>
                        <small> ${data.author.published_date}</small>
                   </div>
                   <a onclick= "modalCategoryInfo('${data.category_id}', '${data._id}')"  class="btn btn-primary type="button"
                   class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal""> details
                   </a>
                  
                </div>
              </div>
            </div>
        </div>
        `;
  
      showCards.appendChild(div);
    });
  };


/* Modal category information */
const modalCategoryInfo = (cId, user_id) => {
    let url = `https://openapi.programming-hero.com/api/news/category/${cId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => showData(data, user_id));
  }
  

  /* Modal category information show details */
  const showData = (data, user_id) =>{
    modal_body.innerHTML = "";
    data.data.forEach(data => {
      if (data._id === user_id) {
        let div = document.createElement("div");
        document.querySelector(".modal-title").innerHTML = data.title;
        div.innerHTML = `
        <img src=${data.thumbnail_url} class="img-fluid rounded-start" alt="..." />
        <p class="card-text text-truncate">
                  ${data.details}
        </p>
        
        `;
        modal_body.appendChild(div);
      }
    });
  }


/* show all news in landing display*/
const showAllNews = async () => {
    try {
      const url = `https://openapi.programming-hero.com/api/news/category/08`;
      const res = await fetch(url);
      const allData = await res.json();
      let dataLength = allData.data;
      console.log(dataLength);
      if (dataLength.length) {
        const p = document.createElement("p");
        p.innerHTML = dataLength.length + `   data found`;
        countCategories.appendChild(p);
      } else {
        p.innerHTML = `data not found`;
        countCategories.appendChild(p);
      }
      allData.data.slice(0, 15).forEach(data => {
        const div = document.createElement("div");
  
        div.innerHTML = `
          <div class="card mb-3" style="max-width: 540px" >
              
          </div>
          <div  class="row g-0">
          <div class="col-md-4">
              <img src=${data.thumbnail_url} class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text text-truncate" >
                  ${data.details}
              </p>
              <div class="d-flex align-items-center justify-content-around">
              <div>
                      <img src=${data.author.img} class="img-fluid rounded-start w-2"  alt="..." />
                      <p class="card-text">
                          ${data.author.name}
                      </p>
                      <small> ${data.author.published_date}</small>
              </div>
              <a onclick= "modalCategoryInfo('${data.category_id}', '${data._id}', '${data.total_view}')"  class="btn btn-primary type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal""> details</a>
            </div>
          </div>
              
        </div>
     </div>
        `;
  
        showCards.appendChild(div);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  showAllNews();

