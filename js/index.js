// handle category btn 
function loadCategory() {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
        .then(res => res.json())
        .then(date => displayCategory(date.categories))
        .catch(err => console.error(err));
}
// display category button 
const displayCategory = (category) => {
    const categoryBtnContainer = document.getElementById('category-btn-container');
    category.forEach(item => {
        
        const categoryBtn = document.createElement('button');
        
        categoryBtn.innerHTML = `
            
            <button class="btn " id="${item.category_id}">${item.category}</button>
            `
        categoryBtnContainer.appendChild(categoryBtn);
    })
}

// loadVideos
function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res=> res.json())
    .then(data=> console.log(data.videos))
    .catch(err=> console.error(err))
}


loadCategory();
loadVideos();