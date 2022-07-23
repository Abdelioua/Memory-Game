let btn = document.querySelector(".control-button span");
let asm = document.querySelector(".name span");

let duration = 1000;
// function runs when clicked the button
btn.onclick = function () {
  let msg = prompt("Write your name");
  // if name is empty we display unknown
  if (msg === null || msg === "") {
    asm.innerHTML = "unknown";
  } else {
    asm.innerHTML = msg;
  }
  //remove button from page
  document.querySelector(".control-button").remove();
  welcomeFlip(blocks);
  timer();
};

let blk = document.querySelector(".game-container");
// Getting an array from your game blocks
let blocks = Array.from(blk.children);
// making an empty array that has value of array keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
//call shuffle function
shuffle(orderRange);

//for each block we add an order number
blocks.forEach((e, i) => {
  e.style.order = orderRange[i];
  //calls flip function when clicked on block
  e.addEventListener("click", () => {
    flip(e);
  });
});
function welcomeFlip(e) {
  e.forEach((e) => {
    e.classList.add("is-flipped");
    setTimeout(() => {
      e.classList.remove("is-flipped");
    }, duration);
  });
}
//adds class called is-flipped to the block
function flip(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  //filters all blocks and adds them to variable Allflipped blocks
  let AllFlippedBlocks = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains("is-flipped")
  );
  //checks if allflipped blocks has a length of 2
  if (AllFlippedBlocks.length === 2) {
    //calls no clicking function
    stopClicking();

    checkBlocksMatch(AllFlippedBlocks[0], AllFlippedBlocks[1]);
  }
}
//this function adds a class called no-clicking so it makes all blocks unclickable for a sec
function stopClicking() {
  blk.classList.add("no-clicking");

  setTimeout(() => {
    blk.classList.remove("no-clicking");
  }, duration);
}

function checkBlocksMatch(blockOne, blockTwo) {
  let tries = document.querySelector(".tries span");
  if (blockOne.dataset.technology === blockTwo.dataset.technology) {
    blockOne.classList.remove("is-flipped");
    blockTwo.classList.remove("is-flipped");

    blockOne.classList.add("has-matched");
    blockTwo.classList.add("has-matched");
    document.getElementById("success").play();
  } else {
    setTimeout(() => {
      tries.innerHTML++;
      blockOne.classList.remove("is-flipped");
      blockTwo.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
function timer() {
  countDown = document.querySelector(".time span");
  intervalCount = setInterval(() => {
    countDown.innerHTML--;
    if (countDown.innerHTML === "0") {
      clearInterval(intervalCount);
      countDown.innerHTML = "You Lost";
      countDown.style.color = "red";
      countDown.style.fontWeight = "bold";
    }
  }, 1000);
}
// this function shuffles our blocks array
function shuffle(arr) {
  let counter = arr.length;
  let temp;
  let random;

  while (counter > 0) {
    random = Math.floor(Math.random() * counter);
    counter--;
    temp = arr[counter];

    arr[counter] = arr[random];

    arr[random] = temp;
  }
}
