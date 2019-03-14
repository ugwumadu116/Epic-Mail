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