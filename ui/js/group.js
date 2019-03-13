const details = document.getElementsByClassName('details');

for (let i = 0; i < details.length; i++) {
    details[i].addEventListener('click', hideInbox);
}
function hideInbox() {
    document.getElementById("group").style.display = "none";
    document.getElementById("inboxMessage").style.display = "block";
}

///
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