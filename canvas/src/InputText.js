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
    var input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x) + 'px';
    input.style.top = (y) + 'px';

    input.onkeydown = function (e) {
        e.key === 'Enter' && renderComment(this)
    };

    input.onblur = function() {
        console.log(2323)
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
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'gray';
    const width = ctx.measureText(txt).width;

    ctx.fillRect(x - 5, y - 5, width + 10, 25);
    ctx.globalAlpha = 1;

    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'blue';
    ctx.fillText(txt, x, y+15);
}
