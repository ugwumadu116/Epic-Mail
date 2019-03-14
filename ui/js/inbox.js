const details = document.getElementsByClassName('details');

for (let i = 0; i < details.length; i++) {
  details[i].addEventListener('click', hideInbox);
}
function hideInbox() {
  document.getElementById("inbox").style.display = "none";
  document.getElementById("inboxMessage").style.display = "block";
}