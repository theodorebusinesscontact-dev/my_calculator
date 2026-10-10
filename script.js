let activeTotal = 0; //total of expression
let buffer = "0"; //string on the display
let previousOperator = null; //previous operator
const result = document.querySelector(".result");
let waitingForNumber = false;

document.querySelector(".cbuttons").addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON"){
        return;
    }
    buttonClick(event.target.innerText.trim());
})

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    result.innerText = buffer;
}   

function handleNumber(numberString){
    if (buffer==="0"){
        buffer=numberString;
    }else{
        buffer+=numberString;
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case "C":
            buffer = "0";
            activeTotal=0;
            previousOperator=null;
            waitingForNumber=false;
            break;
        case "←":
            if (buffer.length===1){
                buffer="0";
            }else{
                buffer = buffer.slice(0,-1);

            }
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
        case "=":
            if (previousOperator === null) {
                break;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = String(activeTotal);
            activeTotal = 0;
            waitingForNumber=true;
            break;
    }
}

function flushOperation(intBuffer){
    if (previousOperator==="+"){
        activeTotal+=intBuffer;
    }else if (previousOperator==="−"){
        activeTotal-=intBuffer;
    }else if (previousOperator==="×"){
        activeTotal*=intBuffer;
    }else if (previousOperator==="÷"){
        activeTotal/=intBuffer;
    }
}

function handleMath(symbol){
    if (waitingForNumber){
        previousOperator=symbol;
        return;
    }
    const intBuffer = parseInt(buffer)
    if (previousOperator===null){
        activeTotal=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator=symbol;
    buffer="0";
}

function handleNumber(numberString){
    if (waitingForNumber || buffer==="0"){
        buffer=numberString;
        waitingForNumber=false;
    }else{
        buffer+=numberString
    }
}

