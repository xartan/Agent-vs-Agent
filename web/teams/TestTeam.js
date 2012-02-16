

function TeamAAgent() {
	this.getType = function(){
		return "TeamAAgent";
	}

	this.chooseAction = function(){
		return "move";
	}

	this.getMoveDirection = function() {
		return "N";
	}
	
}


function TeamBAgent() {
	this.getType = function(){
		return "TeamBAgent";
	}

	this.chooseAction = function(){
		return "skip";	
	}

	this.getMoveDirection = function() {
		return "S";
	}
}