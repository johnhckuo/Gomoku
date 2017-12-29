var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
var horizontal_segment = 10, vertical_segment = 10;
var horizon_interval = width/horizontal_segment;
var vertical_interval = height/vertical_segment;
var startX, endX, startY, endY;
var canvas_support;
var move = 0;
var steps;

var initial = function(){
  ctx.canvas.width  = width;
  ctx.canvas.height = height;
  steps = initArray(horizontal_segment, vertical_segment);
  renderChessBoard();

	$('#main').click(function(e) {
      //return !$(this).hasClass('clicked');

	    var x = e.offsetX,
	        y = e.offsetY;

      computeStartingPoint(x, y);
      var clicked = recordPosition(currentXSegment, currentYSegment, move%2);
      
      if (clicked){
      	alert("Invalid Position");
      	return;
      }

    var radius = horizon_interval > vertical_interval ? vertical_interval/2.5 : horizon_interval/2.5;
    if (move % 2){
      drawArc(startX + horizon_interval/2,  startY + vertical_interval/2, radius, 0,   360, false, "black", "black");

    }else{
      drawArc(startX + horizon_interval/2,  startY + vertical_interval/2, radius, 0,   360, false, "black", "white");
    }

      detectWin(currentXSegment, currentYSegment, move%2);
      move++;
	});

  window.addEventListener('resize', onWindowResize, false);

}

var render = function(startX, startY, endX, endY){
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
}


function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

var computeStartingPoint = function(x, y){
  currentXSegment = Math.floor(x/horizon_interval);
  currentYSegment = Math.floor(y/vertical_interval);
  startX = currentXSegment*horizon_interval, startY = currentYSegment*vertical_interval;

}

function drawArc(xPos, yPos, radius, startAngle, endAngle, anticlockwise, lineColor, fillColor){
	//if (canvas_support){
	if (false){
		var startAngle = startAngle * (Math.PI/180);
		var endAngle   = endAngle   * (Math.PI/180);

		ctx.strokeStyle = lineColor;
		ctx.fillStyle   = fillColor;
		ctx.lineWidth   = 8;

		ctx.beginPath();
		ctx.arc(xPos, yPos,
		radius,
		startAngle, endAngle,
		anticlockwise);
		ctx.fill();
		ctx.stroke();
	}else{

		var link = $('<div/>',{
		class: 'circle',
		   css:{
				left: xPos - radius + "px",
				top: yPos - radius + "px",
				background: fillColor,
				border:"1px solid "+lineColor,
				width:radius*2,
				height:radius*2
		   }
		})
		$("#container").append(link);	

	}
}

function onWindowResize() {

}

function renderChessBoard(){
  if (isCanvasSupported()){
    canvas_support = true;
    ctx.beginPath();

    for (var i = 0 ; i < horizontal_segment; i++){
      render(i*horizon_interval, 0, i*horizon_interval, ctx.canvas.clientHeight+i*horizon_interval);
    }
    for (var i = 0 ; i < vertical_segment; i++){
      render(0, i*vertical_interval, ctx.canvas.clientWidth+i*vertical_interval, i*vertical_interval);
    }
    ctx.stroke();

  }else{
    canvas_support = false;
    var vertical_line = [];
    var horizontal_line = [];

    for (var i = 0 ; i < horizontal_segment; i++){
        for (var j = 0 ; j < vertical_segment ; j++){
          $("#container").append("<span class='line line_"+ i + "_" + j +"' style='top:"+ i*vertical_interval +"px; left:"+ j*horizon_interval +"px;'></span>");
        }
       //render(i*horizon_interval, 0, i*horizon_interval, ctx.canvas.clientHeight+i*horizon_interval);
    }
    $(".line").css("width", horizon_interval);
    $(".line").css("height", vertical_interval);
  }
}

function recordPosition(x, y, player){
	if (steps[x][y] == -1){
		steps[x][y] = player;
		return false;
	}else{
		return true;
	}
}

function detectWin(x, y, player){
	var count = 1;	//current move
	var pivot_X, pivot_Y;

	//horizontal
	pivot_X = x;
	while ((pivot_X+1 < horizontal_segment) && (steps[pivot_X+1][y] == player)){
		count++;
		pivot_X++;
		if (count >= 5){
			alert("player"+player +" wins!");
			return;
		}
	}
	pivot_X = x;
	while ((pivot_X-1 >= 0) && (steps[pivot_X-1][y] == player)){
		count++;
		pivot_X--;
		if (count >= 5){
			alert("player"+player +" wins!");
			return;
		}
	}

	count = 1;

	//vertical
	pivot_Y = y;
	while ((pivot_Y+1 < vertical_segment) && (steps[x][pivot_Y+1] == player)){
		count++;
		pivot_Y++;
		if (count >= 5){
			alert("player"+player +" wins!");
			return;
		}
	}
	pivot_Y = y;
	while ((pivot_Y-1 >= 0) && (steps[x][pivot_Y-1] == player)){
		count++;
		pivot_Y--;
		if (count >= 5){
			alert("player"+player +" wins!");
			return;
		}
	}
	count = 1;

	//diagonal
	pivot_X = x;
	pivot_Y = y;
	while ((pivot_X+1 < horizontal_segment) && (pivot_Y+1 < vertical_segment) && (steps[pivot_X+1][pivot_Y+1] == player)){
		count++;
		pivot_X++;
		pivot_Y++;
		if (count >= 5){
			alert("player"+player +" wins!");
			return;
		}
	}
	pivot_X = x;
	pivot_Y = y;
	while ((pivot_X-1 >= 0) && (pivot_Y-1 >= 0) && (steps[pivot_X-1][pivot_Y-1] == player)){
		count++;
		pivot_X--;
		pivot_Y--;
		if (count >= 5){
			alert("player"+player +" wins!");
			return;
		}
	}
}

function initArray(rows, cols) {
  var array = [], row = [];
  while (cols--) row.push(-1);
  while (rows--) array.push(row.slice());
  return array;
}

initial();
