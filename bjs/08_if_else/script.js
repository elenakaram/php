let minValue = parseInt(prompt('Минимальное знание числа для игры', '-999'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры', '999'));

/* Checking min and max values ebtered by user. Set minValue = -999 if it is less and also set maxValue = 999 if it is over */
minValue = minValue < -999 ? minValue = -999 : minValue > 999 ? minValue = 999 : minValue;
maxValue = maxValue > 999 ? maxValue = 999 : maxValue < -999 ? maxValue = -999 : maxValue;
if (minValue > maxValue) {
    minValue = maxValue;
}

/* Validating dataa entered by user. If entered data are invalid, they are set to default min = -999 and max = 999 */
if ((isNaN(minValue)) || isNaN(maxValue) || minValue == '' || maxValue == '' || null) {
    minValue = -999;
    maxValue = 999;
}

/* Min and max values enetred by user are displayed in the alert and binary search will use this range */
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber = Math.floor((minValue + maxValue) / 2); // guessing number
let orderNumber = 1; // number of attempts to guess the hidden number answerNumber 
let gameRun = true; // start game


const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;

answerField.innerText = `Вы загадали число ${answerNumber}?`;

/* Function to Start game again */
document.getElementById('btnRetry').addEventListener('click', function () {
    gameRun = true;

    /* User enters min and max values for the search range */ 
    minValue = parseInt(prompt('Минимальное знание числа для игры. Если мимнмальное значение не соотвествует условию, оно будет заменено на -999', '-999'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры. Если максимальное значение не соотвествует условию, оно будет заменено на 999', '999'));

    /* Checking min and max values ebtered by user. Set minValue = -999 if it is less and also set maxValue = 999 if it is over */
    minValue = minValue < -999 ? minValue = -999 : minValue > 999 ? minValue = 999 : minValue;
    maxValue = maxValue > 999 ? maxValue = 999 : maxValue < -999 ? maxValue = -999 : maxValue;
    if (minValue > maxValue) {
        minValue = maxValue;
    }
     
    /* Validating dataa entered by user. If entered data are invalid, they are set to default min = -999 and max = 999 */
    if ((isNaN(minValue)) || isNaN(maxValue) || minValue == '' || maxValue == '' || null) {
        minValue = -999;
        maxValue = 999;
    }

    /* Min and max values enetred by user are displayed in the alert and binary search will use this range */
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;

    answerField.innerText = `Вы загадали число ${answerNumber}?`;

})

/* Function to increase guessing value */
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            let phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 1:
                    answerPhrase = `Вы загадали неправильное число! \n\u{1F914}`;
                    break;
                case 2:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                    break;
                case 3:
                    answerPhrase = `Какая то магия... Такого числа нет \n\u{1F645}`;
                    break;
                default:
                    alert(`Для продолжения игры нажмите кнопку Заново`);
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber}?`;
        }
    }
})

/* Function to decrease guessing value */
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 1:
                    answerPhrase = `Вы загадали неправильное число! \n\u{1F914}`;
                    break;
                case 2:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                    break;
                case 3:
                    answerPhrase = `Какая то магия... Такого числа нет \n\u{1F645}`;
                    break;
                default:
                    alert(`Для продолжения игры нажмите кнопку Заново`);
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber}?`;
        }
    }
})

/* Function to display correct guessed number */
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phraseRandom = Math.round(Math.random() * 3)
        switch (phraseRandom) {
            case 1:
                answerPhrase = `${answerNumber} мое любимое число! Я всегда угадываю \n\u{1F60E}!`;
                break;
            case 2:
                answerPhrase = `Это только разминка, но число ${answerNumber} я уже угадал \n\u{1F61C}`;
                break;
            case 3:
                answerPhrase = `Куда уж проще, это ${answerNumber} \n\u{1F607}`;
                break;
            default:
                alert(`Для продолжения игры нажмите кнопку Заново`);
        }
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
})


