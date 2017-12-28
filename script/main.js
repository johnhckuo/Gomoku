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
var blackStone;

var initial = function(){
	ctx.canvas.width  = width;
  ctx.canvas.height = height;

  renderChessBoard();

	$('#main').click(function(e) {
      //return !$(this).hasClass('clicked');

	    var x = e.offsetX,
	        y = e.offsetY;

      computeStartingPoint(x, y);
      if (canvas_support){
        var radius = horizon_interval > vertical_interval ? vertical_interval/2.5 : horizon_interval/2.5;
        if (move % 2){
          drawArc(startX + horizon_interval/2,  startY + vertical_interval/2, radius, 0,   360, false, "black", "black");

        }else{
          drawArc(startX + horizon_interval/2,  startY + vertical_interval/2, radius, 0,   360, false, "black", "white");
        }
      }
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
  var currentXSegment = Math.floor(x/horizon_interval);
  var currentYSegment = Math.floor(y/vertical_interval);
  startX = currentXSegment*horizon_interval, startY = currentYSegment*vertical_interval;
}

function drawArc(xPos, yPos, radius, startAngle, endAngle, anticlockwise, lineColor, fillColor){

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

initial();
