const modeGame = document.getElementById('modeStart')
const wordScreen = document.getElementById('secretWord')
const inputWord = document.getElementById('addWord')
const inputCategory = document.getElementById('addCategory')
const btnModeAuto = document.getElementById('modeAuto')

let secretWordCategory;
let secretWordChoice;

let playAgain = true
let gameAuto = true
let keyActive = true

let listRandom = []
let words = []
let attempt = 6

function loadFunction() {
    loadList()
    makeSecretWord()
    makeWordScreen()
    verifyWordChoice()
}


function loadList(){ 
    words = [
    word001 = {
        name: 'Estados Unidos',
        category: 'Lugares'
    },
    word002 = {
        name: 'Coreia',
        category: 'Lugares'
    },
    word003 = {
        name: 'Coliseu',
        category: 'Lugares'
    },
    word004 = {
        name: 'Evereste',
        category: 'Lugares'
    },
    word005 = {
        name: 'Amazonias',
        category: 'Lugares'
    },
    word006 = {
        name: 'Brasil',
        category: 'Lugares'
    },
    word007 = {
        name: 'Sushi',
        category: 'Comida'
    }, 
    word008 = {
        name: 'Lasanha',
        category: 'Comida'
    },
    word009 = {
        name: 'Churrasco',
        category: 'Comida'
    },
    word0010 = {
        name: 'Jaca',
        category: 'Comida'
    },
    word011 = {
        name: 'Leao',
        category: 'Animal'
    },
    word012 = {
        name: 'Elefante',
        category: 'Animal'
    },
    word013 = {
        name: 'Girafa',
        category: 'Animal'
    },
    word014 = {
        name: 'Baleia',
        category: 'Animal'
    },
    word015 = {
        name: 'Tubarão',
        category: 'Animal'
    },
    word016 = {
        name: 'Tenis',
        category: 'Esportes'
    },
    word017 = {
        name: 'Esgrima',
        category: 'Esportes'
    },
    word018 = {
        name: 'Voleibol',
        category: 'Esportes'
    },  
    word019 = {
        name: 'Futebol',
        category: 'Esportes'
    },
    word020 = {
        name: 'Boxe',
        category: 'Esportes'
    }
    
]
}

function openModal(titleResult, message){
    document.querySelector('#titlePopAlert').innerHTML = titleResult

    document.querySelector('#descPopAlert').innerHTML = message

    $("#resultModal").modal({
        show: true
    })
}

function makeSecretWord() {
    const indexWord = parseInt(Math.random() * words.length)
    secretWordChoice = words[indexWord].name
    secretWordCategory = words[indexWord].category

    console.log(secretWordChoice)
}

function makeWordScreen(){
    document.getElementById('category').innerHTML = secretWordCategory
    wordScreen.innerHTML = ''

    for(let i = 0; i < secretWordChoice.length; i++){
        if(listRandom[i] === undefined){
            if(secretWordChoice[i] === " "){
                listRandom[i]= " "
                secretWord.innerHTML = secretWord.innerHTML + `<div class='wordOutSpace'>${listRandom[i]}</div>`
            }else{
                listRandom[i] = '&nbsp;'
                secretWord.innerHTML = secretWord.innerHTML + `<div class='word'>${listRandom[i]}</div>`
            }       
        }else{  
            if(secretWordChoice[i] === " "){
                listRandom[i]= " "
                secretWord.innerHTML = secretWord.innerHTML + `<div class='wordOutSpace'>${listRandom[i]}</div>`
            }else {
                secretWord.innerHTML = secretWord.innerHTML + `<div class='word'>${listRandom[i]}</div>`
            }
            
        }
    }
}

function verifyWordChoice(word) {
    document.getElementById("letter-" + word).disabled = true
    if(attempt > 0) {
        changeStyleWord("letter-" + word, false)
        compareWords(word)
        makeWordScreen()
    }
}

function changeStyleWord(letter, valid){
    if(valid === false){
        document.getElementById(letter).style.background = "#FF0000"
        document.getElementById(letter).style.color = "#ffff"
    }else{
        document.getElementById(letter).style.background = "#004700"
        document.getElementById(letter).style.color = "#ffff"
    }
    
}

