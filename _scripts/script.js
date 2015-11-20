var sound = {};
var debugMode = false;
var countOfClicksInHallway = 0;
var visitedCellInQueenTwo = false;
var haveGear = false;
var haveSecondHand = false;
var haveKey = false;
var sequenceIndexObject = {};
var containChoicesObject = {};

var hideAndShow = function(wrapperToHide, wrapperToShow) {
  wrapperToHide.removeClass('shown');
  wrapperToShow.addClass('shown');

  // if (wrapperToHide.parent()[0].id !== wrapperToShow.parent()[0].id) {
  //   sound.audio.pause();
  // }

  // if ((wrapperToShow.parent()[0].id === 'alice') && (wrapperToHide.parent()[0].id !== 'alice')) {
  //   sound.audio = new Audio('_sounds/fireplace.m4a');
  //   sound.audio.play();
  // }

  if (wrapperToShow[0].id === 'alice-3') {
    sound.fireAudio.pause();
    sound.forestAudio = new Audio('_sounds/forest.m4a');
    sound.forestAudio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-16') {
    // Reset the background position for rabbit-16 falling scene,
    $('#rabbit-16').css('background-position-y', '0px');
  }

  if (wrapperToShow[0].id === 'hallway-6-1') {
    $('#hallway-6-1-alice').css('transform', '');
    $('#hallway-6-1-alice').css('-webkit-transform', '');
    $('#hallway-6-1-alice').css('-ms-transform', '');
  }

  if (wrapperToShow[0].id === 'morpheus-8-1') {
    $('#morpheus-8-1-alice').css('transform', '');
    $('#morpheus-8-1-alice').css('-webkit-transform', '');
    $('#morpheus-8-1-alice').css('-ms-transform', '');
  }

  if (wrapperToShow[0].id === 'party-10') {
    $('#party-10-alice').css('transform', '');
    $('#party-10-alice').css('-webkit-transform', '');
    $('#party-10-alice').css('-ms-transform', '');
  }

  if (wrapperToShow[0].id === 'cheshire-1') {
    sound.windAudio.pause();

    sound.audio = new Audio('_sounds/cheshire-hitting.mp3');
    sound.audio.play();

    setTimeout(function() {
      sound.cheshireAudio = new Audio('_sounds/cheshire.m4a');
      sound.cheshireAudio.play();
    }, 200);
  }

  if (wrapperToShow[0].id === 'cheshire-12') {
    sound.cheshireAudio.pause();
  }

  if (wrapperToShow[0].id === 'alice-2') {
    sound.fireAudio = new Audio('_sounds/alice-fireplace.m4a');
    sound.fireAudio.play();
  }

  if (wrapperToShow[0].id === 'hallway-1') {
    sound.forestAudio.pause();

    sound.hallwayAudio = new Audio('_sounds/hallway.m4a');
    sound.hallwayAudio.play();
  }

  // if (wrapperToShow[0].id === 'hallway-5') {
  //   sound.audio = new Audio('_sounds/drink.mp3');
  //   sound.audio.play();
  // }

  // if ((wrapperToShow[0].id === 'hallway-7')) {
  //   sound.audio = new Audio('_sounds/eat.wav');
  //   sound.audio.play();
  // }

  if (wrapperToShow[0].id === 'hallway-10') {
    sound.hallwayAudio.pause();

    sound.forestAudio = new Audio('_sounds/forest.m4a');
    sound.forestAudio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-1') {
    sound.audio = new Audio('_sounds/rabbit-dragging.mp3');
    sound.audio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-2') {
    sound.audio = new Audio('_sounds/break.wav');
    sound.audio.play();
  }  

  if (wrapperToShow[0].id === 'rabbit-10') {
    sound.audio = new Audio('_sounds/rabbit-dragging-soft.mp3');
    sound.audio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-11') {
    sound.audio = new Audio('_sounds/rabbit-dragging-super-soft.mp3');
    sound.audio.play();
  }

  if (wrapperToShow[0].id === 'rabbit-16') {
    sound.forestAudio.pause();

    sound.windAudio = new Audio('_sounds/wind.mp3');
    sound.windAudio.play();
  }

  if (wrapperToShow[0].id === 'party-10') {
    sound.partyAudio.pause();

    sound.audio = new Audio('_sounds/transport.wav');
    sound.audio.play();
  }

  if (wrapperToShow[0].id === 'party-1') {
    sound.cheshireAudio.pause();

    sound.partyAudio = new Audio('_sounds/tea.m4a');
    sound.partyAudio.play();
  }

  if (wrapperToShow[0].id === 'queen-1') {
    setTimeout(function() {
      sound.audio = new Audio('_sounds/queen-ambient.mp3');
      sound.audio.play();
    }, 500);
  }

  if (wrapperToShow[0].id === 'queen-6') {
    sound.audio.pause();
    sound.audio = new Audio('_sounds/queen-6.mp3');
    sound.audio.play();
  }
  
};

