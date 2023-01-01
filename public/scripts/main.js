// input areas
let AddInputArea = document.querySelector("#insert-note"); // add input area
// add note or cancel
let AddNoteBtn = document.querySelector("#add-note");
let CancelAddNoteBtn = document.querySelector("#cancel-note")


let EditInputAreaList = document.getElementsByClassName("edit-note"); // edit input area
// edit and cancel 
let EditNoteBtnList = document.getElementsByClassName("Edit-NoteBtn");
let CancelEditNoteBtnList = document.getElementsByClassName("Cancel-EditNoteBtn");




AddNoteBtn.addEventListener('click', ()=>{
    AddInputArea.classList.add('active-input-note');
})

CancelAddNoteBtn.addEventListener("click", ()=>{
    AddInputArea.classList.remove('active-input-note');
})



function EditNote (){
    let editInputArea = this.parentElement.children[1];
    editInputArea.classList.add('active-input-note')
}


for(var btn of EditNoteBtnList){
    btn.addEventListener('click',EditNote)
}


function CancelEditNote (){
    let editInputArea = this.parentElement.parentElement.parentElement.parentElement;

    editInputArea.classList.remove('active-input-note')
}

for(var btn of CancelEditNoteBtnList){
    btn.addEventListener('click',CancelEditNote)
}