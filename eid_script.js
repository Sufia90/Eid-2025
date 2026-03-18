```javascript
const starsContainer = document.getElementById("stars");

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  // Random position
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";

  // Random size (fire-crack effect)
  let size = Math.random() * 4 + 2;
  star.style.width = size + "px";
  star.style.height = size + "px";

  starsContainer.appendChild(star);

  // Remove after some time
  setTimeout(() => {
    star.remove();
  }, 2000);
}

// Continuous creation
setInterval(createStar, 100);
```
