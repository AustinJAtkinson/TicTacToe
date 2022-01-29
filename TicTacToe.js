"use strict"

class Cell {
    constructor(cell, value) {
        this.cell = cell,
            this.value = value
    }
};


const btnReset = $('#reset');
const playerTurn = $('#players-turn')
const cellNames = ['cell-00', 'cell-01', 'cell-02', 'cell-03', 'cell-04', 'cell-05', 'cell-06', 'cell-07', 'cell-08']
const winningConditions = [
    ['cell-00', 'cell-01', 'cell-02'],
    ['cell-03', 'cell-04', 'cell-05'],
    ['cell-06', 'cell-07', 'cell-08'],
    ['cell-00', 'cell-03', 'cell-06'],
    ['cell-01', 'cell-04', 'cell-07'],
    ['cell-02', 'cell-05', 'cell-08'],
    ['cell-00', 'cell-04', 'cell-08'],
    ['cell-02', 'cell-04', 'cell-06'],
];

setPlayerTurn('X')
addCellsOnClick(cellNames);


function addCellsOnClick(cellNames) {
    for (const cellname of cellNames) {
        const cell = $('#' + cellname);
        cell.on('click', function () {
            if (getValueById(cellname) !== 'X' && getValueById(cellname) !== 'O') {
                var playersTurn = getPlayersTurn();
                setValueById(cellname, playersTurn);

                if (playersTurn === 'X') {
                    setPlayerTurn('O');
                } else {
                    setPlayerTurn('X');
                }
                isTicTacToe();
            }
        });
    }

}

btnReset.on('click', (function () {
    for (const cell of cellNames) {
        setValueById(cell, '');
        setPlayerTurn('X')
    }
    $('#players-turn-div').attr('hidden', false);
    $('#winner-alert').attr('hidden', true);
    $('#tie-alert').attr('hidden', true);
    enableOnReset();
}));

function pickedCell(cell) {
    const player = getPlayersTurn;
    setValueById(cell, player);
}

function isTicTacToe() {
    let hasWinner = false;
    const currentValues = getAllValues(cellNames);
    for (const winningCondition of winningConditions) {
        const conditionalCells = []
        conditionalCells.push(currentValues.find(element => element.cell === winningCondition[0]))
        conditionalCells.push(currentValues.find(element => element.cell === winningCondition[1]));
        conditionalCells.push(currentValues.find(element => element.cell === winningCondition[2]));

        if (conditionalCells.some(element => element.value === '')) {
            // if an cell is blank is blank skip to next condition.
            continue;
        }
        if (conditionalCells.every(v => v.value === conditionalCells[0].value)) {
            hasWinner= true;
            displayWinner(conditionalCells[0].value);
        }
    }
    if(!hasWinner){
        if(!currentValues.some(c => c.value === '')){
            displayTie();
        }
    }
}

//#region Helper functions ------------------------------------------------------------------------------------
function setValueById(id, value) {
    $(`#${id}`).text(value);
};

function displayTie() {
    const tieIdName = 'tie-alert';
    const tieDiv = $(`#${tieIdName}`);
    tieDiv.attr('hidden', false);
    setValueById(tieIdName, `There was a Tie`);
    $('#players-turn-div').attr('hidden', true);
    disableOnWinOrTie();
}

function displayWinner(winner) {
    const winnerIdName = 'winner-alert';
    const winnerDiv = $(`#${winnerIdName}`);
    winnerDiv.attr('hidden', false);
    setValueById(winnerIdName, `The winner is Player ${winner}`);
    $('#players-turn-div').attr('hidden', true);
    disableOnWinOrTie();
}

function disableOnWinOrTie() {
    for(const cellName of cellNames){
        $(`#${cellName}`).attr('disabled', true);
    }
}

function enableOnReset(){
    for(const cellName of cellNames){
        $(`#${cellName}`).attr('disabled', false);
    }
}

function getPlayersTurn() {
    return playerTurn.text();
}

function setPlayerTurn(turn) {
    playerTurn.text(turn);
}

function getAllValues(allCells) {
    const currentValues = []

    for (const cell of allCells) {
        currentValues.push(new Cell(cell, getValueById(cell)));
    }
    return currentValues;
};

function getValueById(id) {
    return $(`#${id}`).text();
};
//#endregion --------------------------------------------------------------------------------------------------