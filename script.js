const oxfordAudio = document.getElementById("oxford-audio");
const cambridgeAudio = document.getElementById("cambridge-audio");
const audioElement3 = document.getElementById("audio-element-3");
const audioElement4 = document.getElementById("audio-element-4");
const question = document.getElementById("question");
const partOfSpeech = document.getElementById("part-of-speech");
const answer = document.getElementById("answer");
const meaning = document.getElementById("meaning");
const example = document.getElementById("example");
const failBtn = document.getElementById("fail");
const goodBtn = document.getElementById("good");
const oxfordBtn = document.getElementById("audio1");
const cambridgeBtn = document.getElementById("audio2");
const answerContainer = document.getElementById("answer-container");
const content = document.getElementById("content");
const buttonContainer = document.getElementById("button-container");
const finishMessage = document.getElementById("finish-message");
const border = document.getElementById("border");


let savedData; 
let oldData = [];
let storedArray = [];
let indexOfWordsArray;
let countGoodBtnPressed = 0; 
let randomNumber;
let word = "";
let wordsArray = [
  {
  "word": "ability",
  "partOfSpeech": "noun", 
  "phonetics": "/əˈbɪl.ə.ti/",
  "meaning": "the physical or mental power or skill needed to do something:",
  "example": "There's no doubting her ability.",
  },
  {
  "word": "able",
  "partOfSpeech": "adjective", 
  "phonetics": "/ˈeɪ.bəl/",
  "meaning": "to have the necessary physical strength, mental power, skill, time, money, or opportunity to do something:",
  "example": "Will she be able to cope with the work?",
  },
  {
  "word": "about",
  "partOfSpeech": "preposition", 
  "phonetics": "/əˈbaʊt/",
  "meaning": "on the subject of, or connected with:",
  "example": "What's that book about?",
  },
]

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

function stopAudioPlay() {
  oxfordAudio.pause();
  oxfordAudio.currentTime = 0;
  oxfordAudio.src = ``;
  cambridgeAudio.pause();
  cambridgeAudio.currentTime = 0;
  cambridgeAudio.src = ``;
}

function playOxfordSound() {
    // await sleep(2000);
    oxfordAudio.src = `${word.word}-oxford-uk.mp3`;
    oxfordAudio.onloadedmetadata = () => {
      oxfordAudio.play();
    }
  }

function playCambridgeSound() {
  // await sleep(2000);
  cambridgeAudio.src = `${word.word}-cambridge-uk.mp3`;
  cambridgeAudio.onloadedmetadata = () => {
    cambridgeAudio.play();
  }
}

function randomBetweenZeroAndOne() {
  randomNumber = Math.floor(Math.random()*2);
}

function playSoundRandomly() {
  randomBetweenZeroAndOne();
  if (randomNumber === 0 && answerContainer.style.display === "block") {
    playOxfordSound();
    oxfordAudio.addEventListener("ended", delayedCambridgeSound);
    cambridgeAudio.removeEventListener("ended", delayedOxfordSound);
  } 
  if (randomNumber === 1 && answerContainer.style.display === "block") {
    playCambridgeSound();
    cambridgeAudio.addEventListener("ended", delayedOxfordSound);
    oxfordAudio.removeEventListener("ended", delayedCambridgeSound);
  }
}

function displayWord() {
  question.textContent = word.word;
  partOfSpeech.textContent = word.partOfSpeech;
  answer.textContent = word.phonetics;
  meaning.textContent = word.meaning;
  example.textContent = word.example;
}

function toggleContentVisibility(el) {
    if (el.style.display === "none") {
      el.style.display = "block"; 
    } else {
      el.style.display = "none";
    }
}

function getWord() {
  if (!localStorage.getItem("storedArray")) {
    localStorage.setItem("storedArray", JSON.stringify(wordsArray));
    oldData = JSON.parse(localStorage.getItem("storedArray"));
  } else {
    oldData = JSON.parse(localStorage.getItem("storedArray"));
  }
  if (oldData.length === 0) {
    deckFinished();
  } else { 
    stopAudioPlay();
  toggleContentVisibility(answerContainer);
  toggleContentVisibility(buttonContainer);
  toggleContentVisibility(content);
  toggleContentVisibility(oxfordBtn);
  toggleContentVisibility(cambridgeBtn);
  goodBtn.disabled = false;
  indexOfWordsArray = Math.floor(Math.random() * wordsArray.length);
  word = wordsArray[indexOfWordsArray];  
  displayWord();
  }
}

