const canvas = document.getElementById('canvas');
// canvas.height=1200;
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.textBaseline = 'top';
ctx.textAlign = 'left';

let drawing = false;
let paths = [];
let point = {};
var scores = 0, score = 0;
var mouse = { x: 0, y: 0 };
var previous = { x: 0, y: 0 };
const sizeElement = document.querySelector("#sizeRange");
let size = sizeElement.value;
sizeElement.oninput = (e) => {
    size = e.target.value;
};

ctx.lineWidth = size;
let imgs = ['img/cauhoi1.png', 'img/cauhoi2.png'];
const firstImg = new Image();
firstImg.src = imgs[0];
var canvasHeight = 0;

firstImg.onload = function () {
    init();
}

let hasScore = false;
var html = document.createElement('div');
html.setAttribute("id", "showMarkScore");
var coordinateScore = {};
var firstX = 0;
var firstY = 0;
var highlight = document.getElementById('highlight');

function markScore() {
    html.style.left = (coordinateScore.x + 10) + 'px';
    html.style.top = (coordinateScore.y - 25) + 'px';
    document.getElementById('wrap_canvas').appendChild(html);
    hasScore = true;
}

canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    ctx.strokeStyle = color;
    previous = { x: mouse.x, y: mouse.y };
    mouse = oMousePos(canvas, e);
    point = { fromX: mouse.x, fromY: mouse.y }
    firstX = mouse.x;
    firstY = mouse.y;
});

canvas.addEventListener('mousemove', function (e) {
    if (drawing) {
        previous = { x: e.layerX, y: mouse.y };
        if (!hasScore) {
            coordinateScore = previous;
            mode === 'mark' && markScore()
        } else {
            score = (Math.round((mouse.x - firstX) / 50 * 4) / 4).toFixed(2)
            document.getElementById('showMarkScore').innerText = score;
        }
        mouse = oMousePos(canvas, e);
// drawing a line from the previous point to the current point
        ctx.beginPath();
        ctx.lineWidth = size;
        // ctx.strokeStyle = color;
        ctx.moveTo(firstX, firstY);
        ctx.lineTo(mouse.x, firstY);
        ctx.stroke();
    }
}, false);


canvas.addEventListener('mouseup', function () {
    drawing = false;
    hasScore = false;
    if (score < 0.01) {
        document.getElementById('showMarkScore').innerText = ''
        renderPaths();
        return;
    }
// Adding the path to the array or the paths
    point = { ...point, toX: mouse.x, toY: firstY, score, color,size };
    paths.push(point);
    drawText(document.getElementById('showMarkScore').innerHTML, coordinateScore.x + 10, coordinateScore.y - 25);
    document.getElementById('showMarkScore').innerText = ''
    renderHistory(coordinateScore.x, coordinateScore.y);
    renderTotalScores();
}, false);

function Undo() {
    paths.splice(-1, 1);// remove the last path from the paths array
    renderPaths();// draw all the paths in the paths array
    highlight && highlight.remove();
    renderTotalScores()
}


// a function to detect the mouse position
function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

const writeScore = (ctx, score = 0, isClear = false) => {
    ctx.fillStyle = 'red';
    ctx.font = '38px serif';
    isClear && ctx.fillText('Điểm:', 650, 30);
    ctx.fillStyle = isClear ? 'white' : 'red';
    ctx.fillText(score, 750, 30);
}

document.querySelector("#clear").onclick = () => {
    scores = 0;
    paths = [];
    // setTimeout(init(),500)
    init()
    renderHistory();
};

function init() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    imgs.forEach(url => {
        img.src = url;
        canvasHeight += img.height;
    })
    canvas.height = canvasHeight;

    let currentHeight = 0;
    let arr = [];
    imgs.forEach((url, index) => {
            const a = new Promise((resolve, reject) => {
                let img = new Image()
                img.src = url;
                img.onload = () => resolve(img)
                img.onerror = reject
            }).then((data) => data);
            arr.push(a)
        }
    )

    Promise.all(arr).then(value => {
        value.forEach((img) => {
            ctx.drawImage(img, 0, currentHeight);
            currentHeight = img.height;
        })
    })

    highlight && highlight.remove();
}

const renderHistory = () => {
    document.getElementById('history').innerHTML = '';
    paths.forEach(path => {
        let li = document.createElement('li');
        li.innerHTML = `${path.score} <span class="del">Xóa</span>`;
        li.onclick = function () {
            let highlight = document.createElement('div')
            highlight.setAttribute('id', 'highlight')
            highlight.setAttribute('style', `top:${path.fromY - 40}px; left:${path.fromX}px`);
            setTimeout(() => document.getElementById('wrap_canvas').appendChild(highlight), 10)
        }
        document.getElementById('history').appendChild(li);
    })
}

const renderPaths = () => {
    // const promise = new Promise((resolve, reject) => {
    init();
    renderHistory();
    // }).then(data=>data);
    // Promise.all([promise]).then((values) => {
    setTimeout(() => {
        paths.forEach(path => {
            ctx.beginPath();
            ctx.strokeStyle=path.color;
            ctx.lineWidth=path.size;
            ctx.moveTo(path.fromX, path.fromY);
            ctx.lineTo(path.toX, path.toY);
            ctx.stroke();
            drawText(path.score, path.fromX + 10, path.fromY - 25);
        })
    }, 50)

    // })

}

document.getElementById('history').onclick = function () {
    document.getElementById('highlight').remove();
}

const shortcuts = (e) => {
    e.ctrlKey && e.key === 'z' && Undo();
}
document.addEventListener('keyup', shortcuts, false);

const renderTotalScores = () => {
    if (mode === 'mark' && mouse.x - firstX && mouse.x - firstX > 0) {
        writeScore(ctx, scores, true) //clear score
        scores = 0;
        paths.forEach(path => {
            scores = parseFloat(path.score) + parseFloat(scores);
        });
        writeScore(ctx, scores);
    }

}