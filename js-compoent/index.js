  
const containerBox = document.querySelector("#containerBox"),
    contents = containerBox.querySelector("#contents"),
    list = contents.querySelector("#list"),
    inputList = document.querySelector(".inputlist"),
    listForm = inputList.querySelector("#listForm"),
    input = listForm.querySelector("input");
    
const list_LS = "toDos";

let toDos = [];