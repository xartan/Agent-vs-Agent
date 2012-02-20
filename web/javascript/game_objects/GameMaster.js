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

	 this.moveCount = 0;

	 this.pointsDistributed = 0;
	 this.teamAScore = 0;
	 this.teamBScore = 0;

	 this.nextAgentInLine = 0;

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

	 this.baseIndexTo2dCoords = function(baseIndex) {
	 	var basesPerLine = 8;
	 	var y = Math.floor(baseIndex / basesPerLine);
	 	var x = (baseIndex % basesPerLine);
	 	return [x,y];
	 }

	 this.distributePoints = function(numberOfPoints) {
	 	this.pointsDistributed = numberOfPoints;
	 	var numberOfBases = 8*8;
	 	for(var i = 0; i < numberOfPoints; i++) {
	 		var baseIndex = Math.floor(Math.random() * numberOfBases);
	 		// baseIndex to 2d coords
	 		var coords2d = this.baseIndexTo2dCoords(baseIndex);
	 		this.gamingField.place(new Point(), coords2d);
	 	}
	 }

	 this.stepNorth = function(coords){
	 	var y = coords[1]+1;
		if(y > 7) y = 7;
		return [coords[0], y];
	 }

	 this.stepEast = function(coords){
	 	var x = coords[0]+1;
		if(x > 7) x = 7;
		return [x, coords[1]];
	 }

	 this.stepSouth = function(coords){
	 	var y = coords[1]-1;
		if(y < 0) y = 0;
		return [coords[0], y];
	 }

	 this.stepWest = function(coords){
	 	var x = coords[0]-1;
		if(x < 0) x = 0;
		return [x, coords[1]];
	 }

	this.executeMove = function(agent){
		var direction = agent.getMoveDirection().toUpperCase();

		var oldPosition = this.gamingField.remove(agent);
		if(oldPosition === false){
			console.log("Fatal ERROR: agent was not found in GamingField!!!");
			return;
		}

		var newPosition;
		switch(direction){
			case "N":
				newPosition = this.stepNorth(oldPosition);
				break;
			case "NE":
			case "EN":
				newPosition = this.stepEast(this.stepNorth(oldPosition));
				break;
			case "E":
				newPosition = this.stepEast(oldPosition);
				break;
			case "SE":
			case "ES":
				newPosition = this.stepEast(this.stepSouth(oldPosition));
				break;
			case "S":
				newPosition = this.stepSouth(oldPosition);
				break;
			case "SW":
			case "WS":
				newPosition = this.stepWest(this.stepSouth(oldPosition));
				break;
			case "W":
				newPosition = this.stepWest(oldPosition);
				break;
			case "NW":
			case "WN":
				newPosition = this.stepWest(this.stepNorth(oldPosition));
				break;

			default:
				console.log("GameMaster does not understand direction: " + direction + " from agent: " + agent);
				break;
		}

		this.gamingField.place(agent, newPosition);
		agent.newPosition(newPosition);
	}

	this.executeComunicate = function(agent){
		
	}

	this.executeCollect = function(agent){
		
	}

	this.processChoice = function(agent, choice) {
	 	switch(choice) {
	 		case "move":
	 			this.executeMove(agent);
	 			break;
 			case "comunicate":
 				this.executeComunicate(agent);
 				break;
 			case "collect":
 				this.executeCollect(agent);
 				break;
			case "skip":
 				break;
 			default:
 				console.log("GameMaster does not understand choice: " + choice + " of agent: " + agent);
	 	}
	 }

	 this.explainSurroundingsTo = function(activeAgent){
	 	var agentPosition = this.gamingField.getCoordinatesOf(activeAgent);
	 	var surrounding = this.gamingField.getSurroundingFor(agentPosition);
	 	// remove the agent from the surrounding
	 	var center = surrounding.C;
	 	if(center.length === 1){
	 		delete surrounding.C;
	 	} else {
	 		var idx = (surrounding.C).indexOf(activeAgent.getType());
		 	(surrounding.C).splice(idx, 1);
	 	}
	 	
	 	activeAgent.newSurrounding(surrounding);
	 }

	 this.getAgentId = function(agent){
	 	return this.actingOrder.indexOf(agent);
	 }

	 // returns false if the game is over
	 this.nextMove = function(){
	 	//console.log("this.teamAScore: " + this.teamAScore);
	 	//console.log("this.teamBScore: " + this.teamBScore);
	 	//console.log("this.pointsDistributed: " + this.pointsDistributed);

	 	if((this.teamAScore + this.teamBScore) < this.pointsDistributed){
	 		// there are still uncollected points
	 		console.log("GameMaster.nextMove() : next agent in line: " + this.nextAgentInLine);
	 		var activeAgent = this.actingOrder[this.nextAgentInLine];
	 		this.explainSurroundingsTo(activeAgent);
	 		var choice = activeAgent.chooseAction();
	 		this.processChoice(activeAgent, choice);
	 		this.nextAgentInLine++;
	 		this.nextAgentInLine %= this.actingOrder.length;
	 		return true;
	 	} else {
	 		// all points are collected
	 		console.log("GameMaster: all points are collected. No next move.");
	 		return false; // no next move!
	 	}
	 }

	 this.newGame = function(){
	 	this.resetGamingField();
	 	this.resetAgents(1);
	 	this.placeAgents();
	 	this.distributePoints(7);
	 	this.determinActingOrder();
	 }

}

