// handle category btn 
function loadCategory(){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then(res=> res.json())
    .then(date=> console.log(date))
    .catch(err=>console.error(err));
}

loadCategory();