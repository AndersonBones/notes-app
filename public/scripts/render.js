const url = 'https://notes-app-ten-sable.vercel.app/'

// ADD NEW NOTE function
async function addNote(){
    let data = {note:$("#note").val()};
    
    const response = await fetch(`${url}/add-note`,{
        method:'post',
        body:JSON.stringify(data),
        headers: {"Content-type": "application/json"}
    });

    const resData = await response.json();
    $("#insert-note").removeClass('active-input-note');
    
    return resData;
    
}

// ADD NOTE EVENT
$("#save-note").click(async(e)=>{
    e.preventDefault();
    
    if($("#note").val()){
        let data = await addNote()

        $("#note").val('');
    
        generateNotes(data.user.content)
        console.log(data.user.content)
    }else{
        alert('Write something')
    }
    
});

// GET ALL NOTES
async function getNotes(){
    const response = await fetch(`${url}/allNotes`,{
        method:'get',
    });

    const resData = await response.json();
    return resData
}

// ONLOAD EVENT
window.onload = async()=>{
    let data = await getNotes()
    
    generateNotes(data.notes)
    isEmpty(data.notes)
    
}

function isEmpty(data){
    if(data.length == 0){
        document.querySelector(".notes-area").innerHTML += "<p class='text-danger'>you still don't have any notes</p>";
    }

}

// GENERATE NOTES
function generateNotes(data){

    isEmpty(data);

    document.querySelector(".notes-area").innerHTML = '';
    data.map((item, index)=>{
        document.querySelector(".notes-area").innerHTML += `<div class="note-item  bg-dark d-flex  justify-content-between flex-column rounded-1 p-3 text-light">
        <div class="content overflow-hidden">
            <p>${item.trim()}</p>
        </div>

        <div class="col-12 align-items-center d-flex justify-content-between">
        
            <div class="note-item-actions d-flex flex-column" >
            
                <div class="note-item-actions d-flex" style="gap: .8rem;">
                    
                    <button type="button" onclick="EditNote(this)" class="btn-floating btn-flat waves-effect waves-light text-white blue bi bi-pencil-square edit-note-btn"  style="font-size: 1.2rem;"></button>
                    
                    <div class="background-note-text align-items-center justify-content-center edit-note ">
                        
                        <div class="form-group" style="width: 280px; height: 250px;">
                            <textarea id="edited-note" style="outline: none; resize: none;" class="form-control overflow-auto text-white p-2 rounded bg-dark border-0" cols="100" rows="100" name="note">${item.trim()}</textarea>
                            <div class="bg-dark p-3 rounded w-100 mt-2 actions d-inline-flex  justify-content-between" style="gap: 1rem;">
                                <button onclick="editNote(${index}, this)" type="button" class="waves-effect waves-light btn-small blue " id="save-Edit-note">Save</button>
                                <button onclick="CloseEditNote(this)" type="button" class="waves-effect waves-light btn-small red " >Cancel</button>
            
                            </div>
                        </div>
                        
                    </div>

                    
                    
                    <button onclick=deleteNote(${index})  type="button" class="delete-action btn-floating btn-flat waves-effect waves-light text-white red bi bi-trash3" style="font-size: 1.2rem; z-index:0 ;"></button>
                    
                </div>
            </div>

            <span class="text-secondary"></span>
        </div>
        

        
    </div>`
    })
    
}


// DELETE NOTES

async function deleteNote(index){
    
    let response = await fetch(`${url}/delete-item/${index}`,{method:'delete'})
    const resData = await response.json();

    if(resData.error == false){
        let notesList = document.querySelector(".notes-area");
        notesList.removeChild(notesList.children[index])
    }
    isEmpty(resData.user.content)
    return resData
}

async function editNote(index, e){
    let edited_note = e.parentElement.parentElement.children[0].value
    let data = {indexNote:index, note:edited_note}

    let response = await fetch(`${url}/edit-item/${index}`,{
        method:'put',
        body:JSON.stringify(data),
        headers:{"Content-type": "application/json"}
    })
    const resData = await response.json();

    if(resData.error == false){
        let notes = document.querySelector(".notes-area");
        let hasNote = notes.children[index];
        hasNote.children[0].children[0].innerHTML = `<p>${data.note}</p>`;
    }else{
        alert("there was some error")
    }

    
    CloseEditNote(e)
}
