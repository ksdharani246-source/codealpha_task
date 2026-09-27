/* =========================================
   IMAGE DATA
========================================= */

const images = [

    {
        id: 1,
        title: "Beautiful Mountain",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 2,
        title: "Ocean Waves",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 3,
        title: "Green Forest",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 4,
        title: "Cute Cat",
        category: "Animals",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 5,
        title: "Cat Portrait",
        category: "Animals",
        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 6,
        title: "Wild Lion",
        category: "Animals",
        image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 7,
        title: "Modern Building",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 8,
        title: "City Architecture",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 9,
        title: "Paris Travel",
        category: "Travel",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 10,
        title: "Travel Adventure",
        category: "Travel",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 11,
        title: "Young Traveler",
        category: "People",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 12,
        title: "Beautiful Portrait",
        category: "People",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
    }

];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const galleryGrid = document.getElementById("galleryGrid");
const searchInput = document.getElementById("searchInput");
const imageCount = document.getElementById("imageCount");
const noResults = document.getElementById("noResults");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const closeLightbox =
    document.getElementById("closeLightbox");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

const lightboxFavorite =
    document.getElementById("lightboxFavorite");

const downloadBtn =
    document.getElementById("downloadBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


/* =========================================
   VARIABLES
========================================= */

let selectedCategory = "All";

let searchText = "";

let filteredImages = [...images];

let currentIndex = 0;


/* =========================================
   FAVORITES
========================================= */

let favorites =
    JSON.parse(
        localStorage.getItem("pixelviewFavorites")
    ) || [];


/* =========================================
   DISPLAY GALLERY
========================================= */

function displayImages() {

    /*
       Filter images according to:
       1. Category
       2. Search text
    */

    filteredImages = images.filter(function(image) {

        /* Category filtering */

        let categoryMatch = true;

        if (selectedCategory === "Favorites") {

            categoryMatch =
                favorites.includes(image.id);

        }

        else if (selectedCategory !== "All") {

            categoryMatch =
                image.category === selectedCategory;

        }


        /* Search filtering */

        const searchMatch =
            image.title
                .toLowerCase()
                .includes(searchText.toLowerCase())

            ||

            image.category
                .toLowerCase()
                .includes(searchText.toLowerCase());


        return categoryMatch && searchMatch;

    });


    /* Clear old gallery */

    galleryGrid.innerHTML = "";


    /* Update image count */

    imageCount.textContent =
        `Showing ${filteredImages.length} image${filteredImages.length === 1 ? "" : "s"}`;


    /* No results */

    if (filteredImages.length === 0) {

        noResults.style.display = "block";

        return;

    }

    else {

        noResults.style.display = "none";

    }


    /* =====================================
       CREATE IMAGE CARDS
    ===================================== */

    filteredImages.forEach(function(image, index) {

        const card =
            document.createElement("div");

        card.className = "gallery-card";


        const isFavorite =
            favorites.includes(image.id);


        card.innerHTML = `

            <img
                src="${image.image}"
                alt="${image.title}"
                loading="lazy"
            >

            <button
                class="favorite-btn ${isFavorite ? "active" : ""}"
                data-id="${image.id}"
            >

                <i class="
                    ${isFavorite ? "fa-solid" : "fa-regular"}
                    fa-heart
                "></i>

            </button>


            <div class="card-overlay">

                <h3>${image.title}</h3>

                <p>${image.category}</p>

                <button
                    class="view-btn"
                    data-index="${index}"
                >

                    <i class="fa-solid fa-eye"></i>

                </button>

            </div>

        `;


        galleryGrid.appendChild(card);

    });


    /* =====================================
       VIEW BUTTONS
    ===================================== */

    const viewButtons =
        document.querySelectorAll(".view-btn");


    viewButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);

            openLightbox(index);

        });

    });


    /* =====================================
       FAVORITE BUTTONS
    ===================================== */

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");


    favoriteButtons.forEach(function(button) {

        button.addEventListener("click", function(event) {

            event.stopPropagation();

            const id =
                Number(button.dataset.id);

            toggleFavorite(id);

        });

    });

}


/* =========================================
   CATEGORY BUTTONS
========================================= */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        /*
           Remove active class
           from every button
        */

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /*
           Add active class
           to clicked button
        */

        button.classList.add("active");


        /*
           Get selected category
        */

        selectedCategory =
            button.dataset.category;


        /*
           Display filtered images
        */

        displayImages();

    });

});


