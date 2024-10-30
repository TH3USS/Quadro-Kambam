const columns = document.querySelectorAll(".column_cards");
const cards = document.querySelectorAll(".cards");

let draggedCard;
const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({ target }) => {
    if(target.classList.contains("column_cards"))
    {        
        if(target.classList.contains("process_class")){
            target.classList.add("column-highlight_process");
        }
        else if(target.classList.contains("done_class")){
            target.classList.add("column-highlight_done");
        } else{
            target.classList.add("column-highlight");
        }
    }
};

const dragLeave = ({ target }) => {    
    target.classList.remove("column-highlight");
    target.classList.remove("column-highlight_process");
    target.classList.remove("column-highlight_done");
};

const drop = ({ target }) => {
    if(target.classList.contains("column_cards"))
    {
        target.classList.remove("column-highlight");  
        target.classList.remove("column-highlight_process");
        target.classList.remove("column-highlight_done"); 
        target.append(draggedCard);

        if(target.classList.contains("process_class")){
            draggedCard.classList.add("card_process")
            draggedCard.classList.remove("card_done")
        }
        else if(target.classList.contains("done_class")){
            draggedCard.classList.add("card_done")
        }
        else{
            draggedCard.classList.remove("card_done")
            draggedCard.classList.remove("card_process")
        }
        
    }
};

const createCard = ({ target }) => {
    if(!target.classList.contains("column_cards")) return;

    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    if(target.classList.contains("process_class")){
        card.classList.add("card_process")
    }
    if(target.classList.contains("done_class")){
        card.classList.add("card_done")
    }

    card.addEventListener("focusout", () => {
        card.contentEditable ="false";
        if (!card.textContent) card.remove();
    });

    card.addEventListener("dragstart", dragStart);

    target.append(card);
    card.focus();
};

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);    
    column.addEventListener("dblclick", createCard);
});