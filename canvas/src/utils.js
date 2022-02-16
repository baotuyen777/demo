const f = require('fs')

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
// var previous = { x: 0, y: 0 };

const sizeElement = document.querySelector("#sizeRange");
let size = sizeElement.value;
sizeElement.oninput = (e) => {
    size = e.target.value;
};

ctx.lineWidth = size;
let imgs = ['https://hls.smartlms.vn/media/2021/12/20/4c/618e2cd691529347a323b14c/61c052c81a66cd659f0c3083.png', 'img/cauhoi2.png'];
const firstImg = new Image();
firstImg.src = imgs[0];
var canvasHeight = 0;

firstImg.onload = async function () {
    await init();
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
    // previous = { x: mouse.x, y: mouse.y };
    mouse = oMousePos(canvas, e);
    point = { fromX: mouse.x, fromY: mouse.y }
    firstX = mouse.x;
    firstY = mouse.y;
});

canvas.addEventListener('mousemove', function (e) {
    if (drawing) {
        coordinateScore = { x: e.layerX, y: mouse.y };
        if (!hasScore) {
            mode === 'mark' && markScore()
        } else {
            score = calculateScore();
            document.getElementById('showMarkScore').innerText = score;
        }
        mouse = oMousePos(canvas, e);
// drawing a line from the previous point to the current point
        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.moveTo(firstX, firstY);
        ctx.lineTo(mouse.x, firstY);
        ctx.stroke();
    }
}, false);


canvas.addEventListener('mouseup', function () {
    drawing = false;
    hasScore = false;
    score = calculateScore();
    if (score < 0.01) {
        document.getElementById('showMarkScore').innerText = '';
        return;
    }
// Adding the path to the array or the paths
    point = { ...point, toX: mouse.x, toY: firstY, score, color, size, mode };
    paths.push(point);
    drawText(document.getElementById('showMarkScore').innerHTML, firstX + 10, firstY - 25);
    document.getElementById('showMarkScore').innerText = ''
    renderHistory(coordinateScore.x, coordinateScore.y);
    renderTotalScores();
    // score =0;
}, false);

const calculateScore = () => {
    return (Math.round((mouse.x - firstX) / 50 * 4) / 4).toFixed(2)
}

const Undo = async () => {
    await init();
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

document.querySelector("#clear").onclick = () => {
    scores = 0;
    paths = [];
    // setTimeout(init(),500)
    init()
    renderHistory();
};

document.querySelector("#save").onclick = () => {

    const out = f.createWriteStream(__dirname + '/text.png')
    const stream = canvas.pngStream();
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
    stream.on('end', function () {
        console.log('PNG Saved successfully!');
    });
    ///---------------
    // const image= canvas.toDataURL("image/png");
    // document.write('<img src="'+image+'"/>');
    // console.log(image,99)
};
let b = false

function init() {
    let img = new Image();
    imgs.forEach(url => {
        img.src = url;
        canvasHeight += img.height;
    })
    canvas.height = canvasHeight;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    return Promise.all(arr).then(value => {
        value.forEach((img) => {
            ctx.drawImage(img, 0, currentHeight);
            currentHeight = img.height;
        })
        highlight && highlight.remove();
        return value;
    })
}

const renderHistory = () => {
    document.getElementById('history').innerHTML = '';
    paths.forEach(path => {
        let li = document.createElement('li');
        li.innerHTML = `${path.mode === 'mark' ? path.score : "Chữa bài"} <span class="del">Xóa</span>`;
        li.onclick = function () {
            let highlight = document.createElement('div')
            highlight.setAttribute('id', 'highlight')
            highlight.setAttribute('style', `top:${path.fromY - 40}px; left:${path.fromX}px`);
            setTimeout(() => document.getElementById('wrap_canvas').appendChild(highlight), 10);
            path.fromY > 700 && window.scrollTo({ top: path.fromY, behavior: 'smooth' });
        }
        document.getElementById('history').appendChild(li);
    })
}

const renderPaths = () => {
    // await init();
    renderHistory();
    paths.forEach(path => {
        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.size;
        ctx.moveTo(path.fromX, path.fromY);
        ctx.lineTo(path.toX, path.toY);
        ctx.stroke();
        drawText(path.score, path.fromX + 10, path.fromY - 25);
    })

}

document.getElementById('history').onclick = function () {
    document.getElementById('highlight').remove();
}

const shortcuts = (e) => {
    e.ctrlKey && e.key === 'z' && Undo();
    e.key === 'Escape' && document.getElementById('ex-note-input') && document.getElementById('ex-note-input').remove();
}
document.addEventListener('keyup', shortcuts, false);

const renderTotalScores = () => {
    if (mode === 'mark' && mouse.x - firstX && mouse.x - firstX > 0) {
        scores = 0;
        paths.forEach(path => {
            scores = parseFloat(path.score) + parseFloat(scores);
        });
        ctx.fillStyle = "white";
        ctx.fillRect(650, 20, 200, 40);
        ctx.fillStyle = 'red';
        ctx.font = '38px serif';
        ctx.fillText('Điểm:', 650, 50);
        ctx.fillText(scores, 750, 50);
    }
}
