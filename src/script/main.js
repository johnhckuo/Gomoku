import '../scss/reset.scss';
import '../scss/main.scss';
import Canvas from './canvas_render.js';
import Div from './div_render.js';
import swal from 'sweetalert2'
import champ_img from "../images/champ.png";
import draw_img from "../images/draw.png";
import welcome_img from "../images/welcome.png";
import background from "../images/background.png";

var canvas, ctx;
var width, height;
var horizontal_segment = 30, vertical_segment = 30;
var horizon_interval, vertical_interval;
var startX, endX, startY, endY;
var currentXSegment, currentYSegment;
var canvas_support;
var move = 0, firstMove = 0;
var steps;
var rtime;
var timeout = false;
var delta = 200;
var renderer, container;

initial();
registerPlayerEvent();

function initial(){
		move = 0;
	  fetchBrowserInfo();
		steps = initArray(horizontal_segment, vertical_segment);
		renderChessBoard();
	  registerPlayerData();

}

function registerPlayerEvent(){
	  if (canvas_support){
	    $('#main').click(playerClick);
	  }else{
	    $('#container').click(playerClick);
	  }

		//detect on resize end so that we can save more computing power
		$(window).resize(function() {
		    rtime = new Date();
		    if (timeout === false) {
		        timeout = true;
		        setTimeout(resizeend, delta);
		    }
		});
}

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        canvasResize();
    }
}

function playerClick(e){
	  var x = e.pageX,
	      y = e.pageY;

		if (canvas_support){
			var canvasParent = $('#main');
			x += canvasParent.position().left;
			y += canvasParent.position().top;
		}else{
			var divParent = $("#container");
			x += divParent.position().left;
			y += divParent.position().top;
		}

	  computeStartingPoint(x, y);
	  var valid = validMove(move%2);
	  if (!valid){
	    swal({
	      title: 'Invalid Position!',
	      text: 'This spot has already been taken!',
	      timer: 1500,
				type:"error",
				padding: 50,
				background: '#fff url(' + background + ')',
	      onOpen: function(){
	        swal.showLoading();
	      }
	    }).then(function(result){
	      // if (result.dismiss === 'timer') {
	      //   console.log('I was closed by the timer')
	      // }
	    })
	    return;
	  }
	  var radius = horizon_interval > vertical_interval ? vertical_interval/2.5 : horizon_interval/2.5;

	  if (move % 2){
	    renderer.drawArc(startX + horizon_interval/2,  startY + vertical_interval/2, radius, 0,   360, false, "black", "black");

	  }else{
	    renderer.drawArc(startX + horizon_interval/2,  startY + vertical_interval/2, radius, 0,   360, false, "black", "white");
	  }

	  winnerCheck(move%2);
	  move++;
		drawCheck();
}


function fetchBrowserInfo(){
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
		horizontal_segment = Math.floor(vertical_segment*(width/height));
    if (Canvas.isCanvasSupported()){
			renderer = Canvas;
			if (!$('#main').length){
				$("body").append("<canvas id='main'></canvas>");
			}
			canvas = document.getElementById('main');
      ctx = canvas.getContext('2d');
			renderer.setWindowBoundary(ctx, width, height);
			container = $("#main");
      canvas_support = true;
    }else{
			renderer = Div;
			if (!$('#container').length){
				$("body").append("<div id='container'></div>");
				$("#container").append("<div id='grid'></div>");
				$("#container").append("<div id='stone'></div>");
			}
			container = $("#container");
      canvas_support = false;
    }

    horizon_interval = width/horizontal_segment;
    vertical_interval = height/vertical_segment;
}

function registerPlayerData(){
    swal({
        title: 'Who gets the first move?',
        text: "Player 0 → White Stone | Player 1 → Black Stone",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Player 0',
        cancelButtonText: 'Player 1',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-success',
        buttonsStyling: false,
        reverseButtons: false,
				imageUrl: welcome_img,
				imageWidth: 150,
				imageHeight: 150,
				imageAlt: 'Custom image',
				padding: 50,
				background: '#fff url('+ background +')'
    }).then(function(result){
        if (result.dismiss === 'cancel') {
            move++;
            firstMove = 1;
        }
				swal({
		      title: 'Get Ready!',
		      text: 'Let the game begins~',
		      timer: 1500,
					type:"success",
					padding: 50,
					background: '#fff url(' + background + ')',
		      onOpen: function(){
		        swal.showLoading();
		      }
		    })
    })
}


function computeStartingPoint(x, y){

		x -= (horizon_interval/2);
		y -= (vertical_interval/2);

		currentXSegment = Math.round(x/horizon_interval);
		currentYSegment = Math.round(y/vertical_interval);
		startX = currentXSegment*horizon_interval, startY = currentYSegment*vertical_interval;
}

function renderChessBoard(){
		renderer.init(horizontal_segment, horizon_interval, vertical_segment, vertical_interval);
		renderer.renderChessBoard();
}

function validMove(player){

		var x = currentXSegment;
		var y = currentYSegment;

		if (steps[x][y] == -1){
			steps[x][y] = player;
			return true;
		}else{
			return false;
		}

}

function winnerCheck(player){

		var x = currentXSegment;
		var y = currentYSegment;
		if (horizontal_Check(x, y, player)
			|| vertical_Check(x, y, player)
			|| pos_Diagonal_Check(x, y, player)
			|| neg_Diagonal_Check(x, y, player))
		{
			return true;
		}
		return false;
}

