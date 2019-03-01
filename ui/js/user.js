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
