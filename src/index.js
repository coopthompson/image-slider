import './page.css'

const frame = document.querySelector('.frame');
const photobook = document.getElementById('photobook');
const submit = document.querySelector('.submit');
const play = document.querySelector('.play');
const rightArrow = document.querySelector('.right');
const leftArrow = document.querySelector('.left');

const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
];

let slideshowArray = []
let allButtons = [];
let playCount = 0;
let stopShow = false;


const timer = ms => new Promise(res => setTimeout(res, ms))

submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (playCount > 0) {
        stopShow = true;
        togglePlay();
        playCount = 0;
    }
    addFiles();
    produceButton(slideshowArray);
    document.addEventListener('click', function(e){
        if(e.target.classList =="tab"){
            if (playCount > 0) {
                togglePlay();
                playCount = 0;
            }
            removeClass(allButtons, 'selected');
            e.target.classList.add('selected');
            stopShow = true;
            removeImage();
            let tabNumber = e.target.textContent;
            let targetPic = slideshowArray[tabNumber - 1]
            newPic(targetPic);
        }
    })
})

play.addEventListener('click', function () {
    togglePlay();
    playCount++;
    stopShow = false;
    removeClass(allButtons, 'selected');
    slideshow(slideshowArray);
})
  
function validFileType(file) {
    return fileTypes.includes(file.type);
}



rightArrow.addEventListener('click', function () {
    stopShow = true;
    next(allButtons, 'selected');
})

leftArrow.addEventListener('click', function () {
    stopShow = true;
    previous(allButtons, 'selected');
})







function produceButton(array) {
    const buttonArea = document.querySelector('.button-box')

    function emptyButtons () {
        while(buttonArea.firstChild) {
            buttonArea.removeChild(buttonArea.lastChild)
        }   
    }
    
    emptyButtons();
    allButtons = [];
    for (let i = 0; i < array.length; i++ ) {
        if (i >= 10) {
            return;
        }
        let tabButton = document.createElement('button');
        allButtons.push(tabButton);
        tabButton.classList.add('tab');
        tabButton.textContent = array.indexOf(array[i])+1;
        buttonArea.appendChild(tabButton);
    }
    console.log(allButtons)
}



function removeImage() {
    while(frame.firstChild) {
      frame.removeChild(frame.firstChild);
    }
}

function addFiles () {
    const curFiles = photobook.files;
    if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        frame.appendChild(para);
    } else {
    for (const file of curFiles) {
      const para = document.createElement('p');
      if (validFileType(file)) {
        let src = URL.createObjectURL(file);
        slideshowArray.push(src);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        frame.appendChild(para);
      }
    }
  }
}


async function slideshow (array) {

  for (let i = 0; i < array.length; i++) {
    if (stopShow === true) {
        return;
    }
    if (i > 0) {
        allButtons[i-1].classList.remove('selected')
    }
    removeImage();
    allButtons[i].classList.add('selected')
    newPic(array[i]);
    playCount++
    await timer(1000); 
  }
  playCount = 0;
  togglePlay();
}

function removeClass(array, className) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].classList.contains(className) === false) {
            continue;
        }
        array[i].classList.remove(className);
    }
}

function next(array, className) {
    if (playCount > 0) {
        togglePlay();
        playCount = 0;
    }
    if (document.querySelector(`.${className}`) === null) {
        return;
    }
    let selected = document.querySelector(`.${className}`);
    let selectNumber = selected.textContent;
    if (selectNumber - 1 === array.indexOf(array[array.length-1])) {
        let firstBut = array[0];
        removeClass(array, className);
        firstBut.classList.add(className);
        removeImage();
        newPic(slideshowArray[0]);
        return;
    }
    let nextPic = array[selectNumber]; 
    let nextNumber = nextPic.textContent;
    removeClass(array, className);
    nextPic.classList.add(className);
    removeImage();
    let targetPic = slideshowArray[nextNumber - 1];
    newPic(targetPic); 
}

function previous(array, className) {
    if (playCount > 0) {
        togglePlay();
        playCount = 0;
    }
    if (document.querySelector(`.${className}`) === null) {
        return;
    }
    let selected = document.querySelector(`.${className}`);
    let selectNumber = selected.textContent;
    if (selectNumber - 1 === 0) {
        let lastBut = array[array.length-1];
        removeClass(array, className);
        lastBut.classList.add(className);
        removeImage();
        newPic(slideshowArray[slideshowArray.length - 1]);
        return;
    }
    let nextPic = array[selectNumber - 2]; 
    let nextNumber = nextPic.textContent;
    removeClass(array, className);
    nextPic.classList.add(className);
    removeImage();
    let targetPic = slideshowArray[nextNumber - 1]
    newPic(targetPic);
}

function newPic(arrayPart) {
    const picture = document.createElement('img');
    picture.classList.add('picture');
    picture.src = arrayPart;
    frame.appendChild(picture);
    return frame;
}

function togglePlay() {
    play.classList.toggle('show')
}
