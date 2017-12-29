var assert = chai.assert;

describe('Win or not', function() {

  it('5 consecutive win', function(){
  	var result = checkConsecutiveSteps(5, 1);
  	assert.equal(result, true, 'Player 1 should win');
  });

  it('Horizontal win', function(){
  	console.log(steps);
  	steps[0][0] = 1;
  	steps[1][0] = 1;
  	steps[2][0] = 1;
  	steps[3][0] = 1;
  	steps[4][0] = 1;

  	console.log(steps);
	var result = horizontal_Check(4, 0, 1);
	assert.equal(result, true, 'Player 1 wins');

  });

  it('Vertical win', function(){
  	console.log(steps);
  	steps[0][0] = 1;
  	steps[0][1] = 1;
  	steps[0][2] = 1;
  	steps[0][3] = 1;
  	steps[0][4] = 1;

  	console.log(steps);
	var result = vertical_Check(0, 4, 1);
	assert.equal(result, true, 'Player 1 wins');

  });

  it('Diagonal win', function(){
  	console.log(steps);
  	steps[0][0] = 1;
  	steps[1][1] = 1;
  	steps[2][2] = 1;
  	steps[3][3] = 1;
  	steps[4][4] = 1;

  	console.log(steps);
	var result = diagonal_Check(4, 4, 1);
	assert.equal(result, true, 'Player 1 wins');

  });
  it('Winner should be player 0', function(){
  	console.log(steps);
  	var result;
  	result = playerMove(0, 0, 0);  //first step
  	result = playerMove(0, 1, 0);  //second step and so on
  	result = playerMove(0, 2, 0);
  	result = playerMove(0, 3, 0);
  	result = playerMove(0, 4, 0);
  	assert.equal(result, true, 'Player 0 wins');

  });
});