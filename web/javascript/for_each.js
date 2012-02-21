// source from : http://www.naden.de/blog/javascript-foreach
Array.prototype.foreach = function( callback ) {
  for( var k=0; k<this .length; k++ ) {
    callback( k, this[ k ] );
  }
}

Object.prototype.foreach = function( callback ) {
  for( var k in this ) {
    if(this.hasOwnProperty(k)) {
     callback( k, this[ k ] );
    }
  }
}

// Array Example
// var a = [ 'a', 'b', 'c', 'd' ];
// a.foreach( function( k, v ) {
//   document.writeln( k + ' ' + v );
// });
 
// // dieser Aufruf machte im Firefox 3 aus unerfindlichen Gründen Probleme
// [ 'a', 'b', 'c', 'd' ].foreach( function( k, v ) {
//   document.writeln( k + ' ' + v );
// });
 
// // so mag es auch der Firefox 3
// ;[ 'a', 'b', 'c', 'd' ].foreach( function( k, v ) {
//   document.writeln( k + ' ' + v );
// });


// Object Example
// var o = {
//   title:'red',
//   body:'yellow'
// };
 
// o.foreach( function( k, v ) {
//   document.writeln( k + ' ' + v );
// });