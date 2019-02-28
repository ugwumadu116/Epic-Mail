const signup = document.querySelector(".signup");
signup.addEventListener("click", callSignupForm);
const closeForm = document.querySelector(".fa-times");

const register = document.getElementById("register");

closeForm.addEventListener("click", closeSignup);

function callSignupForm() {
    register.style.display = "block";
}

function closeSignup(e) {
    register.style.display = "none";
}
