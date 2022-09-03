const LoadApi = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayApi(data.data.news_category));
}

const displayApi = (data) => {
    console.log(data);
    const catagoriList = document.getElementById('catagory-List');
    catagoriList.classList.add('mx-4');
    data.forEach(item => {
        const text = document.createElement('span');
        // text.innerText = item.category_name;
        text.innerHTML = `
        <span class="mx-3 "><a href="#" class="text-decoration-none text-secondary">${item.category_name}</a></span>
        `

        catagoriList.appendChild(text);
    });


}

LoadApi();