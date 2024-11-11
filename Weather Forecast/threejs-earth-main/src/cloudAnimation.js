export function startCloudAnimation(targetUrl) {
    const overlay = document.createElement("div");
    overlay.id = "cloudOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "10";
    overlay.style.overflow = "hidden";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1s ease-in-out";
    document.body.appendChild(overlay);

    const loadingContainer = document.createElement("div");
    loadingContainer.style.position = "relative";
    loadingContainer.style.zIndex = "20";
    overlay.appendChild(loadingContainer);

    const loadingText = document.createElement("div");
    loadingText.textContent = "Loading...";
    loadingText.style.fontSize = "3em";
    loadingText.style.color = "white";
    loadingText.style.position = "relative";
    loadingText.style.zIndex = "30";
    loadingText.style.textAlign = "center";
    loadingContainer.appendChild(loadingText);

    const cloudImageUrls = [
        "./textures/cloud1.png",
        "./textures/cloud1.png",
        "./textures/cloud1.png",
        "./textures/cloud1.png",
    ];

    cloudImageUrls.forEach((url, index) => {
        const cloud = document.createElement("img");
        cloud.src = url;
        cloud.style.position = "absolute";
        cloud.style.width = "300px"; // Adjust width for rectangular image
        cloud.style.height = "auto"; // Maintain aspect ratio
        cloud.style.opacity = "0";
        cloud.style.transition = "all 2s ease-out";
        overlay.appendChild(cloud);

        // Position cloud in corners
        switch (index) {
            case 0:
                cloud.style.top = "10%";
                cloud.style.left = "10%";
                break;
            case 1:
                cloud.style.top = "10%";
                cloud.style.right = "10%";
                break;
            case 2:
                cloud.style.bottom = "10%";
                cloud.style.left = "10%";
                break;
            case 3:
                cloud.style.bottom = "10%";
                cloud.style.right = "10%";
                break;
        }

        // Animate cloud movement to closer to the center with overlap
        setTimeout(() => {
            cloud.style.transform = "translate(-20%, -20%) scale(5)";
            cloud.style.opacity = "0.9";
        }, index * 500); // Stagger animations
    });

    // Fade in overlay
    setTimeout(() => {
        overlay.style.opacity = "1";
    }, 500);

    // Redirect after animation completes
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 4000);
}
