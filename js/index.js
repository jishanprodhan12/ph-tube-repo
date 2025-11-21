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
function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.error(err))
}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');

    // Set grid layout
    videosContainer.className =
        "w-11/12 mx-auto border-2 border-red-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10";

    // Clear old cards before adding new
    videosContainer.innerHTML = "";

    videos.forEach(item => {
console.log(item.authors[0].profile_picture)
        const videoCard = document.createElement('div');
        videoCard.className = "card bg-base-100 shadow rounded-xl p-0";
        
        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow rounded-xl overflow-hidden">
    <!-- Thumbnail -->
    <figure class="w-full">
        <img src="${item.thumbnail}" alt="Video Thumbnail" class="w-full h-[200px] object-cover">
    </figure>

    <!-- Card body -->
    <div class="card-body p-3">
        <!-- Title -->
        <h2 class="card-title text-base font-semibold">
            ${item.title}
        </h2>

        <!-- Channel info -->
        <div class="flex items-center gap-2 mt-1">
            <img src="${item.authors[0].profile_picture}" alt="Channel" class="w-8 h-8 rounded-full object-cover">
            <p class="text-sm text-gray-600">${item.authors[0].profile_name}</p>
        </div>

        <!-- Views / Date -->
        <p class="text-sm text-gray-500 mt-1">
            VIEWS views • POSTED_DATE
        </p>
    </div>
</div>
 
        `;

        videosContainer.appendChild(videoCard);
    });
};

loadCategory();
loadVideos();