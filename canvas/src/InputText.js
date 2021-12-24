var hasInput = false;
var textX = 0, textY = 0;
canvas.onclick = function (e) {
    if (mode === 'text') {
        textX = e.layerX;
        textY = e.layerY;
        !hasInput && addInput(e.clientX, e.clientY);
    }
}

//Function to dynamically add an input box:
function addInput(x, y) {
    var input = document.createElement('textarea');
    input.setAttribute('id','ex-note-input');
    input.style.position = 'absolute';
    input.style.left = (x) + 'px';
    input.style.top = (y) + 'px';

    input.onkeydown = function (e) {
        if (e.key === 'Enter' && e.altKey) {
            input.value = input.value + "\n";
            return;
        }
        e.key === 'Enter' && renderComment(this);
    };

    input.onblur = function () {
        renderComment(this)
    }

    document.body.appendChild(input);
    input.focus();
    hasInput = true;
}

//Key handler for input box:
function renderComment(e) {
    drawText(e.value, textX + 10, textY - 5);
    document.body.removeChild(e);
    hasInput = false;
}

//Draw the text onto canvas:
function drawText(txt, x, y) {
    if (!txt) {
        return;
    }
    let lines = txt.split('\n');
    let lineHeight = 25;
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = 'blue';
    const width=ctx.measureText(txt).width;
    ctx.fillRect(x - 5, y - 5, width , 25 + ((lines.length - 1) * lineHeight));
    ctx.globalAlpha = 1;

    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'blue';

    for (let j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], x, y + 15 + (j * lineHeight));
    }
}
