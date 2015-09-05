//Begin Angular Draggable

var app = angular.module('wireframeApp', []);

app.controller('MainController', function($scope) {
  
});

app.directive('ngDraggable', function($document, $window){
  function makeDraggable(scope, element, attr) {
    var startX = 0;
    var startY = 0;

    // Start with a random pos
    var x = Math.floor((Math.random() * 500) + 40);
    var y = Math.floor((Math.random() * 360) + 40);

    element.css({
      position: 'absolute',
      cursor: 'pointer',
      top: y + 'px',
      left: x + 'px'
    });

    element.on('mousedown', function(event) {
      event.preventDefault();
      
      startX = event.pageX - x;
      startY = event.pageY - y;

      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      y = event.pageY - startY;
      x = event.pageX - startX;

      element.css({
        top: y + 'px',
        left: x + 'px'
      });
    }

    function mouseup() {
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
  }
  return {
    link: makeDraggable
  };
});

// End Angular Draggable

var flag = 0;
var element = document.getElementById('canvas');
element.addEventListener("mousedown", function(){
    flag = 0;
}, false);
element.addEventListener("mousemove", function(){
    flag = 1;
}, false);
element.addEventListener("mouseup", function(){
    if(flag === 0){
        console.log("click");
    }
    else if(flag === 1){
        console.log("drag");
        $(function() {
            var rectangle = new Rectangle('#canvas', {});

        });
    }
}, false);

var editRectangle = function(event){
  console.log(event.target);
  $(event.target).css({
    border: 'solid 2px yellow'
    })
}



// Draws Rectangle
var Rectangle = can.Control(
    {
        defaults: {
            rect: {
                minWidth: 10,
                minHeight: 10
            }
        }
    },
    {
        /**
         * Initialize
         */
        init: function() {

            // Bind event handlers
            this.element.on('mousedown.paper', $.proxy(this.startDrawRect, this));

        },

        /**
         * Start drawing a rectangle
         *
         * @param   e
         */
        startDrawRect: function(e) {

            // Get canvas offset
            var offset = this.element.offset();
            this.canvasOffsetLeft = offset.left;
            this.canvasOffsetTop = offset.top;

            // Save start positions
            this.drawStartX = e.pageX - this.canvasOffsetLeft;
            this.drawStartY = e.pageY - this.canvasOffsetTop;

            // Create the rectangle
            this.drawingRect = this.createRect(this.drawStartX, this.drawStartY, 0, 0);

            // Bind event handlers
            this.element.on('mousemove.paper', $.proxy(this.drawRect, this));
            this.element.on('mouseup.paper', $.proxy(this.endDrawRect, this));
        },

        /**
         * Draw the rectangle
         *
         * @param   e
         */
        drawRect: function(e) {

            var currentX = e.pageX - this.canvasOffsetLeft;
            var currentY = e.pageY - this.canvasOffsetTop;

            // Calculate the position and size of the rectangle we are drawing
            var position = this.calculateRectPos(this.drawStartX, this.drawStartY, currentX, currentY);

            // Set position and size
            this.drawingRect.css(position);
        },

        /**
         * Finish drawing the rectangle
         *
         * @param   e
         */
        endDrawRect: function(e) {

            var currentX = e.pageX - this.canvasOffsetLeft;
            var currentY = e.pageY - this.canvasOffsetTop;

            // Calculate the position and size of the rectangle we are drawing
            var position = this.calculateRectPos(this.drawStartX, this.drawStartY, currentX, currentY);

            if (position.width < this.options.rect.minWidth || position.height < this.options.rect.minHeight) {

                // The drawn rectangle is too small, remove it
                this.drawingRect.remove();
            }
            else {

                // Set position and size
                this.drawingRect.css(position);

                // The rectangle is big enough, select it
                this.selectRect(this.drawingRect);
            }

            // Unbind event handlers
            this.element.off('mousemove.paper');
            this.element.off('mouseup.paper');
        },

        
        /**
         * Create a rectangle
         *
         * @param   x
         * @param   y
         * @param   w
         * @param   h
         */
        createRect: function(x, y, w, h) {

            return $("<div ng-draggable class='rect' onClick='editRectangle(event)'></div>").css({
                left: x,
                top: y,
                width: w,
                height: h
            }).appendTo(this.element);

        },



        /**
         * Select the given rectangle
         *
         * @param   rect
         */
        selectRect: function(rect) {

            // Deselect the previous selected rectangle
            this.selectedRect && this.selectedRect.removeClass('selected');

            // Select the given rectangle
            this.selectedRect = rect;
            this.selectedRect.addClass('selected');
        },

        /**
         * Calculate the start position and size of the rectangle by the mouse coordinates
         *
         * @param   startX
         * @param   startY
         * @param   endX
         * @param   endY
         * @returns {*}
         */
        calculateRectPos: function(startX, startY, endX, endY) {

            var width = endX - startX;
            var height = endY - startY;
            var posX = startX;
            var posY = startY;

            if (width < 0) {
                width = Math.abs(width);
                posX -= width;
            }

            if (height < 0) {
                height = Math.abs(height);
                posY -= height;
            }

            return {
                left: posX,
                top: posY,
                width: width,
                height: height
            };
        }
    }
);

