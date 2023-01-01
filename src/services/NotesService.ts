import Notes from '../models/Notes'

export const getNotes = async (id:number) => {
    let notes = await Notes.findOne({where:{note_id:id}});

    if(notes){
        return notes;
    }else{
        return new Error("you still don't have any notes")
    }
}


export const addNotes = async (n:string, id:number) => {
   
    try {
        let note = await Notes.findOne({where:{note_id:id}})

        if(note){
            let notesArray:string[] = [...note.content];

            notesArray.push(n);
            note.content = notesArray;
            note.save();
            
            return note;
        }else{
            let notesArray:string[] = [];
            notesArray.push(n.trim());

            let newNote = await Notes.create({note_id:id, content:notesArray})
            
            return newNote;
        }
    } catch (error) {

        return new Error('Houve um erro ao adicionar um novo Note')
    }
}

export const deleteNotes = async (index:number, id:number) => {
    try {
        let note = await Notes.findByPk(id);

        if(note){
            let hasNote:string = note.content[index];
        
            let cloneArray:string[] = note.content.filter(item=>{
                return item != hasNote;
            })

            
            note.content = cloneArray;
            note.save();

            return note;

        }else{
            return new Error('Erro ao editar esse documento')
        }
    } catch (error) {
        return new Error('Erro ao editar esse documento')
    }
}

export const editNotes = async (index:number, id:number, n:string) => {
    try {
        let note = await Notes.findByPk(id);
        if(note){

            let array = [...note.content]

            array[index] = array[index].replace(array[index], n)
            note.content = array
            
            note.save();

            return note;

        }else{
            return new Error('Erro ao editar esse documento')
        }
    } catch (error) {
        
    }
}