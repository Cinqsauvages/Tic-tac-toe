//accedo a los elementos
const gameBoard = document.getElementById('gameBoard');
const infoDisplay = document.getElementById('info');

//creo una estructura del juego
const starCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]

let go = "circle";
infoDisplay.textContent = "Circle goes First"
//creo el board
const createBoard = () => {
    //foreach para recorrer el array
    starCells.forEach((_cell, index) => {
        //cellelement crea un elemnto div, y se le agrega una class llamada Square
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo)
        //agrego a el padre
        gameBoard.append(cellElement);
    })
}


const addGo = (e) => {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go);
    //y lo agrego al target del evento, en este caso seria lo llamado cellElement arriba
    e.target.append(goDisplay);

    //si go es circle cambia a cross sino vuelve a circle;
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = `it is now ${go}'s go`
    //elimino la escucha del evento ya usado y lo ejecuto devuelta para usarlo en otro lugar.
    e.target.removeEventListener("click", addGo);

    //evaluo quien gana o no
    checkScore();
}

const checkScore = () => {
    //agarro todos los que son 0
    const allSquares = document.querySelectorAll(".square");
    //dibujo la combinacion, de cuando se gana
    const winnigCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winnigCombos.forEach(array => {

        let circleWins = array.every( cell => allSquares[cell].firstChild?.classList.contains('circle'))


        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

            return
        }
    })
    winnigCombos.forEach(array => {

        let crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))


        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

            return
        }
    })

}
createBoard();