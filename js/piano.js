/*
 * Some of this code was copied from http://mrcoles.com/piano/
 * Some portions are copyright (c) 2013 - Peter Coles (mrcoles.com)
 * Licensed under the MIT license.
 */

(function() {

  window.piano = {};
  var exports = window.piano;
  var notesOffset = 0;

  var blackKeys = {
    1: 1,
    3: 3,
    6: 1,
    8: 2,
    10: 3
  };

  $.each(blackKeys, function(k, v) {
    blackKeys[k] = ' black black'+v;;
  });

  function blackKeyClass(i) {
    return blackKeys[(i % 12) + (i < 0 ? 12 : 0)] || '';
  }

  var $keys = $('<div>', {'class': 'keys'}).appendTo('#piano');
  var buildingPiano = false;

  function buildPiano() {
    if (buildingPiano) {
      return;
    }
    buildingPiano = true;

    $keys.trigger('build-start.piano');
    $keys.empty().off('.play');

    function addKey(i) {

      $keys.on('note-'+i+'.play', function(evt) {
        var $k = $keys.find('[data-key='+i+']');
        var deselected = $k.hasClass('pressed');
        $k.toggleClass('pressed');

        $keys.trigger('played-note.piano', [i, $k]);
        if (deselected) {
          $keys.trigger('note-deselected.piano', [i, $k]);
        } else {
          $keys.trigger('note-selected.piano', [i, $k]);
        }
      });

      var $key = $('<div>', {
        'class': 'key' + blackKeyClass(i),
        'data-key': i,
        mousedown: function(evt) {
          $keys.trigger('note-'+i+'.play');
        }
      }).appendTo($keys);
    }

    var i = -12;
    var max = 14;

    (function go() {
      addKey(i + notesOffset);
      if (++i < max) {
        window.setTimeout(go, 0);
      } else {
        buildingPiano = false;
        $keys.trigger('build-done.piano');
      }
    })();
  }

  buildPiano();

  var noteNames = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'Eb',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'Ab',
    9: 'A',
    10: 'Bb',
    11: 'B',
    12: 'C',
  };

  exports.noteName = function(noteNum) {
    // Keep shifting until the note is in the 0-12 range so we can return its name.
    // There is probably a way better way to do this with math.
    var shift;
    if (noteNum < 0) {
      shift = function(num) {
        return num + 12;
      }
    } else {
      shift = function(num) {
        return num - 12;
      }
    }

    var name;
    while (true) {
      name = noteNames[noteNum];
      if (typeof name !== 'undefined') {
        return name;
      }
      noteNum = shift(noteNum);
    }
  };

})();
