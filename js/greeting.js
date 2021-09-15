const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");

const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    // form을 섭밋할때 콘솔에 입력값을 받아냄
    // const username = loginInput.value;
    // console.log(username);

    //어떤 이벤트의 기본 행동, 여기서는 섭밋하면 새로고침하기(브라우저가 기본적으로수행하는 동작)이든지
    // 발생되지 않도록 막는 것.
    event.preventDefault();

    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    //greeting.innerText = "Hello "+username;
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText = `Hello, ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

//onLoginSubmit의 첫번째 인자는 지금 막 벌어진 이벤트들에 대한 정보가 될 것.
loginForm.addEventListener("submit", onLoginSubmit);

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername == null){
    //show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else{
    //show the greeting
    paintGreetings(savedUsername);

}
