var appHolder;

var barSpeed = 10; //in milliseconds
var boxSize = 25;

function startBarDrawing() {
    appHolder = document.getElementById('app');

    const {
        availWidth,
        availHeight
    } = screen;
    
    const gridBoxSizeX = boxSize;
    const gridBoxSizeY = boxSize;

    const rows = [];
    const cols = [];


    let rowCounter = 0;
    
    for (let rowPosition = gridBoxSizeY; rowPosition < availHeight; rowPosition += gridBoxSizeY) {
        let barElement = document.createElement('div');
        barElement.style.position = 'fixed';
        barElement.style.left = `${rowPosition}px`;
        barElement.style.top = `${rowPosition}px`;

        barElement.className = `row row${rowCounter++}`;
        barElement.id = `row${rowCounter}`;
        barElement.setAttribute('data-type', 'row');
        barElement.setAttribute('data-index', rowCounter);
        barElement.setAttribute('data-position', '0');
        barElement.setAttribute('data-incrementStyle', '1');
        rows.push(barElement);
        appHolder.appendChild(barElement);
    }

    let colCounter = 0;
    for (let colPosition = gridBoxSizeX; colPosition < availWidth; colPosition += gridBoxSizeX) {
        let barElement = document.createElement('div');
        barElement.style.position = 'fixed';
        barElement.style.left = `${colPosition}px`;
        barElement.style.top = `${colPosition}px`;

        barElement.className = `col col${colCounter++}`;
        barElement.id = `col${rowCounter}`;
        barElement.setAttribute('data-type', 'col');
        barElement.setAttribute('data-index', colCounter);
        barElement.setAttribute('data-position', '0');
        barElement.setAttribute('data-incrementStyle', '1');
        cols.push(barElement);
        appHolder.appendChild(barElement);
    }

    let barAnimator;

    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const isRandomTurn = () => Number(Math.random()).toFixed(3) === "0.683"

    const startAnimation = () => {
        barAnimator = setInterval(() => {
            for (let r = 0; r < rowCounter; r++) {
                const elem = rows[r];
                let position = parseInt(elem.dataset.position);

                if (elem.dataset.incrementstyle == '1') {
                    if (position + 1 >= availWidth || isRandomTurn()) {
                        elem.setAttribute('data-incrementStyle', '2');
                        elem.style.border = `1px solid ${randomColor()}`;
                        position--;
                    } else {
                        position++;
                    }
                } else {
                    if (position - 1 <= 0 || isRandomTurn()) {
                        elem.setAttribute('data-incrementStyle', '1');
                        elem.style.border = `1px solid ${randomColor()}`;
                        position++;
                    } else {
                        position--;
                    }
                }

                elem.setAttribute('data-position', `${position}`);
                // elem.style.opacity = `${Math.random()}`;
                elem.style.left = `${position}px`;
            }

            for (let c = 0; c < colCounter; c++) {
                const elem = cols[c];
                let position = parseInt(elem.dataset.position);

                if (elem.dataset.incrementstyle == '1') {
                    if (position + 1 >= availHeight || isRandomTurn()) {
                        elem.setAttribute('data-incrementStyle', '2');
                        elem.style.border = `1px solid ${randomColor()}`;
                        position--;
                    } else {
                        position++;
                    }
                } else {
                    if (position - 1 <= 0 || isRandomTurn()) {
                        elem.setAttribute('data-incrementStyle', '1');
                        elem.style.border = `1px solid ${randomColor()}`;
                        position++;
                    } else {
                        position--;
                    }
                }

                elem.setAttribute('data-position', `${position}`);
                // elem.style.opacity = `${Math.random()}`;
                elem.style.top = `${position}px`;
            }
        }, barSpeed);
    };
    

    const clearBarAnimationTimer = () => {
        if (barAnimator !== null || typeof barAnimator !== 'undefined') {
            clearInterval(barAnimator);
            barAnimator = null;
        }
    };

    const startBarAnimation = () => {
        clearBarAnimationTimer();
        startAnimation();
    };

    window.onkeydown = clearBarAnimationTimer;
    window.onmousedown = clearBarAnimationTimer;

    window.onkeyup = startBarAnimation;
    window.onmouseup = startBarAnimation;

    startAnimation();
}

window.onload = startBarDrawing;