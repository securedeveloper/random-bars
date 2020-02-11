let appHolder;

const urlParams = new URLSearchParams(window.location.search);
const barSpeed = urlParams.has('speed') ? Number(urlParams.get('speed')) : 10; //in milliseconds
const boxSize = urlParams.has('size') ? Number(urlParams.get('size')) : 25;
const randomFlip = urlParams.has('random') ? Boolean(JSON.parse(urlParams.get('random'))) : true;
const colorMode = urlParams.has('colormode') ? Boolean(JSON.parse(urlParams.get('colormode'))) : true;
const borderSize = boxSize > 25 ? Math.round((boxSize / 10) + 1) : 1

console.log({
    barSpeed,
    boxSize,
    randomFlip,
    colorMode,
    borderSize
})

const startBarDrawing = () => {
    appHolder = document.getElementById('app');

    const {
        availWidth,
        availHeight
    } = screen;
    
    const gridBoxSizeX = boxSize;
    const gridBoxSizeY = boxSize;

    const rows = [];
    const cols = [];

    const createNewBarElement = (type, position, counter) => {
        let barElement = document.createElement('div');
        barElement.style.position = 'fixed';
        barElement.style.left = `${position}px`;
        barElement.style.top = `${position}px`;

        barElement.className = `${type} ${type}${counter}`;
        barElement.id = `row${rowCounter}`;
        barElement.setAttribute('data-type', position);
        barElement.setAttribute('data-index', counter);
        barElement.setAttribute('data-position', position);
        barElement.setAttribute('data-incrementStyle', '1');

        return barElement;
    }


    let rowCounter = 0;
    
    for (let rowPosition = gridBoxSizeY; rowPosition < availHeight; rowPosition += gridBoxSizeY) {
        const rowBarElement = createNewBarElement('row', rowPosition, rowCounter++);
        
        rows.push(rowBarElement);
        appHolder.appendChild(rowBarElement);
    }

    let colCounter = 0;
    for (let colPosition = gridBoxSizeX; colPosition < availWidth; colPosition += gridBoxSizeX) {
        const colBarElement = createNewBarElement('col', colPosition, colCounter++);
        
        cols.push(colBarElement);
        appHolder.appendChild(colBarElement);
    }

    let barAnimator;

    const randomColor = () => {
        if (!colorMode) return '#000';
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const isRandomTurn = () => randomFlip && Number(Math.random()).toFixed(3) === "0.683";

    const nextPosition = (elem, maxVal) => {
        let position = parseInt(elem.dataset.position);

        if (elem.dataset.incrementstyle == '1') {
            if (position + 1 >= maxVal || isRandomTurn()) {
                elem.setAttribute('data-incrementStyle', '2');
                elem.style.border = `${borderSize}px solid ${randomColor()}`;
                position--;
            } else {
                position++;
            }
        } else {
            if (position - 1 <= 0 || isRandomTurn()) {
                elem.setAttribute('data-incrementStyle', '1');
                elem.style.border = `${borderSize}px solid ${randomColor()}`;
                position++;
            } else {
                position--;
            }
        }

        elem.setAttribute('data-position', `${position}`);

        return position;
    }

    const startAnimation = () => {
        barAnimator = setInterval(() => {
            for (let r = 0; r < rowCounter; r++) {
                const elem = rows[r];
                const position = nextPosition(elem, availWidth);
                // elem.style.opacity = `${Math.random()}`;
                elem.style.left = `${position}px`;
            }

            for (let c = 0; c < colCounter; c++) {
                const elem = cols[c];
                const position = nextPosition(elem, availHeight);
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