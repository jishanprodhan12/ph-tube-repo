// handle category btn 
function loadCategory() {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
        .then(res => res.json())
        .then(date => displayCategory(date.categories))
        .catch(err => console.error(err));
}

// demo obj 
// {category_id: '1003', category: 'Comedy'}
// category
// : 
// "Comedy"
// category_id
// : 
// "1003"
// [[Prototype]]
// : 
// Object
const displayCategory = (category) => {
    const categoryBtnContainer = document.getElementById('category-btn-container');
    category.forEach(item => {
        
        const categoryBtn = document.createElement('button');
        categoryBtn.innerHTML = `
            
            <button class="btn ">${item.category}</button>
            `
        categoryBtnContainer.appendChild(categoryBtn);
    })
}
loadCategory();