document.addEventListener("keypress", e => {
  if (e.code === "Space") {
    if (question.style.display !== "none") { 
    toggleContentVisibility(answerContainer);
    toggleContentVisibility(buttonContainer);
    toggleContentVisibility(content);
    toggleContentVisibility(oxfordBtn);
    toggleContentVisibility(cambridgeBtn);
    playSoundRandomly();
    
    }
  }
});

document.addEventListener("keypress", e => {
  if (e.key === "3" && answerContainer.style.display === "block") {
    oxfordPlayOnClick();
  }
})

document.addEventListener("keypress", e => {
  if (e.key === "4" && answerContainer.style.display === "block") {
    cambridgePlayOnClick();
  }
})


document.addEventListener("keypress", e => {
  if (e.key === "7" && answerContainer.style.display === "block") {
    failBtnClick();
  }
})

document.addEventListener("keypress", e => {
  if (e.key === "8" && answerContainer.style.display === "block") {
    goodBtnClick();  
  }
})

function delayedCambridgeSound() {
  playCambridgeSound();
}

function delayedOxfordSound() {
  playOxfordSound();
}

function oxfordPlayOnClick() {
  audioElement3.src = `${word.word}-oxford-uk.mp3`;
  audioElement3.onloadedmetadata = () => {
    audioElement3.play();
  }
}

function cambridgePlayOnClick() {
  audioElement4.src = `${word.word}-cambridge-uk.mp3`;
  audioElement4.onloadedmetadata = () => {
    audioElement4.play();
  }
}

function failBtnClick() {
  stopAudioPlay();
  getWord();
}

function goodBtnClick() {
  stopAudioPlay();
  goodBtn.disabled = true;
  saveUserProgress();
  // getWord();
}

function checkTheCount() {
  savedData = JSON.parse(localStorage.getItem("storedArray"));
  if (savedData[indexOfWordsArray].count > 2) {
    savedData.splice(indexOfWordsArray, 1);
  } 
  localStorage.setItem("storedArray", JSON.stringify(savedData));
  wordsArray = savedData;
  getWord();
}

function deckFinished() {
  answerContainer.style.display = "none";
  buttonContainer.style.display = "none";
  content.style.display = "none";
  oxfordBtn.style.display = "none";
  cambridgeBtn.style.display = "none";
  question.style.display   = "none";
  partOfSpeech.style.display = "none";
  border.style.display = "none";
  finishMessage.hidden = false; 
  document.addEventListener("keypress", e => {
    if (e.code === "Space") {
      return false;
    }
  });   
}

function saveUserProgress() {
  // if (!localStorage.getItem("storedArray")) {
  //   localStorage.setItem("storedArray", JSON.stringify(wordsArray));
  //   oldData = JSON.parse(localStorage.getItem("storedArray"));
  // } else {
  //   oldData = JSON.parse(localStorage.getItem("storedArray"));
  // }
  
  // if (oldData.length === 0) {
  //   deckIsFinishedVar = true;
  //   console.log(deckFinished);
  //   // deckFinished();
  // }
  if (oldData[indexOfWordsArray].count) {
    oldData[indexOfWordsArray].count++;
    console.log(oldData[indexOfWordsArray].word, oldData[indexOfWordsArray].count);
  } else {
    oldData[indexOfWordsArray].count = 1;
    console.log(oldData[indexOfWordsArray].word, oldData[indexOfWordsArray].count);
  }
  localStorage.setItem("storedArray", JSON.stringify(oldData));
  checkTheCount();
}


  // if (oldData.length > 0) {
  //   getWord();
  // } else {
  //   deckFinished();
  // }

getWord();


oxfordBtn.addEventListener("click", oxfordPlayOnClick);
cambridgeBtn.addEventListener("click", cambridgePlayOnClick);
failBtn.addEventListener("click", failBtnClick);
goodBtn.addEventListener("click", goodBtnClick);