function compareWords(word){
    secretWordChoice = secretWordChoice.toUpperCase()

    const position = secretWordChoice.indexOf(word)

    if(position < 0){
        attempt--
        changeImgGame()

        if(attempt == 0){
            openModal('OPS! Você errou!', 'Não foi dessa vez, a palavra era ' + secretWordChoice)

            setTimeout(() => {
                location.reload()
            }, "1000")
        }
    }else{
        changeStyleWord("letter-" + word, true)

        for(let i = 0; i < secretWordChoice.length; i++){
            if(secretWordChoice[i] === word){
                listRandom[i] = word
            }
        }
    }

    let victory = true

    for(let i = 0; i < secretWordChoice.length; i++){
        if(secretWordChoice[i] != listRandom[i]){
            victory = false;
        }
    }

    if(victory === true){
        openModal('PARABÊNS! Você acertou!', `Você foi muito bem, gastou ${6 - attempt === 0 ? 'nenhuma': 6 - attempt} chances`)

        setTimeout(() => {
            location.reload()
        }, "1000")

        attempt = 0
    }
}

function changeImgGame(){
    switch(attempt){
        case 5: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca01.png')"
            break
        case 4: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca02.png')"
            break
        case 3: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca03.png')"
            break
        case 2: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca04.png')"
            break
        case 1: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca05.png')"
            break
        case 0: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca06.png')"
            break
        default: 
        case 0: 
            document.getElementById('imgGame').style.background = "url('./src/assets/forca.png')"
            break
    }
}

function sortNewWord(){
    if(gameAuto){
        location.reload()
    }else{
        if(words.length > 0){
            listRandom = []
            makeSecretWord()
            makeWordScreen()
            attempt = 6;
        }
    }
   
}

function addNewWord(){
    clearButtons()

    let valueWord = inputWord.value.toUpperCase()
    let valueCategory = inputCategory.value.toUpperCase()

    if(isNullOrWhiteSpace(valueWord)  || isNullOrWhiteSpace(valueCategory) || valueWord.length < 3 || valueCategory.length < 3){
        openModal('ATENÇÃO', 'Palavra ou categória inválida')
        return
    }

    gameAuto = false

    let word = {
        name: valueWord,
        category: valueCategory
    }
    words.push(word)

    sortNewWord()
    inputWord.value = ''
    inputCategory.value = ''
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim()
}

function clearButtons(){
    playAgain = false
    document.querySelectorAll('.buttons button').forEach(function(button) {
        button.style.backgroundColor = 'white';
        button.style.color = 'rgb(87, 53, 3)' 
        button.disabled = false
    });

    listRandom = []
 
    makeWordScreen()
}


document.querySelector("#clear").addEventListener('click', clearButtons)

document.getElementById('repeatGame').addEventListener('click', () => {
    playAgain = false

    if(gameAuto === false){
        clearButtons()
        sortNewWord()
    }else {
        location.reload()
    }
})

btnModeAuto.addEventListener('click', () => {
    location.reload()
    btnModeAuto.style.display = 'none'
})

document.getElementById('changeMode').addEventListener('click', () => {
    $('#modal-word').modal('show');

    btnModeAuto.style.display = 'block'
    inputWord.value = ''
    inputCategory.value = ''
})


$(document).ready( () => {
    $('#modal-word').on('show.bs.modal', () => {
        keyActive = false
        modeGame.style.display = 'none';
        words = []
    });

    $('#modal-word').on('hidden.bs.modal', () => {
        if(gameAuto) {
            modeGame.style.display = 'block';
            btnModeAuto.style.display = 'none'
            
        }else {
            modeGame.style.display = 'block';
            modeGame.innerText = 'Modo Manual'
            btnModeAuto.style.display = 'block';
        }
        keyActive = true
        makeWordScreen()
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        clearButtons()
    }
})

  
document.addEventListener('keypress', (event) => {
    var char = String.fromCharCode(event.keyCode);
    if(keyActive){
        verifyWordChoice(char.toUpperCase())
    }else{
        return
    }
});


loadFunction()

