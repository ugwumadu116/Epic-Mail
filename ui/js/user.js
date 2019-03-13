const bar = document.querySelector(".fa-bars");
const closeNav = document.querySelector(".fa-times");

bar.addEventListener("click", callSidebar);
closeNav.addEventListener("click", closeSidebar);

const sidenav = document.querySelector("#sidenav");
const body = document.getElementsByTagName("body")[0];
const overlay2 = document.getElementById("overlay2");
overlay2.addEventListener('click', closeOverlay2);

function closeOverlay2() {
  document.getElementById("overlay2").style.display = "none";
  sidenav.style.width = '0';
  closeNav.style.display = "none";
}
function callSidebar() {
  document.getElementById("overlay2").style.display = "block";
  sidenav.style.width = 'auto';
  closeNav.style.display = "block";
}
function closeSidebar() {
  document.getElementById("overlay2").style.display = "none";
  sidenav.style.width = '0';
  closeNav.style.display = "none";
}
// Open Email Message
const messageCard = document.getElementsByClassName('messageCard');

const overlay = document.getElementById("overlay")
overlay.addEventListener('click', closeOverlay)

for (let i = 0; i < messageCard.length; i++) {
  messageCard[i].addEventListener('click', openOverlay)
}
function openOverlay() {
  document.getElementById("overlay").style.display = "block";
}

function closeOverlay(e) {
  if (e.target === overlay) {
    document.getElementById("overlay").style.display = "none";
  }
}

/// send draft
document.getElementById("email").value = 'amaka@gmail.com'
document.getElementById("subject").value = 'Git version control'
const message = document.getElementById("message").value = 'this will be a git message'

