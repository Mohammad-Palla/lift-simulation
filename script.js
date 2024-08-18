let floorInput = document.getElementById("inputFloor");
let liftInput = document.getElementById("inputLift");
const landingPage = document.getElementById("landingPage");
const generateButton = document.getElementById("generate");
const container = document.querySelector(".container");
const firstLift = document.querySelector(".first-lift");

generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  const numFloors = parseInt(floorInput.value);
  const numLifts = parseInt(liftInput.value);

  if (numFloors > 0 && numFloors < 100) {
    container.classList.remove("hidden");
    landingPage.classList.add("hidden");

    function createFloor(floorNumber, isLastFloor = false) {
      const upButton = isLastFloor
        ? ""
        : '<span><button class="btn btn-up">Up</button></span>';
      const downButton =
        '<span><button class="btn btn-down">Down</button></span>';

      const floorHTML = `
        <div class="floor-container">
          <div class="btn-container">
            ${upButton}
            ${downButton}
          </div>
          <div class="horizontal-flex">
            <hr/>
            <p>Floor ${floorNumber}</p>
          </div>
        </div>`;

      container.insertAdjacentHTML("afterbegin", floorHTML);
    }

    for (let i = 1; i <= numFloors; i++) {
      createFloor(i, i === numFloors);
    }

    generateLifts(numLifts);

    function generateLifts(numLifts) {
      for (let i = 1; i < numLifts; i++) {
        firstLift.insertAdjacentHTML(
          "afterend",
          `<div class="lift">
            <div class="left-door"></div>
            <div class="right-door"></div>
          </div>`
        );
      }
    }

    const lifts = [...document.querySelectorAll(".lift")];
    const leftDoors = document.querySelectorAll(".left-door");
    const rightDoors = document.querySelectorAll(".right-door");
    let currentLiftIndex = 0;
    let liftAnimationIndex = 0;

    function openLiftDoors(liftIndex) {
      leftDoors[liftIndex].classList.add("left-move-open");
      rightDoors[liftIndex].classList.add("right-move-open");
    }

    function closeLiftDoors(liftIndex) {
      leftDoors[liftIndex].classList.add("left-move-close");
      rightDoors[liftIndex].classList.add("right-move-close");
    }

    function resetLiftDoors(liftIndex) {
      leftDoors[liftIndex].classList.remove(
        "left-move-open",
        "left-move-close"
      );
      rightDoors[liftIndex].classList.remove(
        "right-move-open",
        "right-move-close"
      );
    }

    function handleLiftDoors(liftIndex, currentLiftIndex) {
      if (!leftDoors[liftIndex] || !rightDoors[liftIndex]) {
        console.error("Invalid liftAnimationIndex:", liftIndex);
        return;
      }

      openLiftDoors(liftIndex);

      leftDoors[liftIndex].addEventListener(
        "transitionend",
        () => {
          closeLiftDoors(liftIndex);

          setTimeout(() => {
            resetLiftDoors(liftIndex);
            currentLiftIndex = 0;
            console.log(
              "Transition ended, currentLiftIndex:",
              currentLiftIndex
            );
          }, 2500);
        },
        { once: true }
      );
    }

    function liftAnimation(liftAnimationIndex, currentLiftIndex) {
      handleLiftDoors(liftAnimationIndex, currentLiftIndex);
    }

    const btnUp = [...document.querySelectorAll(".btn-up")];
    let count = 0;
    btnUp.reverse();
    btnUp.map((block, index) => {
      block.addEventListener("click", () => {
        block.classList.add("btn-clicked");
        let countUp = index * 2;

        const buttons = document.querySelectorAll(".btn");
        if (count !== countUp) {
          let translateValue = -10 * index - 1;
          let transitionTime = Math.abs(countUp - count);
          console.log(currentLiftIndex, "currentLiftIndex before transition");
          lifts[
            currentLiftIndex
          ].style.transform = `translateY(${translateValue}rem)`;
          lifts[
            currentLiftIndex
          ].style.transition = `transform ${transitionTime}s ease`;

          function transitionRunListener() {
            console.log("transition start", currentLiftIndex);
            if (currentLiftIndex < numLifts - 1) {
              liftAnimationIndex = currentLiftIndex;
              currentLiftIndex += 1;
            } else {
              console.log("currentLiftIndex else run", currentLiftIndex);
              liftAnimationIndex = currentLiftIndex;
              currentLiftIndex = 0;
            }
            console.log("transition next start index", currentLiftIndex);
            this.removeEventListener("transitionrun", transitionRunListener);
          }

          function transitionEndListener() {
            block.classList.remove("btn-clicked");
            liftAnimation(liftAnimationIndex, currentLiftIndex);
            console.log("transitionend");
            this.removeEventListener("transitionend", transitionEndListener);
          }

          lifts[currentLiftIndex].addEventListener(
            "transitionrun",
            transitionRunListener
          );
          lifts[currentLiftIndex].addEventListener(
            "transitionend",
            transitionEndListener
          );
          count = countUp;
        } else {
          block.classList.remove("btn-clicked");
          liftAnimation(liftAnimationIndex, currentLiftIndex);
        }
      });
    });

    const btnDown = [...document.querySelectorAll(".btn-down")];
    btnDown.reverse();
    btnDown.map((block, index) => {
      block.addEventListener("click", () => {
        block.classList.add("btn-clicked");
        const buttons = document.querySelectorAll(".btn");

        let countUp = (index + 1) * 2;
        if (count !== countUp) {
          let translateValue = -10 * index - 11;
          let transitionTime = Math.abs(countUp - count);
          lifts[
            currentLiftIndex
          ].style.transform = `translateY(${translateValue}rem)`;
          lifts[
            currentLiftIndex
          ].style.transition = `transform ${transitionTime}s ease`;

          function transitionRunListener() {
            console.log("transition start");
            console.log(currentLiftIndex);
            if (currentLiftIndex < numLifts - 1) {
              liftAnimationIndex = currentLiftIndex;
              currentLiftIndex += 1;
            } else {
              liftAnimationIndex = currentLiftIndex;
              currentLiftIndex = 0;
            }
            console.log("transition start index", currentLiftIndex);
            this.removeEventListener("transitionrun", transitionRunListener);
          }

          function transitionEndListener() {
            block.classList.remove("btn-clicked");
            liftAnimation(liftAnimationIndex, currentLiftIndex);
            console.log("transitionend");
            this.removeEventListener("transitionend", transitionEndListener);
          }

          lifts[currentLiftIndex].addEventListener(
            "transitionrun",
            transitionRunListener
          );
          lifts[currentLiftIndex].addEventListener(
            "transitionend",
            transitionEndListener
          );
          count = countUp;
        } else {
          block.classList.remove("btn-clicked");
          liftAnimation(liftAnimationIndex, currentLiftIndex);
        }
      });
    });
  } else {
    alert("Please enter a floor value between 0 and 100");
    location.reload();
  }
});
