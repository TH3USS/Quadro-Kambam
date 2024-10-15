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
        target.classList.add("column-highlight");
    }
};

const dragLeave = ({ target }) => {    
    target.classList.remove("column-highlight");    
};

const drop = ({ target }) => {
    if(target.classList.contains("column_cards"))
    {
        target.classList.remove("column-highlight");   
        target.append(draggedCard);
    }
};

const createCard = ({ target }) => {
    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout", () => {
        card.contentEditable ="false";
        if (!card.textContent) card.remove();
    });

    card.addEventListener("dragstart", dragStart);

    target.append(card);
};

cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
});

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);    
    column.addEventListener("dblclick", createCard);
});