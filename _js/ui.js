var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.ui = (function($) {
  var ui = {
    BUBBLE_DIMS: 44,
    ROW_HEIGHT : 40,
    init: function() {
      
    },
    hideDialog: function() {
      $(".dialog").fadeOut(300);
    },
    getMouseCoords: function(e) {
      return {x: e.pageX, y: e.pageY};
    },
    getBubbleCoords: function(bubble) {
      var bubbleCords = bubble.position();
      bubbleCords.left += ui.BUBBLE_DIMS/2;
      bubbleCords.top += ui.BUBBLE_DIMS/2;
      return bubbleCords;
    },
    getBubbleAngle:function(bubble, e) {
      var mouseCoords = ui.getMouseCoords(e);
      var bubbleCoords = ui.getBubbleCoords(bubble);
      var gameCoords = $("#game").position();
      var boardLeft = parseInt($("#board").css("left"));
      var angle = Math.atan((mouseCoords.x - bubbleCoords.left - boardLeft)
        / (bubbleCoords.top + gameCoords.top - mouseCoords.y));
        if(mouseCoords.y > bubbleCoords.top + gameCoords.top){
          angle += Math.PI;
        }
        return angle;
    },
    fireBubble: function(bubble, coords, duration) {
      bubble.getSprite().animate({
        left: coords.x - ui.BUBBLE_DIMS/2,
        top: coords.y - ui.BUBBLE_DIMS/2
      },
      {
        duration : duration,
        easing : "linear",
        complete: function () {
          if (bubble.getRow() !== null) {
            bubble.getSprite().css({
              left: bubble.getCoords().left - ui.BUBBLE_DIMS/2,
              top: bubble.getCoords().top - ui.BUBBLE_DIMS/2
            }); 
          };
        }
      });
      // $("#game").unbind("click");
    },
    drawBoard: function(board) {
      var rows = board.getRows();
      var gameArea = $("#board");
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        for (var j = 0; j < row.length; j++) {
          var bubble = row[j];
          if (bubble) {
            var sprite = bubble.getSprite();
            gameArea.append(sprite);
            var left = j * ui.BUBBLE_DIMS/2;
            var top = i * ui.ROW_HEIGHT;
            sprite.css({
              left: left,
              top: top
            });
          }
        }
      }
    },
    drawBubblesRemaining: function(numBubbles) {
      $("#bubbles_remaining").text(numBubbles);
    }
  };
  return ui;
})(jQuery);