// signup
const signup = document.querySelector('.signup');
signup.addEventListener('click', callSignupForm);
const closeForm = document.querySelector('.fa-times');

const register = document.getElementById('register');

closeForm.addEventListener('click', closeSignup);

function callSignupForm() {
    register.style.display = 'block';
}

function closeSignup() {
    register.style.display = 'none';
}

/// success
const signupForm = document.querySelector('#signupForm');
const home = document.querySelector('#home');
signupForm.addEventListener('submit', callSuccess);
const body = document.querySelector('body');

const successCard = document.querySelector('.successCard')

function callSuccess(e) {
    e.preventDefault();
    register.style.opacity = "0.4";
    home.style.opacity = "0.1";
    successCard.style.display = "block";
    e.preventDefault();
}