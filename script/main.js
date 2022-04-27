const input = document.querySelector('input');
let database = [
    {item: 'eggs'},
    {item: 'e.g'}
]

const createItem = ( text, index ) => {
    const item = document.createElement('div');
    item.classList.add('items');
    item.innerHTML = `    
        <p class="title" data-index=${index}>${text}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn" data-index=${index}>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn" data-index=${index}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>                  
    `
    document.querySelector('.container-items').appendChild(item);
}

const randerScreen = ( ) => {
    clearItem();
    database.forEach(( data, index ) => createItem(data.item, index))
}

const clearItem = ( ) =>{
    const grocery = document.querySelector('.container-items')
    while (grocery.firstChild){
        grocery.removeChild(grocery.lastChild);
    }
}

const insertItem = ( event ) => {
     if (event.target.innerText === 'Submit' || event.key === 'Enter' ) {
        if (input.value) {
            database.push({item: input.value});
            randerScreen();
            input.value = ''
        }
     }
}

const removeItem = ( index ) => {
    database.splice(index, 1)
    randerScreen();
}

const changeItem = ( index ) => {

    document.querySelector('.btnSubmit').innerText = "Edit";
    input.value = database[index].item;

    document.querySelector('.btnSubmit').addEventListener('click', ( event ) => {
        debugger;
        console.log(index);
    })  
}

const clickItem = ( event ) => {
    const index = event.target.parentNode.dataset.index;

    if (event.target.parentNode.getAttribute('class') === "delete-btn") {
        removeItem(index);
    }else if (event.target.parentNode.getAttribute('class') === "edit-btn") {
        changeItem(index);
    }
}

document.querySelector('.btnSubmit').addEventListener('click', insertItem)
document.querySelector('.container').addEventListener('keypress', insertItem)
document.querySelector('.container-items').addEventListener('click', clickItem)

randerScreen();
