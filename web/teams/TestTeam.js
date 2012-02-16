

function TeamAAgent() {
	this.getType = function(){
		return "TeamAAgent";
	}

	this.chooseAction = function(){
		return "skip";
	}
	
}


function TeamBAgent() {
	this.getType = function(){
		return "TeamBAgent";
	}

	this.chooseAction = function(){
		return "skip";	
	}
}