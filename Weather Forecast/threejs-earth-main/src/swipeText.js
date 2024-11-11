import { startZoomAnimation } from "../index.js"; // Import the zoom function

export function initSwipeText() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.color = "white";
  overlay.style.zIndex = "1";
  overlay.style.pointerEvents = "none";
  overlay.style.userSelect = "none";
  document.body.appendChild(overlay);

  const textContainer = document.createElement("div");
  textContainer.id = "textContainer";
  textContainer.style.fontSize = "2em";
  textContainer.style.marginBottom = "20px";
  textContainer.style.whiteSpace = "nowrap";
  textContainer.style.userSelect = "none";
  textContainer.style.pointerEvents = "auto";
  overlay.appendChild(textContainer);

  const enterButton = document.createElement("button");
  enterButton.textContent = "Enter";
  enterButton.style.marginTop = "20px";
  enterButton.style.padding = "10px 20px";
  enterButton.style.fontSize = "1em";
  enterButton.style.color = "white";
  enterButton.style.backgroundColor = "#007BFF";
  enterButton.style.border = "none";
  enterButton.style.borderRadius = "5px";
  enterButton.style.cursor = "pointer";
  enterButton.style.pointerEvents = "auto";
  enterButton.style.userSelect = "none"; // Make button text unselectable
  overlay.appendChild(enterButton);

  const contentData = [
    { text: "Weather Overview", link: "http://127.0.0.1:5000" },
    { text: "Forecast for Tomorrow", link: "https://example.com/forecast" },
    { text: "Temperature Trends", link: "https://example.com/trends" },
    { text: "Climate Analysis", link: "https://example.com/analysis" },
  ];
  let currentIndex = 0;

  textContainer.textContent = contentData[currentIndex].text;
  enterButton.onclick = () => {
    startZoomAnimation(contentData[currentIndex].link);
  };

  let startX = 0;
  const swipeThreshold = 100; // Swipe threshold for changing content

  // Start swipe on mouse down
  overlay.addEventListener("mousedown", (e) => {
    startX = e.clientX;
  });

  // End swipe on mouse up
  overlay.addEventListener("mouseup", (e) => {
    const deltaX = e.clientX - startX;
    
    // Swipe right
    if (deltaX > swipeThreshold) {
      currentIndex = (currentIndex - 1 + contentData.length) % contentData.length;
    } 
    // Swipe left
    else if (deltaX < -swipeThreshold) {
      currentIndex = (currentIndex + 1) % contentData.length;
    }
    
    // Update text and reset position
    textContainer.textContent = contentData[currentIndex].text;
    textContainer.style.transform = "translateX(0)";
    enterButton.style.transform = "translateX(0)";
  });

  // Visual feedback while swiping
  overlay.addEventListener("mousemove", (e) => {
    if (e.buttons !== 1) return; // Only track while mouse is pressed
    const deltaX = e.clientX - startX;
    textContainer.style.transform = `translateX(${deltaX}px)`;
    enterButton.style.transform = `translateX(${deltaX}px)`;
  });
}
