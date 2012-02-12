
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
	[[[], [], [], [], [], [], [], []]], // a line where each base is an empty list
	[[[], [], [], [], [], [], [], []]], 
	[[[], [], [], [], [], [], [], []]], 
	[[[], [], [], [], [], [], [], []]],
	[[[], [], [], [], [], [], [], []]], 
	[[[], [], [], [], [], [], [], []]], 
	[[[], [], [], [], [], [], [], []]], 
	[[[], [], [], [], [], [], [], []]]];

}


/*
Is THE autority when it comes to game managements.
All agent interaction is controlled by THE game master.
*/
function GameMaster() {
	 this.gamingField = 0;

	 this.createGamingField = function(){
	 	this.gamingField = new GamingField();
	 }
}