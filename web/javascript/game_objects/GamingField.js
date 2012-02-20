/**
All files have 8x8 bases.
*/
function GamingField(){

	/*
	associative array
	*/
	this.bases = {};

	this.getAll = function(coordinates){
		// check if coordinates inside the fieldsize
		var size = this.getSize();
		coordinates.foreach(function(i,coord){
			if((coord < 0) || (coord >= size[i])) {
				throw ("OutsideTheField");
			}
		});

		// make sure there is a valid array behind this coordinate
		var key = this.coordinatesToKey(coordinates);
		if(!this.bases.hasOwnProperty(key)){
			this.bases[key] = [];
		}
		
		return this.bases[key];
	};

	this.coordinatesToKey = function(coordinates){
		return (coordinates[0]).toString() + "_" + (coordinates[1]).toString();
	}

	this.place = function(gamingFieldEntitie, coordinates) {
		var allreadyPresent = this.getAll(coordinates);
		allreadyPresent.push(gamingFieldEntitie);
	};

	this.placeAll = function(gamingFieldEntities, coordinates){
		var that = this;
		gamingFieldEntities.foreach(function(i, entitie){
			that.place(entitie, coordinates);
		})
	};

	// returns an array [width, height]
	this.getSize = function() {
		return [8,8];
	};

	this.relativeCoordinatesToCardinalDirection = function(relCoordinates){
		var x = relCoordinates[0];
		var y = relCoordinates[1];
		if(x == 0 && y == 0){
			return "C";
		} else {
			var direction = "";
			switch (y){
				case -1:
					direction += "S";
					break;
				case 1:
					direction += "N";
					break;
				default:
					break;
			}

			switch (x){
				case -1:
					direction += "W";
					break;
				case 1:
					direction += "E";
					break;
				default:
					break;
			}

			return direction;
		};
	};

	this.getSurroundingFor = function(coordinates){
		var surrounding = {};

		// we make a step back in each direction, hence -1
		// and do 3 steps from there in each direction
		for (var iy = -1; iy <= 1; iy++) {
			for (var ix = -1; ix <= 1; ix++) {
				// lets calculate the accual coordinates in the field
				var y = coordinates[1] + iy;
				var x = coordinates[0] + ix;

				// ok now we fetach the stuff for that field
				try {
					// it me be the case that we try to make a step outside of the field
					// especially when we are at the edge.
					// this will throw an exception, that we just ignore
					var stuff = this.getAll([x,y]);
					if(stuff.length != 0){
						// we found stuff
						var key = this.relativeCoordinatesToCardinalDirection([ix,iy]);

						// but we will only add the descriptions, so 
						// noone can mess with the other objects
						var descriptions = [];
						stuff.foreach(function(i,entitie){
							// calling toString() on the type ensures, that no one puts inteligent objects in there.
							// wen may need to check the string for a specific format too.
							descriptions.push(entitie.getType().toString());
						});

						surrounding[key] = descriptions;
					};
				} catch (e) {
					if(e !== "OutsideTheField"){
						// we only ignore out of field exceptions
						throw e;
					};
				};
			};
		};
		return surrounding;
	};

	this.getCoordinatesOf = function(entitie){
		var size = this.getSize();

		for(var y = 0; y < size[1]; y++){
			for(var x = 0; x < size[0]; x++){
				var coordinates = [x,y]
				var items = this.getAll(coordinates);
				var idx = items.indexOf(entitie);
				if(idx !== -1){
					return coordinates;
				};
			};
		};

		throw ("Can't find entitie: " + gamingFieldEntitie.toString());
	}

	// returns the position or false if the item was not found
	this.remove = function(gamingFieldEntitie){
		var size = this.getSize();
		var coordinates = this.getCoordinatesOf(gamingFieldEntitie);
		var items = this.getAll(coordinates);
		var idx = items.indexOf(gamingFieldEntitie);
		items.splice(idx, 1);
		return coordinates;
	};
}