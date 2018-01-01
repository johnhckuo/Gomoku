var Div = {

  init: function(horizontal_segment, horizon_interval, vertical_segment, vertical_interval){
    $("#stone").empty();
    this.horizontal_segment = horizontal_segment;
    this.horizon_interval = horizon_interval;
    this.vertical_segment = vertical_segment;
    this.vertical_interval = vertical_interval;
  },
  renderChessBoard: function(){
    for (var i = 0 ; i <= this.vertical_segment; i++){
		    for (var j = 0 ; j <= this.horizontal_segment ; j++){
          var top = (i*this.vertical_interval) - (this.vertical_interval/2);
          var left = (j*this.horizon_interval) - (this.horizon_interval/2);
		      $("#grid").append("<span class='line line_"+ i + "_" + j +"' style='top:"+ top +"px; left:"+ left +"px;'></span>");
		    }
		}
		$(".line").css("width", this.horizon_interval);
		$(".line").css("height", this.vertical_interval);
  },
  renderLine:function(startX, startY, endX, endY){
  	this.ctx.moveTo(startX, startY);
  	this.ctx.lineTo(endX, endY);
  },
  drawArc: function(xPos, yPos, radius, startAngle, endAngle, anticlockwise, lineColor, fillColor){

    var left = xPos - radius;
		var top = yPos - radius;
		var circle = $('<div/>',{
		class: 'circle',
		   css:{
				left: left + "px",
				top: top + "px",
				background: fillColor,
				border:"1px solid "+lineColor,
				width:radius*2,
				height:radius*2
		   }
		})
		$("#stone").append(circle);
  },
  reset:function(){
    $("#stone").empty();
    $("#grid").empty();
  }

}

export default Div;
