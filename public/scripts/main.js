// input areas
let AddInputArea = document.querySelector("#insert-note"); // add input area
// add note or cancel
let AddNoteBtn = document.querySelector("#add-Newnote");
let CancelAddNoteBtn = document.querySelector("#cancel-note")


// edit and cancel 
let EditNoteBtnList = document.querySelectorAll(".edit-note-btn");
let CancelEditNoteBtnList = document.querySelectorAll(".close-Editinput");



AddNoteBtn.addEventListener('click', ()=>{
    AddInputArea.classList.add('active-input-note');
})

CancelAddNoteBtn.addEventListener("click", ()=>{
    AddInputArea.classList.remove('active-input-note');
})



function EditNote (e){
   
    let editInputArea = e.parentElement.children[1];
    editInputArea.classList.add('active-input-note')
}




function CloseEditNote (e){
   
    let editInputArea = e.parentElement.parentElement.parentElement;
    editInputArea.classList.remove('active-input-note')
}
