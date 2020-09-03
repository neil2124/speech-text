const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const readBtn = document.getElementById("read");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement("div");
  //Destructuring
  const { image, text } = item;
  // Add A Class
  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt=${text}  />
    <p class="info">${text}</p>
    `;
  box.addEventListener("click", () => {
    setMessageText(text);
    speakText(text);

    //Add An Active Effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  //@todo  -  speak event
  main.appendChild(box);
}

//Init Speech Synth
const message = new SpeechSynthesisUtterance();

//Store Voices
let voices = [];

//Get Voices
function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

//Set Text Message
function setMessageText(text) {
  message.text = text;
}

//Speak The Message
function speakText() {
  speechSynthesis.speak(message);
}

//Selecting The Voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

//Event Listeners

//Voices Change
speechSynthesis.addEventListener("voiceschanged", getVoices);

//Toggle Text Box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

//Close Button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

//VoiceChange
voicesSelect.addEventListener("change", setVoice);

//Read The Text
readBtn.addEventListener("click", () => {
  setMessageText(textArea.value);

  speakText();
});

getVoices();
