const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
let index = 0;

// Declare variables to manage auto-slide
let autoSlideInterval;
let isPaused = false; // Track the current state of the auto-slide

function updateCarousel() {
    if (items.length === 0) {
        console.warn("No carousel items found!"); 
        return;
    }

    const width = items[0].getBoundingClientRect().width;
    console.log("Updating carousel. Item width:", width, "Index:", index, "Transform value:", `translateX(-${index * width}px)`); // <--- ADD THIS
    track.style.transform = `translateX(-${index * width}px)`;
}
// Function to start the automatic sliding
function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval to prevent multiple intervals running
    autoSlideInterval = setInterval(() => {
        index = (index + 1) % totalItems;
        updateCarousel();
    }, 6000); // Slide every 6 seconds

    // Update the button text and state when auto-slide starts
    const playPauseBtn = document.getElementById("playPauseBtn");
    if (playPauseBtn) { // Check if button exists before trying to update
        playPauseBtn.textContent = 'Pause';
    }
    isPaused = false;
    console.log('Carousel auto-slide started.');
}

// Function to stop the automatic sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    // Update the button text and state when auto-slide stops
    const playPauseBtn = document.getElementById("playPauseBtn");
    if (playPauseBtn) { // Check if button exists before trying to update
        playPauseBtn.textContent = 'Play';
    }
    isPaused = true;
    console.log('Carousel auto-slide paused.');
}

// --- Event Listeners ---

// Navigation buttons (clicking these will *not* restart auto-slide unless you specifically call startAutoSlide())
nextBtn.addEventListener("click", () => {
    // We only change index and update view; auto-slide remains paused if it was paused.
    // If you want manual navigation to *restart* auto-slide, uncomment `startAutoSlide();`
    // startAutoSlide();
    index = (index + 1) % totalItems;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    // startAutoSlide(); // Uncomment to restart auto-slide on manual navigation
    index = (index - 1 + totalItems) % totalItems;
    updateCarousel();
});

// Window resize (no change here)
window.addEventListener("resize", updateCarousel);

// Add event listener to each carousel image for pausing
items.forEach(item => {
    const image = item.querySelector('img'); // Assuming each item has an <img> directly inside
    if (image) {
        image.addEventListener('click', () => {
    if (isPaused) {
        startAutoSlide(); // Resume
    } else {
        stopAutoSlide();  // Pause
    }
});

    }
});

// --- NEW: Play/Pause Button Logic ---
const playPauseBtn = document.getElementById("playPauseBtn");
if (playPauseBtn) { // Ensure the button exists before adding event listener
    playPauseBtn.addEventListener("click", () => {
        if (isPaused) {
            startAutoSlide(); // If currently paused, play it
        } else {
            stopAutoSlide(); // If currently playing, pause it
        }
    });
}

// Initial calls:
// Ensure carousel is at the correct initial position
updateCarousel();
// Start auto-slide when the page loads
startAutoSlide();

