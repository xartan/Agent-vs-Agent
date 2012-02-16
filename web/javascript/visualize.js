var visualizeGamingFieldInto = function(field, domObj) {
	console.log("visualizeGamingFieldInto called");

	var html = "";

	html += "<table>";

	var size = field.getSize();

	// the gaming field index start at the bottom left
	// while the table is created starting at the top right
	// so we need to count down the lines from the top
	for(var y = size[1]-1; y >= 0 ; y--){
		html += "<tr>";
		for(var x = 0; x < size[0]; x++){
			html += "<td>";

			var items = field.getAll([x,y]);
			//console.log(items);
			items.foreach(function(k,v){
				//console.log(v);
				html += "<div class=\""+ v.getType() +"\"></div>";
			});

			html += "</td>";
		}
		html += "</tr>";
	}
	html += "</table>";

	$(domObj).html(html);
}