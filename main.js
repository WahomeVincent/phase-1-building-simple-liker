// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Hide an element with the class "hidden-element"
/* (".modal").hide(); */

/* document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.querySelector('#modal');
  errorModal.classList.add('hidden');
}); */

const errorModal = document.querySelector('#modal');
const emptyHearts = document.querySelectorAll('.like-glyph');
const errorMessage = document.querySelector('#modal-message');

errorModal.classList.add('hidden');

function handleServerResponse(response) {
  if (response === 'success') {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
}

function toggleHeart(event) {
  const heart = event.target;
  mimicServerCall()
    .then(response => handleServerResponse(response))
    .then(() => {
      if (heart.classList.contains('activated-heart')) {
        heart.classList.remove('activated-heart');
      } else {
        heart.classList.add('activated-heart');
      }
      heart.classList.toggle('like-glyph');
      heart.classList.toggle('liked-glyph');
    })
    .catch(error => {
      errorMessage.textContent = error;
      errorModal.classList.remove('hidden');
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}

for (let heart of emptyHearts) {
  heart.addEventListener('click', toggleHeart);
}




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
