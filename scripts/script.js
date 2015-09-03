$(document).ready(function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");


    $('#addRectangle').on('click', function(){
    	console.log('btn clicked');
    	$('canvas').drawRect({
    	  layer: true,
    	  fillStyle: 'red',
    	  x: 100, y: 100,
    	  width: 100, height: 50,
    	  draggable: true,
    	  // Define handle properties
    	   handle: {
    	     type: 'arc',
    	     fillStyle: '#fff',
    	     strokeStyle: '#c33',
    	     strokeWidth: 2,
    	     radius: 3
    	   },
		  handlestart: function(layer) {
		    // code to run when resizing starts
		  },
		  handlemove: function(layer) {
		    // code to run while resizing
		  },
		  handlestop: function(layer) {
		    // code to run while resizing stops
		  }	
    	});
    })


});