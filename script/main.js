const INPUT = document.querySelector('input');
let database = [
    {item: 'eggs'},
    {item: 'e.g'}
]

function createItem( text, index ){
    const item = document.createElement('li');
    item.classList.add('item');
    item.innerHTML = `    
        <p class="title" data-index="${index}">${text}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn" onclick="editItem(this)" data-index="${index}">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn" onclick="removeItem(this)" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>                  
    `;
    document.querySelector('.container-items').appendChild(item);
}

function clearItem ( ) {
    const grocery = document.querySelector('.container-items');
    while (grocery.firstChild){
        grocery.removeChild(grocery.lastChild);
    }
}

function randerScreen ( ) {
    clearItem();
    database.forEach(( data, index ) => createItem(data.item, index));
}

function submitEdit ( btn ) {
    resetSubmit();
   if (btn.innerHTML === "Submit") { 
       if (!document.querySelector('input').value) {
            alert('Preencha o campo!');
       }else{
            database.push({item: document.querySelector('input').value});
            randerScreen( );
            document.querySelector('input').value = "";
       }
   }


}

function editItem ( edit ) {
    const index = edit.dataset.index;
    document.querySelector('input').value = database[index].item;

    const btnEdit = document.querySelector('.btnSubmit');
    btnEdit.innerHTML = "Edit";

    btnEdit.onclick = ( event ) => {

        if (event.target.innerHTML === "Edit") { 
            database[index].item = document.querySelector('input').value;
            randerScreen( );
            resetSubmit();
            document.querySelector('input').value = "";

        }
    }
}

function resetSubmit() {
    const btnEdit = document.querySelector('.btnSubmit');
    btnEdit.innerHTML = "Submit";
}

function removeItem ( delet ) {
    const index = delet.dataset.index;
    database.splice(index, 1)
    randerScreen();
}

randerScreen( );