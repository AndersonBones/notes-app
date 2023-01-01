let add_input_note = document.querySelector("#insert-note");
let edit_input_note = document.querySelector("#edit-note");

let edit_note = document.querySelector("#edit-noteBtn");
let cancel_edit_note = document.querySelector("#cancel-Edit-note");

let add_note = document.querySelector("#add-note");
let cancel_note = document.querySelector("#cancel-note")

add_note.addEventListener('click', ()=>{
    add_input_note.classList.add('active-input-note');
})

cancel_note.addEventListener("click", ()=>{
    add_input_note.classList.remove('active-input-note');
})


edit_note.addEventListener("click", ()=>{
    edit_input_note.classList.add("active-input-note")
})

cancel_edit_note.addEventListener("click", ()=>{
    edit_input_note.classList.remove("active-input-note")  
})


