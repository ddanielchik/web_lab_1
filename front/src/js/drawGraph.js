const canvas =document.getElementById("canvas")
let frame = document.getElementById("frame");

canvas.width = frame.offsetWidth;
canvas.height = frame.offsetHeight;
const ctx = canvas.getContext("2d");


ctx.beginPath();
// Прямоугольник
ctx.fillStyle = "#ded25e";
ctx.fillRect(canvas.width/2-(canvas.height/3), canvas.height/2,  canvas.height/3, canvas.height/6);

// Окружность
ctx.moveTo(canvas.width/2, canvas.height/2);
ctx.lineTo(canvas.width/2, canvas.height/2 + canvas.height/3);
ctx.moveTo(canvas.width/2, canvas.height/2);
ctx.lineTo(canvas.width/2-(canvas.height/3), canvas.height/2);
ctx.arc(canvas.width/2, canvas.height/2, canvas.height/3, Math.PI, 0- Math.PI/2, false);
ctx.fill();


// Треугольник
ctx.moveTo(canvas.width/2 + canvas.height/3 ,canvas.height/2);// Вершина на оси X
ctx.lineTo(canvas.width/2, canvas.height/2);// Вершина на оси Y
ctx.lineTo(canvas.width/2, canvas.height/3); // центр
ctx.fill();

// Координатная прямая

ctx.fillStyle = "#000";
ctx.beginPath();
ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2, canvas.height);
ctx.moveTo(0, canvas.height/2);
ctx.lineTo(canvas.width, canvas.height/2);

// стрелки на коцах осей
ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2+10, 15);
ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2-10, 15);

ctx.moveTo(canvas.width, canvas.height/2);
ctx.lineTo(canvas.width-15, canvas.height/2+10);
ctx.moveTo(canvas.width, canvas.height/2);
ctx.lineTo(canvas.width-15, canvas.height/2-10);

// Черточки на координатной прямой
for (let i=-2; i<=2; i++){
    if (i == 0){
        continue
    }
    ctx.moveTo(canvas.width/2-7, canvas.height/2 + canvas.height/6*i);
    ctx.lineTo(canvas.width/2+7, canvas.height/2 + canvas.height/6*i);

    ctx.moveTo(canvas.width/2 + canvas.height/6*i, canvas.height/2-7);
    ctx.lineTo(canvas.width/2 + canvas.height/6*i, canvas.height/2+7);
}

// Подпись единиц измерения
ctx.font = "18px Trebuchet MS";
ctx.fillText("-R", canvas.width/2 - canvas.height/3 - 12, canvas.height/2-10);
ctx.fillText("R",canvas.width/2+10, canvas.height/6+7);
ctx.fillText("R", canvas.width/2 + canvas.height/3 - 7, canvas.height/2-10);
ctx.fillText("-R", canvas.width/2+10, canvas.height/2 + canvas.height/3+5);
ctx.fillText("-R/2", canvas.width/2 - canvas.height/6-20, canvas.height/2-10);
ctx.fillText("R/2",canvas.width/2+10, canvas.height/3+7);
ctx.fillText("R/2", canvas.width/2 + canvas.height/6-13, canvas.height/2-10);
ctx.fillText("R/2", canvas.width/2+10, canvas.height/2 + canvas.height/6+7);
ctx.stroke();
