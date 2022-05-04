const INPUT = document.querySelector('input');
let indexEditItem = 0;

const getDatabase = () => JSON.parse(localStorage.getItem('groceryBud')) || [];
const setDatabase = ( database ) => localStorage.setItem('groceryBud', JSON.stringify(database));

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
    const database = getDatabase();
    database.forEach((data, index) => createItem(data.item, index));

    if (!database.length) {
        document.querySelector('.clear').classList.add('active');
    }else {
        document.querySelector('.clear').classList.remove('active');
    } 
}

function submitEdit ( btn ) {
   if (btn.innerHTML === "Submit") { 
       if (!INPUT.value) {
            displayAlert("please enter value", "danger");
       }else{
            const database = getDatabase();
            database.push({item: INPUT.value});
            setDatabase(database);
            displayAlert("item added to the list", "success");
            randerScreen( );
            INPUT.value = "";
       }
   }

   
   if (btn.innerHTML === "Edit") { 
            const database = getDatabase();
            database[indexEditItem].item = INPUT.value;
            setDatabase(database);
            displayAlert("value changed", "success");
            randerScreen( );

            INPUT.value = "";
            btn.innerHTML = "Submit";
    }
}

function editItem ( edit ) {
    const database = getDatabase();
    indexEditItem = edit.dataset.index;
    INPUT.value = database[indexEditItem].item;

    const btnEdit = document.querySelector('.btnSubmit');
    btnEdit.innerHTML = "Edit";
}


function removeItem ( delet ) {
    const index = delet.dataset.index;
    const database = getDatabase();
    database.splice(index, 1);
    setDatabase(database);
    displayAlert("item removed", "danger");
    randerScreen();
}

function clearItems () {
    const database = getDatabase();
    while(database.length) {
        database.pop();
     }

     INPUT.value = "";
     setDatabase(database);
     displayAlert("empty list", "danger");
     randerScreen( );
}

function displayAlert ( text, status ) {
    const p = document.createElement('p');  
    p.innerText = text;    
    document.querySelector('.displayAlert').classList.add(status);
    document.querySelector('.displayAlert').append(p);

    setTimeout( () => {
        document.querySelector('.displayAlert').classList.remove(status);
        p.innerText = "";
    }, 1000)
    

      
}

randerScreen( );