function renderPlayerProgress(){
	  var radius = horizon_interval > vertical_interval ? vertical_interval/2.5 : horizon_interval/2.5;

	  for (var i = 0 ; i < steps.length ; i++){
	    for (var j = 0 ; j < steps[i].length ; j++){
	      if (steps[i][j] == 0){
	        renderer.drawArc(i*horizon_interval + horizon_interval/2,  j*vertical_interval + vertical_interval/2, radius, 0,   360, false, "black", "white");
	      }else if (steps[i][j] == 1){
	        renderer.drawArc(i*horizon_interval + horizon_interval/2,  j*vertical_interval + vertical_interval/2, radius, 0,   360, false, "black", "black");
	      }
	    }
	  }
}

function recalculateSteps(){
	var oldSteps = steps.slice();
	if (horizontal_segment > oldSteps.length){
		var difference = horizontal_segment - oldSteps.length;
		var start = oldSteps.length-1;
		var childArr = [];
		for (var j = 0 ; j < vertical_segment ; j++){
			childArr.push(-1);
		}
		for (var i = start ; i < start + difference  ; i++){
			oldSteps.push(childArr.slice());
		}
		steps = oldSteps;
	}
}

function canvasResize(){
	  rerenderCanvas();
		recalculateSteps();
	  renderPlayerProgress();
}

function rerenderCanvas(){
	  fetchBrowserInfo();
		renderer.reset();
		renderChessBoard();
}

function drawCheck(){
		var totalMove = move - firstMove;
		if (totalMove == horizontal_segment*vertical_segment){
				restart("Draw!", draw_img);
		}
}

function restart(msg, img){
	  swal({
	      title: msg,
	      text: "Restart ?",
	      showCancelButton: true,
	      confirmButtonColor: '#3085d6',
	      cancelButtonColor: '#d33',
	      confirmButtonText: 'Sure',
	      cancelButtonText: 'Nope',
	      confirmButtonClass: 'btn btn-primary',
	      cancelButtonClass: 'btn btn-danger',
	      buttonsStyling: false,
	      reverseButtons: false,
				imageUrl: img,
				imageWidth: 100,
				imageHeight: 100,
				imageAlt: 'Custom image',
				animation: true,
				padding: 50,
				background: '#fff url(' + background + ')'
	  }).then(function(result){
	      if (result.value) {
	          initial();
	          swal({
	            title:'Get Ready!',
	            text:'Let the game begins!',
	            type:'success',
							padding: 50,
							background: '#fff url(' + background + ')'
	          });
	      }
	  })
}

function initArray(rows, cols) {
		var array = [], row = [];
		while (cols--) row.push(-1);
		while (rows--) array.push(row.slice());
		return array;
}

function horizontal_Check(x, y, player){
		var count = 1;	//current move
		var pivot_X;

		pivot_X = x;
		while ((pivot_X+1 < horizontal_segment) && (steps[pivot_X+1][y] == player)){
			count++;
			pivot_X++;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		pivot_X = x;
		while ((pivot_X-1 >= 0) && (steps[pivot_X-1][y] == player)){
			count++;
			pivot_X--;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		return false;
}

function vertical_Check(x, y, player){

		var count = 1;	//current move
		var pivot_Y;

		pivot_Y = y;
		while ((pivot_Y+1 < vertical_segment) && (steps[x][pivot_Y+1] == player)){
			count++;
			pivot_Y++;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		pivot_Y = y;
		while ((pivot_Y-1 >= 0) && (steps[x][pivot_Y-1] == player)){
			count++;
			pivot_Y--;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		return false;
}

function pos_Diagonal_Check(x, y, player){

		var count = 1;	//current move
		var pivot_X, pivot_Y;

		pivot_X = x;
		pivot_Y = y;
		while ((pivot_X+1 < horizontal_segment) && (pivot_Y+1 < vertical_segment) && (steps[pivot_X+1][pivot_Y+1] == player)){
			count++;
			pivot_X++;
			pivot_Y++;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		pivot_X = x;
		pivot_Y = y;
		while ((pivot_X-1 >= 0) && (pivot_Y-1 >= 0) && (steps[pivot_X-1][pivot_Y-1] == player)){
			count++;
			pivot_X--;
			pivot_Y--;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		return false;
}


function neg_Diagonal_Check(x, y, player){

		var count = 1;	//current move
		var pivot_X, pivot_Y;

		pivot_X = x;
		pivot_Y = y;
		while ((pivot_X+1 < horizontal_segment) && (pivot_Y-1 >= 0) && (steps[pivot_X+1][pivot_Y-1] == player)){
			count++;
			pivot_X++;
			pivot_Y--;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		pivot_X = x;
		pivot_Y = y;
		while ((pivot_X-1 >= 0) && (pivot_Y+1 < vertical_segment) && (steps[pivot_X-1][pivot_Y+1] == player)){
			count++;
			pivot_X--;
			pivot_Y++;
			if (checkConsecutiveSteps(count, player)){
				return true;
			}
		}
		return false;
}


function checkConsecutiveSteps(count, player){
		if (count >= 5){
	    restart("Congratulations! \nPlayer "+player +" wins!", champ_img);
			return true;
		}else{
			return false;
		}
}
