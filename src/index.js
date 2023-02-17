import './page.css'

const frame = document.querySelector('.frame');
const photobook = document.getElementById('photobook');
const submit = document.querySelector('.submit');

const timer = ms => new Promise(res => setTimeout(res, ms))

submit.addEventListener('click', function (e) {
    e.preventDefault();
})



let test = ['shoop', 'doop', 'foop', 'group', 'loop', 'yoop', 'noop', 'youp', 'goop']

function produceButton(array) {
    const buttonArea = document.querySelector('.button-box')
    for (let i = 0; i < array.length; i++ ) {
        let tabButton = document.createElement('button');
        tabButton.classList.add('tab');
        tabButton.textContent = array.indexOf(array[i])+1;
        buttonArea.appendChild(tabButton);
    }
}

function updateImageDisplay() {
    while(frame.firstChild) {
      frame.removeChild(frame.firstChild);
    }
}

// function createContent (array) {
//     for (let i = 0; i < array.length; i++) {
//     }
// }

async function slideshow (array) { // We need to wrap the loop into an async function for this to work
  for (let i = 0; i < array.length; i++) {
    updateImageDisplay();
    let picture = document.createElement('p');
    picture.classList.add('picture');
    picture.textContent = array[i];
    frame.appendChild(picture)
    await timer(5000); // then the created Promise can be awaited
  }
}


produceButton(test)
//slideshow(test)



  