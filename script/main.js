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

var initial = function(){
	ctx.canvas.width  = width;
  	ctx.canvas.height = height;
	if (isCanvasSupported()){
	 	ctx.beginPath();
		
		for (var i = 0 ; i < horizontal_segment; i++){
			render(i*horizon_interval, 0, i*horizon_interval, ctx.canvas.clientHeight+i*horizon_interval);
		}
		for (var i = 0 ; i < vertical_segment; i++){
			render(0, i*vertical_interval, ctx.canvas.clientWidth+i*vertical_interval, i*vertical_interval);
		}
		ctx.stroke();
	}else{

	  // canvas-unsupported code here
	  	var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
             '<em>test</em> test ' + 
             '<span style="color:white; text-shadow:0 0 2px blue;">' +
             'test</span>' +
           '</div>' +
           '</foreignObject>' +
           '</svg>';
        var vertical_line = [];
        var horizontal_line = [];
        for (var i = 0 ; i < horizontal_segment; i++){
			//render(i*horizon_interval, 0, i*horizon_interval, ctx.canvas.clientHeight+i*horizon_interval);
			horizontal_line.push("<span class='line' style='top:"+ i*horizon_interval +"; left:0px;'></div>");
		}
		for (var i = 0 ; i < vertical_segment; i++){
			//render(0, i*vertical_interval, ctx.canvas.clientWidth+i*vertical_interval, i*vertical_interval);
		}

        var DOMURL = window.URL || window.webkitURL || window;

		var img = new Image();
		var svg = new Blob([data], {type: 'image/svg+xml'});
		var url = DOMURL.createObjectURL(svg);

		img.onload = function() {
		  ctx.drawImage(img, 0, 0);
		  DOMURL.revokeObjectURL(url);
		}

		img.src = url;
	}



	$('#main').click(function(e) {
	    var x = e.offsetX,
	        y = e.offsetY;
	    var currentXSegment = x/horizon_interval;
	    var currentYSegment = y/vertical_interval;

	});

	$( "#main" ).mousemove(function( e ) {
	    var x = e.offsetX,
	        y = e.offsetY;
		if (startX != null){

			ctx.clearRect(startX, startY, horizon_interval, vertical_interval);
		}

	    var currentXSegment = Math.floor(x/horizon_interval);
	    var currentYSegment = Math.floor(y/vertical_interval);
	    startX = currentXSegment*horizon_interval, startY = currentYSegment*vertical_interval;
		ctx.fillRect(startX, startY, horizon_interval, vertical_interval);
		ctx.stroke();

	});

	
}

var render = function(startX, startY, endX, endY){
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
}


function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

initial();
