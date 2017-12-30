var Canvas = {

  isCanvasSupported: function(){
    var canvas = document.createElement('canvas');
  	return !!(canvas.getContext && canvas.getContext('2d'));
  },
  init: function(horizontal_segment, horizon_interval, vertical_segment, vertical_interval){
    this.horizontal_segment = horizontal_segment;
    this.horizon_interval = horizon_interval;
    this.vertical_segment = vertical_segment;
    this.vertical_interval = vertical_interval;
  },
  setWindowBoundary: function(ctx, width, height){
    this.ctx = ctx;
    this.ctx.canvas.width  = width;
    this.ctx.canvas.height = height;
  },
  renderChessBoard: function(){
    this.ctx.beginPath();
    for (var i = 0 ; i < this.horizontal_segment; i++){
      this.renderLine(i*this.horizon_interval + this.horizon_interval/2, 0, i*this.horizon_interval + this.horizon_interval/2, this.ctx.canvas.clientHeight+i*this.horizon_interval);
    }
    for (var i = 0 ; i < this.vertical_segment; i++){
      this.renderLine(0, i*this.vertical_interval +this.vertical_interval/2, this.ctx.canvas.clientWidth+i*this.vertical_interval, i*this.vertical_interval + this.vertical_interval/2);
    }
    this.ctx.stroke();
  },
  renderLine:function(startX, startY, endX, endY){
  	this.ctx.moveTo(startX, startY);
  	this.ctx.lineTo(endX, endY);
  },
  drawArc: function(xPos, yPos, radius, startAngle, endAngle, anticlockwise, lineColor, fillColor){

		var startAngle = startAngle * (Math.PI/180);
		var endAngle   = endAngle   * (Math.PI/180);

		this.ctx.strokeStyle = lineColor;
		this.ctx.fillStyle   = fillColor;
		this.ctx.lineWidth   = 1;

		this.ctx.beginPath();
		this.ctx.arc(xPos, yPos,
		radius,
		startAngle, endAngle,
		anticlockwise);
		this.ctx.fill();
		this.ctx.stroke();
  },
  clearCanvas:function(width, height){
    this.ctx.clearRect(0, 0, width, height);
  }
}

export default Canvas;
