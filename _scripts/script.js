var audio;
var debugMode = true;
var countOfClicksInHallway = 0;
var visitedCellInQueenTwo = false;

var hideAndShow = function(wrapperToHide, wrapperToShow) {
  wrapperToHide.removeClass('shown');
  wrapperToShow.addClass('shown');

  if (wrapperToHide.parent()[0].id !== wrapperToShow.parent()[0].id) {
    audio.pause();
  }

  if ((wrapperToShow.parent()[0].id === 'alice') && (wrapperToHide.parent()[0].id !== 'alice')) {
    audio = new Audio('_sounds/fireplace.m4a');
    audio.play();
  }

  if (wrapperToShow.id === 'rabbit-16') {
    // Reset the background position for rabbit-16 falling scene,
    $('#rabbit-16').css('background-position-y', '0px');
  }

  if (wrapperToShow[0].id === 'cheshire-1') {
    audio = new Audio('_sounds/cheshire-hitting.mp3');
    audio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-1') {
    audio = new Audio('_sounds/rabbit-dragging.mp3');
    audio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-10') {
    audio = new Audio('_sounds/rabbit-dragging-soft.mp3');
    audio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-11') {
    audio = new Audio('_sounds/rabbit-dragging-super-soft.mp3');
    audio.play();
  }
  
};

$(document).ready(function() {
  audio = new Audio('_sounds/alice-fireplace.m4a');
  audio.play();

  $('.panel-wrapper').click(function() {
    // Panel shall only be clickable if there isnt any explicit choices in it
    // So we first check whether there are any explicit choices
    var currentPanelWrapper = $(this);

    // In some cases, some panel transition doesnt occur sequentially, and a direct link is applied to it
    // so that on click, it jumps to the direct link as specified in the data-value attribute of the div
    var directLink = currentPanelWrapper.data('value');
    if (directLink != null) { //Check if panel is directly linked into another panel
      if (debugMode) {
        location.hash = directLink;
      } else {
        var nextPanelWrapper = $('#' + directLink);
        hideAndShow(currentPanelWrapper, nextPanelWrapper);
      }
    } else if ((!currentPanelWrapper.hasClass('contains-choices')) && (!currentPanelWrapper.hasClass('no-click'))) {
      var currentChapter = currentPanelWrapper.parent();

      // Check if it is NOT the last panel in the chapter
      if (currentPanelWrapper.next('.panel-wrapper').length > 0) {
        var nextPanelWrapper = currentPanelWrapper.next('.panel-wrapper');

        if (debugMode) {
          location.hash = nextPanelWrapper.attr('id');
        } else {
          hideAndShow(currentPanelWrapper, nextPanelWrapper);
        }
      } else { 
        // If it is the last panel in the chapter
        // alert("end of chapter!");
        // Find the next panel in the next chapter
        // First check if the current chapter is NOT the last chapter
        if (currentChapter.next('.chapter-wrapper').length > 0) {
          var nextChapter = currentChapter.next('.chapter-wrapper');
          var nextPanelWrapper = nextChapter.children('.panel-wrapper').first();

          if (debugMode) {
            location.hash = nextPanelWrapper.attr('id');
          } else {
            hideAndShow(currentPanelWrapper, nextPanelWrapper);
          }
        } else { // If it is the last chapter and last panel, we can end the story
          // alert("End of story!");
        }
      }
    }
  });

  $('.choice').click(function() {
    var currentPanelWrapper = $(this).parent();
    var panelIdOfLink = $(this).data('value');

    var nextPanelWrapper = $("#" + panelIdOfLink);

    if (debugMode) {
      location.hash = panelIdOfLink;
    } else {
      hideAndShow(currentPanelWrapper, nextPanelWrapper);
    }
  });

  // HALLWAY 4 SCENE CHOICES SCRIPT //
  $('#hallway-1-choice-4').click(function() {
    if (countOfClicksInHallway > 4) {
      $(this).data('value','hallway-3');
    }

    if ($(this).attr('id') == "hallway-1-choice-4") {
      countOfClicksInHallway++;
    }
  });

  $('#hallway-4-choice-1').mouseover(function() {
    var panelWrapper = $(this).parent();
    var image = panelWrapper.find('img');

    image.attr('src', '_images/hallway/hallway-4-1.png');
  });

  $('#hallway-4-choice-1').mouseleave(function() {
    var panelWrapper = $(this).parent();
    var image = panelWrapper.find('img');

    image.attr('src', '_images/hallway/hallway-4.png');
  });

  $('#hallway-4-choice-2').mouseover(function() {
    var panelWrapper = $(this).parent();
    var image = panelWrapper.find('img');

    image.attr('src', '_images/hallway/hallway-4-2.png');
  });

  $('#hallway-4-choice-2').mouseleave(function() {
    var panelWrapper = $(this).parent();
    var image = panelWrapper.find('img');

    image.attr('src', '_images/hallway/hallway-4.png');
  });


  // END OF HALLWAY 4 SCENE CHOICES SCRIPT //
  $('#rabbit-16').bind('mousewheel DOMMouseScroll', function(event) {
    var deltaY = -(event.originalEvent.deltaY * event.deltaFactor / 16);
    if (deltaY < 0) {
      var currentY = parseInt($('#rabbit-16').css('background-position-y'));
      if (currentY > -600) {
        $('#rabbit-16').css('background-position-y', (currentY + deltaY / 3) + 'px');
      } else if (currentY > -2000) {
        $('#rabbit-16').css('background-position-y', (currentY + deltaY / 2) + 'px');
      } else if (currentY > -6000) {
        $('#rabbit-16').css('background-position-y', (currentY + deltaY) + 'px');
      } else if (currentY > -15000) {
        $('#rabbit-16').css('background-position-y', (currentY + deltaY * 3) + 'px');
      } else if (currentY > -50000) {
        $('#rabbit-16').css('background-position-y', (currentY + deltaY * 5) + 'px');
      } else {
        hideAndShow($('#rabbit-16'), $('#cheshire-1'));
      }
    }
  });

  //////////////////////////////////////////////////////////


  $('.queen-cell-area').click(function(event) {
    event.stopImmediatePropagation();

    var panelWrapper = $(this).parent();
    panelWrapper.removeClass('contains-choices');

    panelWrapper.attr("data-value", "queen-4");
  });

  $('.on-hover').mouseover(function() {
    var chapterWrapper = $(this).parent().parent();
    var rolloverImageURL = '_images/' + chapterWrapper.attr('id') + '/' + $(this).attr('id') + "-rollover.png";
    $(this).find('img').attr('src', rolloverImageURL);
  });

  $('.on-hover').mouseleave(function() {
    var chapterWrapper = $(this).parent().parent();
    var imageURL = '_images/' + chapterWrapper.attr('id') + '/' + $(this).attr('id') + ".png";
    $(this).find('img').attr('src', imageURL);
  });

  if (debugMode) {
    window.onload = changePageBasedOnLocationHash();

    window.onhashchange = changePageBasedOnLocationHash;

    function changePageBasedOnLocationHash() {
      var jumpToId = location.hash;
      // var jumpToId =  rawHashValue.substring(1);
      if (jumpToId == '') {
        jumpToId = "#alice-1";
      }

      $('.panel-wrapper').each(function() {
        $(this).removeClass('shown');
      });

      $(jumpToId).addClass('shown');
    }
  }
});