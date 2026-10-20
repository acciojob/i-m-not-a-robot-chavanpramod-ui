//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("main");

    const classNames = ["img1", "img2", "img3", "img4", "img5"];

    let selectedTiles = [];
    let isVerified = false;

    function initGame() {
        selectedTiles = [];
        isVerified = false;
        mainContainer.innerHTML = "";

        const h3 = document.createElement("h3");
        h3.id = "h";
        h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
        mainContainer.appendChild(h3);

        const imgContainer = document.createElement("div");
        imgContainer.className = "image-container";

        let chosenClasses = [...classNames];
        const duplicateClass = classNames[Math.floor(Math.random() * classNames.length)];
        chosenClasses.push(duplicateClass);

        chosenClasses.sort(() => Math.random() - 0.5);

        chosenClasses.forEach((cls, index) => {
            const img = document.createElement("img");
            img.className = cls;
            img.dataset.id = index;
            img.addEventListener("click", () => handleImageClick(img));
            imgContainer.appendChild(img);
        });

        mainContainer.appendChild(imgContainer);
    }

    function handleImageClick(img) {
        if (isVerified) return;

        const index = selectedTiles.indexOf(img);
        if (index > -1) {
            selectedTiles.splice(index, 1);
            img.style.border = "";
        } else {
            if (selectedTiles.length >= 2) return;

            selectedTiles.push(img);
            img.style.border = "3px solid #0000FF";
        }

        updateUI();
    }

    function updateUI() {
        const existingReset = document.getElementById("reset");
        const existingVerify = document.getElementById("verify");
        if (existingReset) existingReset.remove();
        if (existingVerify) existingVerify.remove();

        if (selectedTiles.length > 0) {
            const resetBtn = document.createElement("button");
            resetBtn.id = "reset";
            resetBtn.textContent = "Reset";
            resetBtn.addEventListener("click", resetState);
            mainContainer.appendChild(resetBtn);
        }

        if (selectedTiles.length === 2) {
            const verifyBtn = document.createElement("button");
            verifyBtn.id = "verify";
            verifyBtn.textContent = "Verify";
            verifyBtn.addEventListener("click", verifySelection);
            mainContainer.appendChild(verifyBtn);
        }
    }

    function resetState() {
        selectedTiles.forEach(img => {
            img.style.border = "";
        });
        initGame();
    }

    function verifySelection() {
        isVerified = true;
        const verifyBtn = document.getElementById("verify");
        if (verifyBtn) verifyBtn.remove();

        const p = document.createElement("p");
        p.id = "para";

        const class1 = selectedTiles[0].className.split(" ")[0];
        const class2 = selectedTiles[1].className.split(" ")[0];

        if (class1 === class2) {
            p.textContent = "You are a human. Congratulations!";
        } else {
            p.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }

        mainContainer.appendChild(p);
    }

    initGame();
});
});