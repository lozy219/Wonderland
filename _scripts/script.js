var audio;
var debugMode = true;
var countOfClicksInHallway = 0;

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
};

$(document).ready(function() {
  audio = new Audio('_sounds/fireplace.m4a');
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

  $('.choice-button').click(function() {
    var currentPanelWrapper = $(this).parent();
    var panelIdOfLink = $(this).data('value');

    var nextPanelWrapper = $("#" + panelIdOfLink);

    if (debugMode) {
      location.hash = panelIdOfLink;
    } else {
      hideAndShow(currentPanelWrapper, nextPanelWrapper);
    }
  });

  $('.choice-cursor').click(function() {
    if (countOfClicksInHallway > 4) {
      $(this).data('value','hallway-3');
    }

    if ($(this).attr('id') == "hallway-1-choice-4") {
      countOfClicksInHallway++;
    }

    var currentPanelWrapper = $(this).parent();
    var panelIdOfLink = $(this).data('value');

    var nextPanelWrapper = $("#" + panelIdOfLink);

    if (debugMode) {
      location.hash = panelIdOfLink;
    } else {
      currentPanelWrapper.removeClass('shown');
      nextPanelWrapper.addClass('shown');
    }
  });

  // HALLWAY 4 SCENE CHOICES SCRIPT //
  $('.choice-hover').click(function() {
    var currentPanelWrapper = $(this).parent();
    var panelIdOfLink = $(this).data('value');

    var nextPanelWrapper = $("#" + panelIdOfLink);

    if (debugMode) {
      location.hash = panelIdOfLink;
    } else {
      currentPanelWrapper.removeClass('shown');
      nextPanelWrapper.addClass('shown');
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

  //////////////////////////////////////////////////////////


  $('.choice-button').mouseover(function() {
    var chapterWrapper = $(this).parent().parent();
    var rolloverImageURL = '_images/' + chapterWrapper.attr('id') + '/' + $(this).attr('id') + "-rollover.png";
    $(this).find('img').attr('src', rolloverImageURL);
  });

  $('.choice-button').mouseleave(function() {
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