var resetPanel = function (panel) {
  var panelId = panel.attr('id');
  if (sequenceIndexObject[panelId]) {
    sequenceIndexObject[panelId] = 0;
  }

  // Add back class contain choices that were removed
  if (containChoicesObject[panelId]) {
    panel.addClass('contains-choices');
  }

  panel.removeClass('battle-start');

  panel.find('*').each(function() {
    $(this).removeClass('shown');
    $(this).removeClass('enabled');
    $(this).removeClass('battle-start');
  })
} 

var transitToNextPanel = function(currentPanelWrapper) {
  // In some cases, some panel transition doesnt occur sequentially, and a direct link is applied to it
  // so that on click, it jumps to the direct link as specified in the data-value attribute of the div
  var directLink = currentPanelWrapper.data('value');
      if (directLink != null) { //Check if panel is directly linked into another panel
          if (directLink == "party-11") {
            $('#key').removeClass('obtained');
            $('#second').removeClass('obtained');
            $('#gear').removeClass('obtained');
          }
        if (!currentPanelWrapper.hasClass('contains-choices')) {
          if (debugMode) {
            location.hash = directLink;
          } else {
            var nextPanelWrapper = $('#' + directLink);
            hideAndShow(currentPanelWrapper, nextPanelWrapper);
          }
          resetPanel(currentPanelWrapper);
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
          resetPanel(currentPanelWrapper);
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
            resetPanel(currentPanelWrapper);
          } else { // If it is the last chapter and last panel, we can end the story
            // alert("End of story!");
          }
        }
      }
}

