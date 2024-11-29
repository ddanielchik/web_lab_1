// пользователь пока ниче не нажал
let x = null,
    y = null,
    r= null;

let formy = document.querySelector('#Y_input');
let formr = document.querySelector('input[name="r"]');




formy.addEventListener('input', () => {
    y = formy.value
    console.log("its y " + y)
})

formr.addEventListener('input', () => {
    r = formr.value
    console.log("its r " + r)
})

function setSelectedX(){
    let formx = document.getElementsByName('x');
    for ( const radio of formx){
        if (radio.checked){
            x = radio.value;
        }

    }
}

async function sendToServer() {
    setSelectedX()
    let data = fetch(`http://localhost:8080/fcgi-lab?x=${x}&y=${y}&r=${r}`)
    let result = await data
        .then((response)=> response.json())
    const newX = result.x;
    const newY = result.y;
    const newR = result.r;
    const hit = result.hit;
    addElementToTable(result)
    console.log(newX)
    console.log(newY)
    console.log(newR)
    console.log(hit)
}

function addElementToTable(result) {
    const resultTable = document.getElementById("table-result")
    const x = result.x
    const y = result.y
    const r = result.r
    const hit = result.hit
    const htmlTemplate = '<th>${x}</th>' +
        '<th>${y}</th>' +
    '<th>${r}</th>' +
    '<th>${hit}</th>' +
    '<th>5</th>' +
    '<th>6</th>'

    resultTable.innerText(htmlTemplate)
}


function validateX() {
    let radios = document.querySelectorAll('input[type=radio]');
    for (let radio of radios) {
        if (radio.checked) {
            return true;

        }
    }
   //
}

function validateY() {
    let elementY = document.getElementById("Y_input");
    let y = parseFloat(elementY.value.replace(',', '.'));

    if (!isNumeric(y) || y > 5 || y < -5) {
        elementY.setCustomValidity("Please enter an real between -5 and 3");
        elementY.reportValidity();
        return false;
    }
    return true;
}

function validateR() {
    let elementR = document.getElementById("R_input");
    let r = parseFloat(elementR.value.replace(',', '.'));

    if (!isNumeric(r) || r > 1 || r < 4) {
        elementR.setCustomValidity("Please enter an real between 1 and 4");
        elementR.reportValidity();
        return false;
    }
    return true;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function validateAll(){
    return (validateR() & validateY() & validateX())
}