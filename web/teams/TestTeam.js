var getRandomDirection = function(){
	switch(Math.round(Math.random() * 7)){
		case 0: return "N";
		case 1: return "NE";
		case 2: return "E";
		case 3: return "SE";
		case 4: return "S";
		case 5: return "SW";
		case 6: return "W";
		case 7: return "NW";
		default: throw "error";
	};
};

function TeamAAgent() {
	this.getType = function(){
		return "TeamAAgent";
	}

	this.chooseAction = function(){
		console.log(this.getType() + ".chooseAction() -> move")
		return "move";
	}

	this.getMoveDirection = function() {
		var direction = getRandomDirection();
		console.log(this.getType() + ".getMoveDirection() -> " + direction)
		return direction;
	}

	this.newPosition = function(newPos){
		
	}

	this.newSurrounding = function(surrounding){
		console.log(this.getType() + " surrounding: " + surrounding);
	}
	
}


function TeamBAgent() {
	this.getType = function(){
		return "TeamBAgent";
	}

	this.chooseAction = function(){
		console.log(this.getType() + ".chooseAction() -> move")
		return "move";	
	}

	this.getMoveDirection = function() {
		var direction = getRandomDirection();
		console.log(this.getType() + ".getMoveDirection() -> " + direction)
		return direction;
	}

	this.newPosition = function(newPos){
		
	}

	this.newSurrounding = function(surrounding){
		
	}
}