$(document).ready(function() {

  $('.panel-wrapper').click(function() {
    // Panel shall only be clickable if there isnt any explicit choices in it
    // So we first check whether there are any explicit choices
    var currentPanelWrapper = $(this);
    var speechBubbleWrapper = currentPanelWrapper.find('.speech-bubble-wrapper');
    if (speechBubbleWrapper.length == 1 && !speechBubbleWrapper.hasClass('shown')) {
      speechBubbleWrapper.addClass('shown');
    } else {
      if (currentPanelWrapper.attr('id') == "party-6") {
        if (haveGear && haveKey && haveSecondHand) {
          currentPanelWrapper.data('value', 'party-11');
        } else {
          currentPanelWrapper.data('value', 'party-7');
        }
      }
      transitToNextPanel(currentPanelWrapper);
    }
  });

  $('.choice').click(function(e) {
    var currentPanelWrapper = $(this).parent();
    var panelIdOfLink = $(this).data('value');

    var nextPanelWrapper = $("#" + panelIdOfLink);

    if (currentPanelWrapper.attr('id')!="morpheus-6" || $(this).hasClass('enabled')) {
      if (debugMode) {
        location.hash = panelIdOfLink;
      } else {
        hideAndShow(currentPanelWrapper, nextPanelWrapper);
      }
      resetPanel(currentPanelWrapper);
      e.stopImmediatePropagation();
    }
  });

  $("#rabbit-9-gear").mouseover(function(e) {
    var image = $('#rabbit-9-panel-image');
    image.attr('src', '_images/rabbit/rabbit-9-gear.png');
  });

  $("#rabbit-9-gear").mouseout(function() {
    var image = $('#rabbit-9-panel-image');
    image.attr('src', '_images/rabbit/rabbit-9.png');
  });

  $("#rabbit-9-gear").click(function() {
    setTimeout(function() {
      sound.audio = new Audio('_sounds/ting.wav');
      sound.audio.play();   
    }, 10);
    
    haveGear = true;
    $('#gear').addClass('obtained');
  });

  $("#morpheus-5-second").mouseover(function(e) {
    var image = $('#morpheus-5-panel-image');
    image.attr('src', '_images/morpheus/morpheus-5-second.png');
  });

  $("#morpheus-5-second").mouseout(function() {
    var image = $('#morpheus-5-panel-image');
    image.attr('src', '_images/morpheus/morpheus-5.png');
  });

  $("#morpheus-5-second").click(function() {
    setTimeout(function() {
      sound.audio = new Audio('_sounds/ting.wav');
      sound.audio.play();   
    }, 10);

    haveSecondHand = true;
    $('#second').addClass('obtained');
  });

  $("#cheshire-8-key").mouseover(function(e) {
    var image = $('#cheshire-8-panel-image');
    image.attr('src', '_images/cheshire/cheshire-8-key.png');
  });

  $("#cheshire-8-key").mouseout(function() {
    var image = $('#cheshire-8-panel-image');
    image.attr('src', '_images/cheshire/cheshire-8.png');
  });

  $("#cheshire-8-key").click(function() {
    setTimeout(function() {
      sound.audio = new Audio('_sounds/ting.wav');
      sound.audio.play();   
    }, 10);

    haveKey = true;
    $('#key').addClass('obtained');
  });
 

  $('.hallway-forward').click(function() {
    countOfClicksInHallway++;
  });

  $('.hallway-1-3').click(function() {
    var nextPanelID = "hallway-1-3";

    if (countOfClicksInHallway > 2) {
      nextPanelID = "hallway-3";

      // reset this bitch
      countOfClicksInHallway = 0;
    }

    if (debugMode) {
      location.hash = nextPanelID;
    } else {
      var currentPanelWrapper = $(this).parent().parent();
      var nextPanelWrapper = $('#' + nextPanelID);
      hideAndShow(currentPanelWrapper, nextPanelWrapper);
    }
  });

  $('.hallway-1-4').click(function() {
    if (debugMode) {
      location.hash = "hallway-1-4";
    } else {
      var currentPanelWrapper = $(this).parent().parent();
      var nextPanelWrapper = $('#hallway-1-4');
      hideAndShow(currentPanelWrapper, nextPanelWrapper);
    }
  });

  $('.hallway-2').click(function() {
    if (debugMode) {
      location.hash = "hallway-2";
    } else {
      var currentPanelWrapper = $(this).parent().parent();
      var nextPanelWrapper = $('#hallway-2');
      hideAndShow(currentPanelWrapper, nextPanelWrapper);
    }
  });

  $('.hallway-2-2').click(function() {
    var nextPanelID = "hallway-2-2";

    if (countOfClicksInHallway > 2) {
      nextPanelID = "hallway-3";
    }

    if (debugMode) {
      location.hash = nextPanelID;
    } else {
      var currentPanelWrapper = $(this).parent().parent();
      var nextPanelWrapper = $('#' + nextPanelID);
      hideAndShow(currentPanelWrapper, nextPanelWrapper);
    }
  });

  if($('#hallway-1-map')) {
    $('#hallway-1-map area').each(function() {
      $(this).mouseover(function(e) {
        e.stopImmediatePropagation();
        var id = $(this).attr('id');
        $('#'+id+'-arrow').addClass('shown');
      });

      $(this).mouseout(function() {
          var id = $(this).attr('id');
          $('#'+id+'-arrow').removeClass('shown');
      });
    });
  }

  if($('#hallway-2-map')) {
    $('#hallway-2-map area').each(function() {
      $(this).mouseover(function(e) {
        e.stopImmediatePropagation();
        var id = $(this).attr('id');
        $('#'+id+'-arrow').addClass('shown');
      });

      $(this).mouseout(function() {
          var id = $(this).attr('id');
          $('#'+id+'-arrow').removeClass('shown');
      });
    });
  }

  if($('#hallway-2-2-map')) {
    $('#hallway-2-2-map area').each(function() {
      $(this).mouseover(function(e) {
        e.stopImmediatePropagation();
        var id = $(this).attr('id');
        $('#'+id+'-arrow').addClass('shown');
      });

      $(this).mouseout(function() {
          var id = $(this).attr('id');
          $('#'+id+'-arrow').removeClass('shown');
      });
    });
  }

  if($('#hallway-1-3-map')) {
    $('#hallway-1-3-map area').each(function() {
      $(this).mouseover(function(e) {
        e.stopImmediatePropagation();
        var id = $(this).attr('id');
        $('#'+id+'-arrow').addClass('shown');
      });

      $(this).mouseout(function() {
          var id = $(this).attr('id');
          $('#'+id+'-arrow').removeClass('shown');
      });
    });
  }

  if($('#hallway-1-4-map')) {
    $('#hallway-1-4-map area').each(function() {
      $(this).mouseover(function(e) {
        e.stopImmediatePropagation();
        var id = $(this).attr('id');
        $('#'+id+'-arrow').addClass('shown');
      });

      $(this).mouseout(function() {
          var id = $(this).attr('id');
          $('#'+id+'-arrow').removeClass('shown');
      });
    });
  }

  $('.hallway-arrow').mouseover(function(e) {
    e.preventDefault();

    e = e.originalEvent;
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
    event.preventDefault();

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

  var rotateTrackerHallway = 0;
  $('#hallway-6-1').bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var deltaY = -(event.originalEvent.deltaY * event.deltaFactor / 16);
    if (deltaY < 0) {
      rotateTrackerHallway += deltaY;
      if (rotateTrackerHallway > -5000) {
        $('#hallway-6-1-alice').css('transform', 'rotate(' + parseInt(-rotateTrackerHallway / 5) + 'deg) scale(' + (1 - rotateTrackerHallway / (-5000)) + ')');
        $('#hallway-6-1-alice').css('-webkit-transform', 'rotate(' + parseInt(-rotateTrackerHallway / 5) + 'deg) scale(' + (1 - rotateTrackerHallway / (-5000)) + ')');
        $('#hallway-6-1-alice').css('-ms-transform', 'rotate(' + parseInt(-rotateTrackerHallway / 5) + 'deg) scale(' + (1 - rotateTrackerHallway / (-5000)) + ')');
      } else {
        hideAndShow($('#hallway-6-1'), $('#party-1'));
        rotateTrackerHallway = 0;
      }
    }
  });

  var rotateTrackerMorpheus = 0;
  $('#morpheus-8-1').bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var deltaY = -(event.originalEvent.deltaY * event.deltaFactor / 16);
    if (deltaY < 0) {
      rotateTrackerMorpheus += deltaY;
      if (rotateTrackerMorpheus > -5000) {
        $('#morpheus-8-1-alice').css('transform', 'rotate(' + parseInt(-rotateTrackerMorpheus / 5) + 'deg) scale(' + (1 - rotateTrackerMorpheus / (-5000)) + ')');
        $('#morpheus-8-1-alice').css('-webkit-transform', 'rotate(' + parseInt(-rotateTrackerMorpheus / 5) + 'deg) scale(' + (1 - rotateTrackerMorpheus / (-5000)) + ')');
        $('#morpheus-8-1-alice').css('-ms-transform', 'rotate(' + parseInt(-rotateTrackerMorpheus / 5) + 'deg) scale(' + (1 - rotateTrackerMorpheus / (-5000)) + ')');
      } else {
        hideAndShow($('#morpheus-8-1'), $('#party-1'));
        setTimeout(function() {
          rotateTrackerMorpheus = 0;
        }, 10);
      }
    }
  });

  var rotateTrackerParty = 0;
  $('#party-10').bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var deltaY = -(event.originalEvent.deltaY * event.deltaFactor / 16);
    if (deltaY < 0) {
      rotateTrackerParty += deltaY;
      if (rotateTrackerParty > -5000) {
        $('#party-10-alice').css('transform', 'rotate(' + parseInt(-rotateTrackerParty / 5) + 'deg) scale(' + (1 - rotateTrackerParty / (-5000)) + ')');
        $('#party-10-alice').css('-webkit-transform', 'rotate(' + parseInt(-rotateTrackerParty / 5) + 'deg) scale(' + (1 - rotateTrackerParty / (-5000)) + ')');
        $('#party-10-alice').css('-ms-transform', 'rotate(' + parseInt(-rotateTrackerParty / 5) + 'deg) scale(' + (1 - rotateTrackerParty / (-5000)) + ')');
      } else {
        hideAndShow($('#party-10'), $('#cheshire-12'));
        rotateTrackerParty = 0;
      }
    }
  });

  //////////////////////////////////////////////////////////

  sequenceIndexObject['cheshire-9'] = 0;
  $('#cheshire-9').click(function() {
    if (sequenceIndexObject['cheshire-9'] == 0) {
      $('#cheshire-9-speech-1').addClass('shown');
      sequenceIndexObject['cheshire-9']++;
    } else if (sequenceIndexObject['cheshire-9'] == 1) {
      $('#cheshire-9-speech-1').removeClass('shown');
      $('#cheshire-9-speech-2').addClass('shown');
      sequenceIndexObject['cheshire-9']++;
    } else if (sequenceIndexObject['cheshire-9'] == 2) {
      $('#cheshire-9-speech-2').removeClass('shown');
      $(this).find('.choice').each(function() {
        $(this).addClass('shown');
        
      });
    }
  });

  sequenceIndexObject['morpheus-4'] = 0;
  $('#morpheus-4').click(function() {
    if (sequenceIndexObject['morpheus-4'] == 0) {
      $('#morpheus-4-speech-1').addClass('shown');
      ++sequenceIndexObject['morpheus-4'];
    } else if (sequenceIndexObject['morpheus-4'] == 1) {
      $('#morpheus-4-speech-1').removeClass('shown');
      $('#morpheus-4-speech-2').addClass('shown');
      ++sequenceIndexObject['morpheus-4'];
    } else if (sequenceIndexObject['morpheus-4'] == 2) {
      // $('#morpheus-4-speech-2').removeClass('shown');
      $(this).removeClass('contains-choices');
      containChoicesObject['morpheus-4'] = true;
      transitToNextPanel($(this));
    }
  });

  sequenceIndexObject['morpheus-6'] = 0;
  $('#morpheus-6').click(function() {
    if (sequenceIndexObject['morpheus-6'] == 0) {
      $('#morpheus-6-speech-1').addClass('shown');
      ++sequenceIndexObject['morpheus-6'];
    } else if (sequenceIndexObject['morpheus-6'] == 1) {
      $('#morpheus-6-speech-1').removeClass('shown');
      $('#morpheus-6-speech-2').addClass('shown');
      ++sequenceIndexObject['morpheus-6'];
    } else if (sequenceIndexObject['morpheus-6'] == 2) {
      $('#morpheus-6-speech-2').removeClass('shown');
      $(this).find('.choice').each(function() {
        $(this).addClass('enabled');
      });
    }  
  });

  sequenceIndexObject['party-1'] = 0;
  $('#party-1').click(function() {
    if (sequenceIndexObject['party-1'] == 0) {
      $('#party-1-speech-1').addClass('shown');
      ++sequenceIndexObject['party-1'];
    } else if (sequenceIndexObject['party-1'] == 1) {
      $('#party-1-speech-1').removeClass('shown');
      $('#party-1-speech-2').addClass('shown');
      ++sequenceIndexObject['party-1'];
    } else if (sequenceIndexObject['party-1'] == 2) {
      // $('#party-1-speech-2').removeClass('shown');
      $(this).removeClass('contains-choices');
      containChoicesObject['party-1'] = true;
      transitToNextPanel($(this));
    }  
  });

  sequenceIndexObject['party-5'] = 0;
  $('#party-5').click(function() {
    if (sequenceIndexObject['party-5'] == 0) {
      $('#party-5-speech-1').addClass('shown');
      ++sequenceIndexObject['party-5'];
    } else if (sequenceIndexObject['party-5'] == 1) {
      $('#party-5-speech-1').removeClass('shown');
      $('#party-5-speech-2').addClass('shown');
      ++sequenceIndexObject['party-5'];
    } else if (sequenceIndexObject['party-5'] == 2) {
      // $('#party-5-speech-2').removeClass('shown');
      $(this).removeClass('contains-choices');
      containChoicesObject['party-5'] = true;
      transitToNextPanel($(this));
    }  
  });

  sequenceIndexObject['party-9'] = 0;
  $('#party-9').click(function() {
    if (sequenceIndexObject['party-9'] == 0) {
      $('#party-9-speech-1').addClass('shown');
      ++sequenceIndexObject['party-9']; 
    } else if (sequenceIndexObject['party-9'] == 1) {
      $('#party-9-speech-1').removeClass('shown');
      $('#party-9-speech-2').addClass('shown');
      ++sequenceIndexObject['party-9']; 
    } else if (sequenceIndexObject['party-9'] == 2) {
      // $('#party-9-speech-2').removeClass('shown');
      $(this).removeClass('contains-choices');
      containChoicesObject['party-9'] = true;
      transitToNextPanel($(this));
    } 
  });


  sequenceIndexObject['queen-3'] = 0;
  $('#queen-3').click(function() {
    if (sequenceIndexObject['queen-3'] === 0){
      $('#queen-3-speech-1').addClass('shown');
      sequenceIndexObject['queen-3']++;
    } else if (sequenceIndexObject['queen-3'] === 1) {
      $('#queen-3-speech-1').removeClass('shown');
      $('#queen-3-queen-bubble').addClass('shown');
      sequenceIndexObject['queen-3']++;
    } else if (sequenceIndexObject['queen-3'] === 2) {
      $(this).removeClass('contains-choices');
      containChoicesObject['queen-3'] = true;
      $(this).attr("data-value", "queen-4");
      transitToNextPanel($(this));
    }
  });

  sequenceIndexObject['queen-4'] = 0;
  $('#queen-4').click(function() {
    if (sequenceIndexObject['queen-4'] === 0){
      $('#queen-4-speech-1').addClass('shown');
      sequenceIndexObject['queen-4']++;
    } else if (sequenceIndexObject['queen-4'] === 1) {
      setTimeout(function() {
        sound.audio.pause();
        
        sound.audio = new Audio('_sounds/pokemon.mp3');
        sound.audio.play();
      }, 10);

      $('#queen-4-speech-1').removeClass('shown');
      $(this).addClass('battle-start');
      $('.pokemon-overlay').addClass('battle-start');

      setTimeout(function() {
        $('.dark-overlay').addClass('battle-start');
      }, 500);

      setTimeout(function() {
        $('#queen-4').removeClass('contains-choices');
        containChoicesObject['queen-4'] = true;
        transitToNextPanel($('#queen-4'));
      }, 2000);
      sequenceIndexObject['queen-4']++;
    }
  });

  sequenceIndexObject['queen-9'] = 0;
  $('#queen-9').click(function() {
    if (sequenceIndexObject['queen-9'] == 0) {
      $('#queen-9-speech-1').addClass('shown');
      sequenceIndexObject['queen-9']++;
    } else if (sequenceIndexObject['queen-9'] == 1) {
      $('#queen-9-speech-1').removeClass('shown');
      $(this).find('.choice').each(function() {
        $(this).addClass('shown');  
      });
    }
  });

  sequenceIndexObject['queen-11'] = 0;
  $('#queen-11').click(function() {
    if (sequenceIndexObject['queen-11'] === 0){
      $('#queen-11-speech-1').addClass('shown');
      sequenceIndexObject['queen-11']++;
    } else if (sequenceIndexObject['queen-11'] === 1) {
      $('#queen-11-speech-1').removeClass('shown');
      $('#queen-11-speech-2').addClass('shown');
      sequenceIndexObject['queen-11']++;
    } else if (sequenceIndexObject['queen-11'] === 2) {
      $(this).removeClass('contains-choices');
      containChoicesObject['queen-11'] = true;
      transitToNextPanel($(this));
    }
  });
  $('.queen-cell-area').click(function(event) {
    event.stopImmediatePropagation();
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

  $('#queen-14').click(function () {
    $(this).find('#queen-14-dark-overlay').show();
  }); 

  $('#queen-19').click(function () {
    $(this).find('#queen-19-dark-overlay').show();
  }); 

  $('.replay').click(function() {
    window.location.replace("./index.html");
  });
});