const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//paintTodo할때마다 어레이에 푸쉬
//localstorage에는 오직 문자열만 저장가능
//비어있는 채로 두면 안됨. 새로운 toDo들만 포함하고 있는 array를 저장하고 있는것임.
//수정가능하도록 const -> let
let toDos = [];

//toDos 배열(데이터베이스)과 local storage는 다른 것임을 알자

function saveToDos(){
    //JSON.stringify는 자바스크립트의 어떤 객체든 (array등)을 문자열로 만들어줌
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event){
    //버튼 눌렀을 때 그 요소만 삭제해야 할 경우,parentNode 또는 parentElement를 활용
    console.dir(event.target);
    //target은 클릭된 HTML element
    //parentElement는 li이고 그것의 innerText는 ex) 1x
    const li = event.target.parentElement;
    li.remove();

    //toDo는 toDos 데이터베이스에 있는 요소 중 하나를 계속 부르는 것
    //누른 그 요소만 없앤 array를 새로 만든 것
    toDos = toDos.filter(toDo => toDo.id != parseInt(li.id));

    //로컬 스토리지에도 다시 저장
    saveToDos();

}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo;
  //newTodo 객체를 받기 때문에 newTodo.text로 넣어줘야 함
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText="❌";
  button.addEventListener("click", deleteTodo);
  
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

//form을 submit하면 동작하는 함수
function handleToDoSubmit(event) {
  event.preventDefault();
  //받은 입력값은 변수에 저장
  const newTodo = toDoInput.value;

  //입력창을 다시 빈창으로
  toDoInput.value = "";

  //텍스트와 id도 함께 저장하기 위해 새로운 객체를 만듬!
  const newTodoObj = {
    text:newTodo,
    id: Date.now(), //랜덤한 값을 id로 받음
  };
  //array에 객체를 push
  toDos.push(newTodoObj);

  //화면에 toDo를 그려줌
  paintToDo(newTodoObj);

  //local storage에 저장
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos != null){
    //단순히 string이었던 것을 자바스크립트에서 무언가를 할 수 있는 배열로 만듬
    const parsedToDos = JSON.parse(savedToDos);

    //local storage에서 발견되는 이전의 toDo들도 array에 저장
    toDos = parsedToDos;

    //화살표 함수, array에 있는 각각의 item을 줌
    //parsedToDos.forEach((item) => console.log("this is the turn of ", item));
    parsedToDos.forEach(paintToDo);

}
