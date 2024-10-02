let cards = [];
let currentIndex = 0;
let autoPlayInterval;

// Fetch the color combinations from the external JSON file
fetch("colors.json")
  .then((response) => response.json())
  .then((data) => {
    cards = data;
    updateCard(currentIndex); // Initialize with the first card
  });

// Function to update card colors
function updateCard(index) {
  const card = cards[index];
  gsap.to(".left-half", {
    backgroundColor: card.topColor,
    color: card.topTextColor,
    duration: 1,
  });
  gsap.to(".right-half", {
    backgroundColor: card.bottomColor,
    color: card.bottomTextColor,
    duration: 1,
  });
  document.querySelector(".left-half .hex-code").textContent =
    card.topColor.toUpperCase();
  document.querySelector(".right-half .hex-code").textContent =
    card.bottomColor.toUpperCase();

  document.querySelector(".number").textContent = String(index + 1).padStart(
    2,
    "0"
  );
}

// Button event listeners
document.getElementById("play").onclick = () => {
  clearInterval(autoPlayInterval); // Clear any existing interval
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard(currentIndex);
  }, 2000); // Change card every 2 seconds
};

document.getElementById("pause").onclick = () =>
  clearInterval(autoPlayInterval);

document.getElementById("back").onclick = () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCard(currentIndex);
};

document.getElementById("forward").onclick = () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCard(currentIndex);
};

// Navigate directly to a card by typing a number
document.getElementById("card-number").onchange = (event) => {
  const newIndex = parseInt(event.target.value) - 1;
  if (newIndex >= 0 && newIndex < cards.length) {
    currentIndex = newIndex;
    updateCard(currentIndex);
  }
};

// Copy HEX code
document.getElementById("copy-hex").onclick = () => {
  const topHexCode = document.querySelector(".left-half .hex-code").textContent;
  const bottomHexCode = document.querySelector(
    ".right-half .hex-code"
  ).textContent;
  const hexCodes = `Left: ${topHexCode}, Right: ${bottomHexCode}`;

  navigator.clipboard.writeText(hexCodes).then(() => {
    alert("HEX codes copied: " + hexCodes);
  });
};

// Memorize card
document.getElementById("memorize").onclick = () => {
  const cardNumber = document.querySelector(".number").textContent;
  const memorizedList = document.getElementById("memorized-list");
  const listItem = document.createElement("li");
  listItem.textContent = `${cardNumber}`;
  memorizedList.appendChild(listItem);
};

const shareButton = document.getElementById("share-button");
const hint = document.getElementById("click-hint");
const socialsWrapper = document.querySelector(".socials-wrapper");
const socialsMenu = document.querySelector(".socials-menu"); // Ensure this selects the correct element

const toggleSocials = () => {
  socialsMenu.classList.toggle("active"); // Toggle class on socialsMenu

  // Hide the hint text once the image is clicked
  hint.style.display = "none";

  const shareButtonImage = shareButton.querySelector("img");
  if (shareButtonImage.src.includes("ponITech%20-%20shorten%20logo_without_n.svg")) {
    shareButtonImage.src = "images/close.svg";
  } else {
    shareButtonImage.src = "images/ponITech%20-%20shorten%20logo_without_n.svg";
  }
};


shareButton.addEventListener("click", toggleSocials);

const cardThanks = document.querySelector('.card-thanks');
const cardContent = document.querySelector('.card__content');

// Check if the screen width is small (mobile-sized)
if (window.innerWidth <= 780) {
  // Add a click event listener to the card-thanks element
  cardThanks.addEventListener('click', () => {
    // Toggle the visibility of the content
    if (cardContent.style.transform === 'rotateX(0deg)') {
      cardContent.style.transform = 'rotateX(-90deg)';
    } else {
      cardContent.style.transform = 'rotateX(0deg)';
    }
  });
}


window.onload = function() {
  // Animate all heart images with a staggered effect
  gsap.to('.heart', {
    opacity: 1, 
    scale: 3.5, 
    duration: 3, 
    ease: "power2.out",
    stagger: 0.2,  // Stagger the animation by 0.2 seconds for each heart
    onComplete: function() {
      // After scaling up, fade out and remove the hearts
      gsap.to('.heart', {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        ease: "power2.in",
        stagger: 0.2,  // Apply the same stagger to the fade-out
        onComplete: function() {
          // Optional: Hide the hearts after the animation
          document.querySelectorAll('.heart').forEach(heart => {
            heart.style.display = 'none';
          });
        }
      });
    }
  });
};



