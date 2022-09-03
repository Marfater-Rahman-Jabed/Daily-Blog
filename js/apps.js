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
    // console.log(data);
    fetch(`https://openapi.programming-hero.com/api/news/category/${data}`)
        .then(res => res.json())
        .then(data => DisplayCategories(data.data))
}

const DisplayCategories = (data) => {
    // console.log(data);
    const NoFound = document.getElementById('no-Found');
    if (data.length > 0) {
        NoFound.classList.add('d-none');
    }
    else {
        NoFound.classList.remove('d-none');
    }

    const quantity = document.getElementById('item-quantites');
    quantity.innerHTML = `
    <h3>
    ${data.length} items categories found
    </h3>
    `

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
                            <img src="${item.author.img}" width='50px' class="rounded-circle">
                           
                           ${item.author.name ? item.author.name : 'Not avilable'} 
                            
                           
                            
                            </div> 
                            <div class="py-3">
                            
                            <i class="fa-solid fa-eye"></i>
                            ${item.total_view ? item.total_view : 'No view Yet'}
                            </div>
                            <div class="py-3">
                            <button onclick="ArrowClick('${item._id}')" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right" ></i></button>
                            
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardSection.appendChild(div);

    })
}

const ArrowClick = (data) => {
    // const url = `https://openapi.programming-hero.com/api/news/{news_id}`
    fetch(`https://openapi.programming-hero.com/api/news/${data}`)
        .then(res => res.json())
        .then(data => detailsArrow(data))

}

const detailsArrow = (data) => {
    console.log(data.data[0].details);
    const modalElement = document.getElementById('modalElement');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
               <p>${data.data[0].details}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

       `;
    modalElement.appendChild(div);

}

const toggler = isloading => {
    const spinner = document.getElementById('loader');
    if (isloading) {
        spinner.classList.remove('d-none');

    }
    else {
        spinner.classList.add('d-none');
    }
}

ArrowClick();

// catagories();
LoadApi();
