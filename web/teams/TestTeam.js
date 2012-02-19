

function TeamAAgent() {
	this.getType = function(){
		return "TeamAAgent";
	}

	this.chooseAction = function(){
		console.log(this.getType() + ".chooseAction() -> move")
		return "move";
	}

	this.getMoveDirection = function() {
		console.log(this.getType() + ".getMoveDirection() -> N")
		return "N";
	}

	this.newPosition = function(newPos){
		
	}
	
}


function TeamBAgent() {
	this.getType = function(){
		return "TeamBAgent";
	}

	this.chooseAction = function(){
		console.log(this.getType() + ".chooseAction() -> skip")
		return "skip";	
	}

	this.getMoveDirection = function() {
		console.log(this.getType() + ".getMoveDirection() -> S")
		return "S";
	}
}