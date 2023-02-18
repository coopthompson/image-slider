import './page.css'

const frame = document.querySelector('.frame');
const photobook = document.getElementById('photobook');
const submit = document.querySelector('.submit');
const play = document.querySelector('.play');
const arrows = document.querySelector('.arrow');

let slideshowArray = []
let stopShow = false


const timer = ms => new Promise(res => setTimeout(res, ms))

submit.addEventListener('click', function (e) {
    e.preventDefault();
    addFiles();
    produceButton(slideshowArray);
    document.addEventListener('click', function(e){
        if(e.target.classList =="tab"){
            stopShow = true
            removeImage();
            const picture = document.createElement('img');
            picture.classList.add('picture');
            let tabNumber = e.target.textContent;
            let targetPic = slideshowArray[tabNumber - 1]
            picture.src = targetPic;
            frame.appendChild(picture);
        }
      })
        
})



play.addEventListener('click', function () {
    stopShow = false;
    slideshow(slideshowArray);
})

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
  
function validFileType(file) {
    return fileTypes.includes(file.type);
}


function produceButton(array) {
    const buttonArea = document.querySelector('.button-box')
    function emptyButtons () {
        while(buttonArea.firstChild) {
            buttonArea.removeChild(buttonArea.lastChild)
        }   
    }
    
    emptyButtons();
    for (let i = 0; i < array.length; i++ ) {
        if (i >= 10) {
            return;
        }
        let tabButton = document.createElement('button');
        tabButton.classList.add('tab');
        tabButton.textContent = array.indexOf(array[i])+1;
        buttonArea.appendChild(tabButton);
    }
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

    


async function slideshow (array) { // We need to wrap the loop into an async function for this to work
  for (let i = 0; i < array.length; i++) {
    if (stopShow === true) {
        return;
    }
    removeImage();
    const image = document.createElement('img');
    image.classList.add('picture');
    frame.appendChild(image);
    image.src = array[i];
    await timer(5000); // then the created Promise can be awaited
  }
}






  