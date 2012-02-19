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

	this.place = function(gamingFieldEntitie, coordinates) {
		var allreadyPresent = this.getAll(coordinates);
		allreadyPresent.push(gamingFieldEntitie);
	}

	// returns an array [width, height]
	this.getSize = function() {
		return [8,8];
	}

	// returns the position or false if the item was not found
	this.remove = function(gamingFieldEntitie){
		var size = this.getSize();

		for(var y = 0; y < size[1]; y++){
			for(var x = 0; x < size[0]; x++){
				var items = this.bases[x][y];
				var idx = items.indexOf(gamingFieldEntitie);
				if(idx === -1){
					// item not found
					return false;
				} else {
					items.splice(idx -1 , 1);
					var result = [x,y];
					console.log("GamingField.remove("+gamingFieldEntitie.getType()+") -> " + result);
					return result;
				}
			}
		}

		this.bases.foreach(function(y, row){
			row.foreach(function(x, items){
				var idx = items.indexOf(gamingFieldEntitie);
				if(idx === -1){
					// item not found
					return false;
				} else {
					items.splice(idx -1 , 1);
					var result = [x,y];
					console.log("GamingField.remove("+gamingFieldEntitie.getType()+") -> " + result);
					return result;
				}
			});
		});
	}
}