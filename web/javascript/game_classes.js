
/**
All files have 8x8 bases.
*/
function GamingField(){

	// each line contains an array of size 8
	// we have 8 lines
	// therefore we have an 8x8 dimensinal field
	// however: in each base of this 8x8 field may contain
	// a list of field entities (like points or agents)
	this.bases = [
		[[], [], [], [], [], [], [], []], // a line where each base is an empty list
		[[], [], [], [], [], [], [], []], 
		[[], [], [], [], [], [], [], []], 
		[[], [], [], [], [], [], [], []],
		[[], [], [], [], [], [], [], []], 
		[[], [], [], [], [], [], [], []], 
		[[], [], [], [], [], [], [], []], 
		[[], [], [], [], [], [], [], []]
	];

	this.getAll = function(coordinates){
		var x = coordinates[0];
		var y = coordinates[1];

		return this.bases[y][x];
	}

	this.placeAll = function(gamingFieldEntities, coordinates){
		var allreadyPresent = this.getAll(coordinates);
		for(var i = 0; i < gamingFieldEntities.length; i++){
			allreadyPresent.push(gamingFieldEntities[i]);
		}
	}

	

}


/*
Is THE autority when it comes to game managements.
All agent interaction is controlled by THE game master.
*/
function GameMaster() {
	 this.gamingField = 0;
	 this.teamAHomeBase = [0,0];
	 this.teamBHomeBase = [7,7];

	 this.teamAAgents = [];
	 this.teamBAgents = [];

	 this.actingOrder = [];

	 this.resetAgents = function(agentsPerTeam){
	 	this.teamAAgents = [];
	 	this.teamBAgents = [];

	 	for (var i = 0; i < agentsPerTeam; i++) {
	 		this.teamAAgents.push(new TeamAAgent());
	 		this.teamBAgents.push(new TeamBAgent());
	 	}
	 }


	 this.resetGamingField = function(){
	 	this.gamingField = new GamingField();
	 }

	 this.placeAgents = function(){
	 	this.gamingField.placeAll(this.teamAAgents, this.teamAHomeBase);
	 	this.gamingField.placeAll(this.teamBAgents, this.teamBHomeBase);
	 }

	 this.determinActingOrder = function(){
	 	this.actingOrder = [];
	 	if (Math.random() < 0.5) {
	 		// start with team A
	 		for (var i = 0; i < this.teamAAgents.length; i++) {
	 			this.actingOrder.push(this.teamAAgents[i]);
	 			this.actingOrder.push(this.teamBAgents[i]);
	 		};

	 	} else {
	 		// start with team B
	 		for (var i = 0; i < this.teamAAgents.length; i++) {
	 			this.actingOrder.push(this.teamBAgents[i]);
	 			this.actingOrder.push(this.teamAAgents[i]);
	 		};
		}; 
	 }

	 this.newGame = function(){
	 	this.resetGamingField();
	 	this.resetAgents(3);
	 	this.placeAgents();
	 	this.determinActingOrder();
	 }

}

