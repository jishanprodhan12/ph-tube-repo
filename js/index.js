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
            
            <button class="category-btn btn" id="${item.category_id}">${item.category}</button>
            `
        categoryBtnContainer.appendChild(categoryBtn);
        categoryBtn.onclick = () => loadCategoryVideos(item.category_id);

    })
}

removeActiveClass = () => {
    const allBtn = document.getElementsByClassName('category-btn');
    for (const btn of allBtn) {
        btn.classList.remove('active');
    }
}
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const activeBtn = document.getElementById(`${id}`);
            activeBtn.classList.add("active");

            displayVideos(data.category)
        })
        .catch(err => console.error('error Happend', err))
}
// all video btn 
const allBtnActive = () => {
    removeActiveClass();
    document.getElementById("all-video-btn").classList.add('active');
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
    videosContainer.innerHTML = '';
    if (videos.length === 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
         <div class="text-center font-bold flex items-center justify-center flex-col gap-3 md:gap-5">
                <div class="h-56 w-56">
                    <img src="./assets/Icon.png" alt="" class="w-full">
                </div>
                <h1>Opps! Sorry There is no Content here </h1>
            </div>
        `;
        return;
    }
    videosContainer.classList.add('grid')
    // Set grid layout
    videosContainer.className =
        "w-11/12 mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10  relative";

    // Clear old cards before adding new
    videosContainer.innerHTML = "";

    videos.forEach(item => {
        const videoCard = document.createElement('div');
        const postedDate = convertSeconds(item.others.posted_date)

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
            <div class="flex items-center justify-between gap-4">
            <p class="text-sm text-gray-600">${item.authors[0].profile_name}
            </p>
            <span>
                ${(item.authors[0].verified) ? `<img src="./assets/Group 3.png" alt="">` : ''}
            </span>
            </div>
        </div>

        <!-- Views / Date -->
        <p class="text-sm text-gray-500 mt-1">
                ${item.others.views}  views
        </p>
        ${(postedDate.hours === 0 && postedDate.minutes === 0) ? '' : `<p class="bg-black text-white text-center text-sm w-40 absolute top-40 right-5">  ${postedDate.hours}    hrs ${postedDate.minutes}mins ago </p>`}

        <button class="btn" onclick="my_modal_5.showModal(), showDetails('${item.video_id}')">Details</button>
        
    </div>
</div>
 
        `;
        videosContainer.appendChild(videoCard);
    });
};

function showDetails(id) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
        .then(res => res.json())
        .then(data => showDetailsOnUI(data.video))
        .catch(err => console.log(err));
}
function showDetailsOnUI(data) {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerText = '';
    const detailsDiv = document.createElement('div');

    detailsDiv.innerHTML = `
    <div class="card bg-base-100 shadow rounded-xl overflow-hidden">
                    <!-- Thumbnail -->
                    <figure class="w-full">
                        <img src="${data.thumbnail}" alt="Video Thumbnail" class="w-full h-[200px] object-cover">
                    </figure>

                    <!-- Card body -->
                    <div class="card-body p-3">
                        <!-- Title -->
                        <h2 class="card-title text-base font-semibold">
                            ${data.title}
                        </h2>

                        <!-- Channel info -->
                        <div class="flex items-center gap-2 mt-1">
                            <img src="${data.authors[0].profile_picture}" alt="Channel"
                                class="w-8 h-8 rounded-full object-cover">
                            <div class="flex items-center justify-between gap-4">
                                <p class="text-sm font-bold text-gray-600">${data.authors[0].profile_name}
                                </p>
                                <span>
                                    ${(data.authors[0].verified) ? `<img src="./assets/Group 3.png" alt="">` : ''}
                                </span>
                            </div>
                        </div>

                        <!-- Views / Date -->
                        <p class="text-sm text-gray-500 mt-1">
                            ${data.others.views} views
                        </p>
                    
                        <div class= " text-sm  text-gray-400" >
                        ${data.description}
                        </div>
                    </div>
                </div>
   `
    detailsContainer.appendChild(detailsDiv);
}

function convertSeconds(seconds) {
    const year = 31536000;   // 365 days
    const month = 2592000;   // 30 days
    const week = 604800;     // 7 days
    const day = 86400;       // 1 day
    const hour = 3600;       // 1 hour
    const minute = 60;       // 1 minute

    const y = Math.floor(seconds / year);
    seconds %= year;

    const m = Math.floor(seconds / month);
    seconds %= month;

    const w = Math.floor(seconds / week);
    seconds %= week;

    const d = Math.floor(seconds / day);
    seconds %= day;

    const h = Math.floor(seconds / hour);
    seconds %= hour;

    const min = Math.floor(seconds / minute);
    const sec = seconds % minute;

    return { years: y, months: m, weeks: w, days: d, hours: h, minutes: min, seconds: sec };
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    const searchInput = e.target.value;
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                
                displayVideos(data.videos)
            }, 100)
        })
        .catch(err => console.error(err));
})

document.getElementById('logo-phTube').addEventListener('click',()=>{
    setTimeout(()=>{
        
        window.location.href('./index.html')
    },308000)
})

loadCategory();
loadVideos();