const signup_btn = document.getElementById("signup_btn");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signup_message = document.getElementById("signup_message");
function show_signup_message() {
    signup_message.style.display = "";
}
function hide_signup_message() {
    signup_message.style.display = "none";
}
signup_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (name.value !== "" && password.value !== "" && email.value !== "") {
        show_signup_message();
        setInterval(hide_signup_message, 5000);
    }
});
