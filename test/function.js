steps = [
				[-1, -1, -1, -1, -1], 
				[-1, -1, -1, -1, -1], 
				[-1, -1, -1, -1, -1], 
				[-1, -1, -1, -1, -1], 
				[-1, -1, -1, -1, -1]
			];
var horizontal_segment = 5, vertical_segment = 5;

function playerMove(x, y, player){
	steps[x][y] = player;

	if (horizontal_Check(x, y, player) 
		|| vertical_Check(x, y, player) 
		|| diagonal_Check(x, y, player))
	{
		return true;
	}

	return false;
}


function horizontal_Check(x, y, player){
	var count = 1;	//current move
	var pivot_X;

	//horizontal
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

function diagonal_Check(x, y, player){

	var count = 1;	//current move
	var pivot_X, pivot_Y;
	//diagonal
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

function checkConsecutiveSteps(count, player){
	if (count >= 5){
		//alert("player"+player +" wins!");
		return true;
	}else{
		return false;
	}
}
