(function() {
  "use strict";

  var currentLoop;
  var currentNote;
  var loops = [];


  $('#loops .elements').on('click', 'a', function() {
    currentLoop = parseInt($(this).data('loop'), 10);
    showLoop(currentLoop);
  });

  $('#notes .elements').on('click', 'a', function() {
    currentLoop = parseInt($(this).data('loop'), 10);
    currentNote = parseInt($(this).data('note'), 10);
    showChord(currentLoop, currentNote);
  });

  $(window).keydown(function(evt) {
    var keyCode = evt.keyCode;
    // left and right arrows.
    if (keyCode == 37 || keyCode == 39) {
      // TODO: find selected and toggle through all loops.
      showLoop(0);
    }
  });

  $('#piano').on('note-selected.piano', function(evt, keyNumber, keyDiv) {
    manageNote(function(notes) {
      notes.push(keyNumber);
    });
  });

  $('#piano').on('note-deselected.piano', function(evt, keyNumber, keyDiv) {
    manageNote(function(notes) {
      var index = notes.indexOf(keyNumber);
      if (index > -1) {
        notes.splice(index, 1);
      }
    });
  });


  // Startup
  $('#loops a:first').trigger('click');


  function manageNote(callback) {
    if (typeof currentLoop === 'undefined' ||
        typeof currentNote === 'undefined') {
      console.log('cannot manage note; no current loop/note');
      return;
    }

    console.log('manage note', currentNote, 'for loop', currentLoop);
    var notes = loops[currentLoop][currentNote].notes;
    callback(notes);
    updateNote(currentLoop, currentNote, notes);
  }


  function showLoop(loopId) {
    var notes = loops[loopId];
    if (!notes) {
      createLoop(loopId);
      return showLoop(loopId);
    }
    console.log('showing loop', loopId);

    var container = $('#notes .elements');
    container.empty();
    var first;

    notes.forEach(function(item, noteId) {
      var a = $(document.createElement('a'));
      a.attr('href', '#');
      a.attr('data-loop', loopId);
      a.attr('data-note', noteId);
      a.html(item.name || '&nbsp;');
      if (!first) {
        first = a;
      }
      container.append(a);
    });

    first.trigger('click');
  }


  function showChord(loopId, noteId) {
    console.log('showing chord', noteId, 'loop', loopId);
    $('#piano .keys .key').removeClass('pressed');
    var loop = loops[loopId];
    var info = loop[noteId];
    updateNote(loopId, noteId, info.notes);
    // make info.notes into pressed
    info.notes.forEach(function(note) {
      console.log('showing key', note);
      $('#piano').find('[data-key='+note+']').addClass('pressed');
    });
  }


  function updateNote(loopId, noteId, notes) {
    // Find the root note of the chord:
    var lowest;
    if (notes.length) {
      lowest = Math.min.apply({}, notes);
    } else {
      lowest = 0; // C
    }
    var root = piano.noteName(lowest);

    $('#notes .elements a' +
      '[data-loop=' + loopId + ']' +
      '[data-note=' + noteId + ']').text(root);

    console.log('showing', root, 'for loop', loopId, 'note', noteId);
  }


  function createLoop(loopId) {
    console.log('creating loop', loopId);
    loops[loopId] = [];
    var notes = ['C', false, false, false, false, false, false, false];
    notes.forEach(function(name, index) {
      loops[loopId].push({
        name: name,
        id: index,
        notes: [],
      });
    });
  }

})();
