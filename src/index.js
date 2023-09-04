const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let resultChars = '';   // объявили результирующую строку симоволов
    let resultLetter = ''; // объявили результирующий символ
    let subStringForChar;

    for (let i = 0; (i + 9) < expr.length; i = i + 10) { // условие, что пока счетчик меньше длины то делим на 10
        // console.log(i);
        subStringForChar = expr.substr(i, 10); // получение подстроки где 10 символов
        // console.log(`Это подстрока из 10 символов: ${subStringForChar}`);

        let resultWithoutZero = ''; // объявляем результирующую подстроку, в которой будет все без нулей
        for (let j = 0; j < subStringForChar.length; j++) { // условие, что пока счетчик меньше 10 
            if (subStringForChar[j] === '0') continue;
            else { // как только j не равен 0, то присваиваем часть строки от j в результат
                resultWithoutZero = subStringForChar.slice(j); // тут получили подстроку цифр без нулей вначале (в том числе и 10*)
                // console.log(`Это обрезанная подстрока: ${resultWithoutZero}`);

                let resultStringOfDotsAndDash = ''; // объявили результирующую строку точек и дефисов
                for (let i = 0; (i + 1) < resultWithoutZero.length; i = i + 2) { // пока k + 1 не пройдется минимум 5 раз 
                    const dot = '.';
                    const dash = '-';
                    if (resultWithoutZero.slice(i, i + 2) === '10') { // если "10", то это точка
                        resultStringOfDotsAndDash = resultStringOfDotsAndDash + dot;
                    } else if (resultWithoutZero.slice(i, i + 2) === '11') {    
                        resultStringOfDotsAndDash = resultStringOfDotsAndDash + dash; // если "11", то это дефис
                    } else if (resultWithoutZero === '**********') { // если подстрока равна десяти-звездам*
                        resultStringOfDotsAndDash = ' '; // то resultStringOfDotsAndDash это пробел
                    }   
                };
                
                // console.log(`результирующая строка точек и дефисов равна: ${resultStringOfDotsAndDash}`);
                
                for (let key in MORSE_TABLE) {
                    // MORSE_TABLE[key]
                    if (resultStringOfDotsAndDash === ' ') {
                        resultLetter = ' ';
                    } else if (key === resultStringOfDotsAndDash) { // условие, что если 
                        resultLetter = MORSE_TABLE[key]; // присваиваем значение ключа объекта результату
                    } continue;    
                }
                resultChars = resultChars + resultLetter; // суммируем результирующие символы в строку

                // console.log(`Символ который получается: ${resultLetter}`);
                // console.log(`Итоговая строка: ${resultChars}`);
                break; // прерываем цикл
            };   
        };
    };
    return resultChars;
};  

module.exports = {
    decode
}