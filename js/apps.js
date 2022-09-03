const LoadApi = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayApi(data.data.news_category));
}

const displayApi = (data) => {
    // console.log(data);
    const catagoriList = document.getElementById('catagory-List');
    catagoriList.classList.add('mx-4');
    data.forEach(item => {
        const text = document.createElement('span');
        // text.innerText = item.category_name;
        text.innerHTML = `
        <span class="mx-3 "><a href="#" class="text-decoration-none text-secondary" onclick ="catagories('${item.category_id}')" id="${item.category_id}">${item.category_name}</a></span>
        `

        catagoriList.appendChild(text);

    });
}

const catagories = (data) => {
    console.log(data);
    fetch(`https://openapi.programming-hero.com/api/news/category/${data}`)
        .then(res => res.json())
        .then(data => DisplayCategories(data.data))
}

const DisplayCategories = (data) => {
    console.log(data);
    const cardSection = document.getElementById('card-section');
    cardSection.innerHTML = ``;

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.innerHTML = `
        <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.image_url}" class="img-fluid rounded-start"  alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h6 class="card-title text-dark">${item.title}</h6>
                            <p class="card-text">${item.details.slice(0, 200)}...</p>
                            <div class="d-flex justify-content-between">
                            <div>
                            <small><img src="${item.author.img}" width='50px' class="rounded-circle"></small>
                           
                           <small class="">${item.author.name}</small>
                            <small>${item.author.published_date}</small>
                           
                            
                            </div> 
                            <div>
                            <small><i class="fa-solid fa-eye"></i></small>
                            <small>${item.total_view}</small><small></small>
                            </div>
                            <div>
                            <i class="fa-solid fa-arrow-right"></i>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardSection.appendChild(div);

    })
}

catagories();
LoadApi();