/* =========================================
   REAL-TIME SEARCH
========================================= */

searchInput.addEventListener("input", function() {

    /*
       Get whatever user is typing
    */

    searchText =
        searchInput.value.trim();


    /*
       Immediately update gallery
    */

    displayImages();

});


/* =========================================
   FAVORITE FUNCTION
========================================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        /*
           Remove from favorites
        */

        favorites =
            favorites.filter(function(favoriteId) {

                return favoriteId !== id;

            });

    }

    else {

        /*
           Add to favorites
        */

        favorites.push(id);

    }


    /*
       Save favorites
       in browser
    */

    localStorage.setItem(
        "pixelviewFavorites",
        JSON.stringify(favorites)
    );


    /*
       Refresh gallery
    */

    displayImages();


    /*
       Update lightbox heart
    */

    updateLightboxFavorite();

}


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {

    if (filteredImages.length === 0) {

        return;

    }


    currentIndex = index;


    updateLightbox();


    lightbox.classList.add("show");


    document.body.style.overflow = "hidden";

}


/* =========================================
   UPDATE LIGHTBOX
========================================= */

function updateLightbox() {

    const image =
        filteredImages[currentIndex];


    if (!image) {

        return;

    }


    lightboxImage.src =
        image.image;


    lightboxImage.alt =
        image.title;


    lightboxTitle.textContent =
        image.title;


    lightboxCategory.textContent =
        image.category;


    updateLightboxFavorite();

}


/* =========================================
   LIGHTBOX FAVORITE
========================================= */

function updateLightboxFavorite() {

    const image =
        filteredImages[currentIndex];


    if (!image) {

        return;

    }


    const icon =
        lightboxFavorite.querySelector("i");


    if (favorites.includes(image.id)) {

        icon.className =
            "fa-solid fa-heart";

        lightboxFavorite.style.color =
            "#ff4d6d";

    }

    else {

        icon.className =
            "fa-regular fa-heart";

        lightboxFavorite.style.color =
            "";

    }

}


/* =========================================
   NEXT IMAGE
========================================= */

function nextImage() {

    if (filteredImages.length === 0) {

        return;

    }


    currentIndex++;


    /*
       Go back to first image
       after last image
    */

    if (
        currentIndex >=
        filteredImages.length
    ) {

        currentIndex = 0;

    }


    updateLightbox();

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function previousImage() {

    if (filteredImages.length === 0) {

        return;

    }


    currentIndex--;


    /*
       Go to last image
       from first image
    */

    if (currentIndex < 0) {

        currentIndex =
            filteredImages.length - 1;

    }


    updateLightbox();

}


/* =========================================
   LIGHTBOX BUTTONS
========================================= */

nextBtn.addEventListener(
    "click",
    nextImage
);


prevBtn.addEventListener(
    "click",
    previousImage
);


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightboxFunction() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


closeLightbox.addEventListener(
    "click",
    closeLightboxFunction
);


/* =========================================
   CLICK OUTSIDE LIGHTBOX
========================================= */

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightboxFunction();

    }

});


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", function(event) {

    /*
       Only work when lightbox is open
    */

    if (!lightbox.classList.contains("show")) {

        return;

    }


    if (event.key === "ArrowRight") {

        nextImage();

    }


    if (event.key === "ArrowLeft") {

        previousImage();

    }


    if (event.key === "Escape") {

        closeLightboxFunction();

    }

});


/* =========================================
   LIGHTBOX FAVORITE
========================================= */

lightboxFavorite.addEventListener(
    "click",
    function() {

        const image =
            filteredImages[currentIndex];


        if (!image) {

            return;

        }


        toggleFavorite(image.id);

    }
);


/* =========================================
   DOWNLOAD IMAGE
========================================= */

downloadBtn.addEventListener(
    "click",
    function() {

        const image =
            filteredImages[currentIndex];


        if (!image) {

            return;

        }


        /*
           Open image in new tab.
           This works reliably with
           external image URLs.
        */

        window.open(
            image.image,
            "_blank"
        );

    }
);


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",
    function() {

        navMenu.classList.toggle("show");

    }
);


/* =========================================
   CLOSE MOBILE MENU
========================================= */

navMenu.querySelectorAll("a")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                navMenu.classList.remove("show");

            }
        );

    });


/* =========================================
   START WEBSITE
========================================= */

displayImages();