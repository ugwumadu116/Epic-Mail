const bar = document.querySelector(".fa-bars");
const closeNav = document.querySelector(".fa-times");

bar.addEventListener("click", callSidebar);
closeNav.addEventListener("click", closeSidebar);

const sidenav = document.querySelector("#sidenav");
const body = document.getElementsByTagName("body")[0];

function callSidebar() {
    sidenav.style.display = "block";
    body.style.backgroundColor = "#A9A9A9";
}
function closeSidebar() {
    sidenav.style.display = "none";
    body.style.backgroundColor = "#f4f6f9";
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
