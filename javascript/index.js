document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded script!");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 &#";

  // get elements with the target class
  const elements = document.querySelectorAll('.heffect');

  // add event listener to each element
  elements.forEach(element => {
    element.onmouseover = event => {
      let iteration = 0;
      let currentInterval = null; // local interval for each iteration
      
      // clear other interval stuff
      if (element.interval) {
        clearInterval(element.interval);
      }

      element.interval = setInterval(() => {
        event.target.innerText = event.target.dataset.value
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index]; //progresivley show original text
            }

            return letters[Math.floor(Math.random() * letters.length)]; // show the random letters
          })
          .join("");

        // Stop once we've iterated through the full text
        if (iteration >= event.target.dataset.value.length) {
          clearInterval(element.interval); // Clear interval once animation completes
        }

        iteration += 1 / 3;
      }, 30);
    };
  });

  // Add dropdown toggle functionality
  const dropdownButtons = document.querySelectorAll('.dropdownButton');
  dropdownButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          const dropdownContent = e.target.nextElementSibling;
          if (window.innerWidth <= 882) {  // Only toggle on mobile
              dropdownContent.classList.toggle('open');
          }
      });
  });
});

function updateScreenSize() {
const screenElement = document.getElementById('screen');
if (screenElement) {
    screenElement.innerText = `Width: ${window.innerWidth}, Height: ${window.innerHeight}`;
}
}

// Call the function on resize
window.addEventListener('resize', updateScreenSize);

// Initial load
updateScreenSize();

function toggleMenu() {
const menu = document.querySelector('.pages'); // Select the pages menu
if (menu) {
    menu.classList.toggle('open'); // Toggle the 'open' class to show/hide the menu
} else {
    console.error("Menu not found! Check the '.pages' selector.");
}
}