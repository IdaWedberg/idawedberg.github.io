/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
    let clearBtn = document.getElementById('clear');
    clearBtn.onclick = clearLCD;
    let commaBtn = document.getElementById('comma');
    commaBtn.onclick = addComma;
    addLog();
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; // id för den tangent som tryckte ner
    console.log(btn);

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);

    } else if (btn === 'add') {             // Inte en siffertangent, övriga tangenter.
        setOperator('+');
    }
    else if (btn === 'mul') {
        setOperator('*');
    }
    else if (btn === 'sub') {
        setOperator('-');
    }
    else if (btn === 'div') {
        setOperator('/');
    }
    else if (btn === 'enter') {
        calculate(true);
    }
    else if (btn === 'clear') {
        memClear();
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value = lcd.value + digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!lcd.value.includes('.')) {
        lcd.value += '.';
    }
}

/**
 * Sparar operator.
 * +, -, *, / gd
 */
function setOperator(operator) {
    addToLog(parseFloat(lcd.value), operator); // lägger till första värdet + räknesätt som historik under räknaren.
    if (memory != 0) {    // om någt är lagrat i minnet gör beräkningen innan nya värdet sparas (för att hantera 1+1+1)
        calculate();
    }
    arithmetic = operator;
    memory = parseFloat(lcd.value);
    clearLCD();
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate(equals) {
    if (equals) {
        addToLog("", lcd.value); // efter att '=' tyckts ned skrivs det andra värdet ut i historiken.
    }
    if (arithmetic === '+') {
        lcd.value = (+memory + +lcd.value);
    } else if (arithmetic === '-') {
        lcd.value = (+memory - +lcd.value);
    } else if (arithmetic === '*') {
        lcd.value = (+memory * +lcd.value);
    } else if (arithmetic === '/') {
        lcd.value = (+memory / +lcd.value);
    }
    if (equals) {
        addToLog("=", lcd.value); // Efter att uträkningen gjorts skrivs = och svaret ut i historiken.
        newLogRow(); // Efter att '=' knappen tryckts ned sker en radbrytning och nästa uträkning skrivs under i historiken.
        memClear(true); // När '=' knappen trycks ned så rensas minnet och räknesättet men svaret står fortfarande kvar på displayen 
        // utifall man vill fortsätta sin beräkning.
    }
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
}

/** Rensar allt, reset */
function memClear(keepLcd) {
    memory = 0;
    arithmetic = null;
    if (!keepLcd) {      // Rensar displayen.
        clearLCD();
    }
}

/** Funktion för vad som ska loggas i historiken. */
function addToLog(first, second) {      
    const log = document.getElementById("calcLog");
    log.append(first);
    log.append(second);
}
function newLogRow() {       // Funktion för radbrytning i den loggade historiken.
    const log = document.getElementById("calcLog");
    log.append(document.createElement("br"));
}

/** Skapa logg element */
function addLog() {
    // Skapat ett nytt element 'div'.
    const logDiv = document.createElement("div");
    logDiv.id = "calcLog";

    // lägg in logg efter keyboard
    const lcd = document.getElementById("keyBoard"); 
    lcd.append(logDiv);
}

window.onload = init;
