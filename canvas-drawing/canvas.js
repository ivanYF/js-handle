var canvasWidth = Math.min(800,$(window).width()-20);
var canvasHeight = canvasWidth;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// 是否按下鼠标
var isMouseDown = false;

// 存储第一次绘制点
var lastLoc = {x:0,y:0};

// 时间
var lastTimeStamp = 0;

// 绘制宽度
var lastLineWidth = -1;

// 绘制颜色
var strokeColor = "black";

$('#controller').css('width', canvasWidth+'px');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function drawGrid(){
	context.save();

	context.strokeStyle = "rgb(230,11,9)";
	context.beginPath();
	context.moveTo(3,3);
	context.lineTo(canvasWidth-3,3);
	context.lineTo(canvasWidth-3,canvasHeight-3);
	context.lineTo(3,canvasHeight-3);

	context.closePath();

	context.lineWidth = 6;
	context.stroke();

	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(canvasWidth,canvasHeight);

	context.moveTo(canvasWidth,0);
	context.lineTo(0,canvasHeight);

	context.moveTo(canvasWidth/2,0);
	context.lineTo(canvasWidth/2,canvasHeight);

	context.moveTo(0,canvasHeight/2);
	context.lineTo(canvasWidth,canvasHeight/2);


	context.lineWidth = 1;
	context.stroke();

	context.restore();
}

// 绘制  田字格
drawGrid();

function windowToCanvas(x,y){
	var bbox = canvas.getBoundingClientRect();
	return{
		x: Math.round(x-bbox.left),
		y: Math.round(y-bbox.top)
	}
}

// 开始绘制
function starstroke(point){
	isMouseDown = true;
	lastLoc = windowToCanvas(point.x,point.y);
	lastTimeStamp = new Date().getTime();
}

// 正在绘制
function movestroke(point){
	var curLoc = windowToCanvas(point.x,point.y);

	// 两点距离
	var diffLine = calcDistance(curLoc,lastLoc);

	var curTimeStamp = new Date().getTime();
	// 亮点时间差
	var diffTime = curTimeStamp - lastTimeStamp;

	var lineWidth = calcLineWidth(diffTime,diffLine)
	// 绘制
	context.beginPath();
	context.moveTo(lastLoc.x,lastLoc.y);
	context.lineTo(curLoc.x,curLoc.y);
	context.strokeStyle = strokeColor;

	context.lineWidth = lineWidth;
	context.lineCap = "round"
	context.lineJoin = "round"
	context.stroke();

	lastLoc = curLoc;
	lastTimeStamp = curTimeStamp;
	lastLineWidth = lineWidth;
}

canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	touch = e.touches[0];
	starstroke({x:touch.clientX,y:touch.clientY});
},false);

canvas.addEventListener('touchmove',function(e){
	e.preventDefault();
	if (isMouseDown) {
		// 执行  绘制
		touch = e.touches[0]
		// movestroke({x:e.clientX,y:e.clientY});
		movestroke({x:touch.clientX,y:touch.clientY});
	}

},false);
canvas.addEventListener('touchend',function(e){
	endstroke();
},false);

// 结束绘制
function endstroke(){
	isMouseDown = false;
}

canvas.onmousedown = function(e){
	e.preventDefault();
	// console.log("down");
	starstroke({x:e.clientX,y:e.clientY});
}

canvas.onmouseup = function(e){
	e.preventDefault();
	endstroke();	
}

canvas.onmouseout = function(e){
	e.preventDefault();
	endstroke();
}

canvas.onmousemove = function(e){
	e.preventDefault();

	if (isMouseDown) {
		// 执行  绘制
		movestroke({x:e.clientX,y:e.clientY});
	}
}

// 速度函数
function calcDistance(loc1,loc2){
	return Math.sqrt((loc1.x - loc2.x)*(loc1.x -loc2.x) + (loc1.y-loc2.y)*(loc1.y-loc2.y));
}


var maxLineWidth = 30;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;
function calcLineWidth(t,s){
    
    var v = s / t;

    var resultLineWidth;

    if( v <= minStrokeV ){
        resultLineWidth = maxLineWidth;
    }
    else if ( v >= maxStrokeV ){
        resultLineWidth = minLineWidth;
    }
    else{
        resultLineWidth = maxLineWidth - (v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth);
    }

    if( lastLineWidth == -1 ){
        return resultLineWidth;
    }
    return resultLineWidth*1/3 + lastLineWidth*2/3;
}


// 清空画布
$('#clear_btn').click(function(event) {
	context.clearRect(0,0,canvasWidth,canvasHeight);
	drawGrid();
});

// 改变颜色
$('.color_btn').click(function(event) {
	$('.color_btn').removeClass('color_btn_selected');
	$(this).addClass('color_btn_selected');

	strokeColor = $(this).attr("id").split("_")[0];
	
});




