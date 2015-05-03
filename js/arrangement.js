(function() {
  "use strict";

  var currentLoop;
  var currentNote;

  //window.localStorage.clear();
  var loops = window.localStorage.getItem('songData');
  if (loops === null) {
    loops = [];
    console.log('creating song data');
  } else {
    loops = JSON.parse(loops);
    console.log('loading song data');
  }
  saveData();


  $('#loops .elements').on('click', 'a', function() {
    currentLoop = parseInt($(this).data('loop'), 10);
    showLoop(currentLoop);
  });

  $('#notes .elements').on('click', 'a', function() {
    currentLoop = parseInt($(this).data('loop'), 10);
    currentNote = parseInt($(this).data('note'), 10);
    showChord(currentLoop, currentNote);
  });

  $('#chordmap .elements').on('click', 'a', function() {
    showMappedChord(currentLoop, currentNote, $(this).text());
  });

  $('#inversion .elements').on('click', 'a', function() {
    invert(currentLoop, currentNote, $(this).data('inv'));
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

  $('button#export').on('click', function() {
    loops.forEach(function(loop, loopNum) {
      var chords = [];

      loop.forEach(function(seq) {
        if (!seq.notes.length) {
          return;
        }
        var isRoot = true;

        function getName(note) {
          var name = piano.noteName(note);
          if (isRoot) {
            name = '[' + name + ']';
            isRoot = false;
          }
          return name;
        };

        chords.push(seq.notes.map(getName).join(' '));
      });

      if (!chords.length) {
        return;
      }

      window.prompt(
          'Copy:',
          'PART ' + (loopNum + 1) + ' CHORDS: ' + chords.join(' >>> '));
    });
  });


  // Startup
  $('#piano').on('build-done.piano', function(evt) {
    $('#loops a:first').trigger('click');
  });


  function saveData() {
    window.localStorage.setItem('songData', JSON.stringify(loops));
    console.log('saved changes to local storage');
  }


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
    console.log('showing loop', loopId, 'items:', notes && notes.length);
    if (!notes) {
      createLoop(loopId);
      return showLoop(loopId);
    }

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
    var info = loops[loopId][noteId];
    updateNote(loopId, noteId, info.notes);
    // make info.notes into pressed
    info.notes.forEach(function(note) {
      console.log('showing key', note);
      $('#piano .keys').find('[data-key=' + note + ']').addClass('pressed');
    });
  }


  function getRootNote(notes) {
    // Find the root note of the chord:
    var lowest;
    if (notes.length) {
      lowest = Math.min.apply({}, notes);
    } else {
      lowest = 0; // C
    }
    return lowest;
  }


  function updateNote(loopId, noteId, notes) {
    var root = piano.noteName(getRootNote(notes));

    console.log('showing', root, 'for loop', loopId, 'note', noteId);

    $('#notes .elements a' +
      '[data-loop=' + loopId + ']' +
      '[data-note=' + noteId + ']').text(root);
    loops[loopId][noteId].name = root;
    saveData();
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
    saveData();
  }


  var chordMap = {
    'M': [4, 7],
    'm': [3, 7],
    'aug': [4, 8],
    'dim': [3, 6],
    'sus4': [5, 7],
    'sus2': [2, 7],
    '5': [7],
    '6': [4, 7, 9],
    'm6': [3, 7, 9],
    '7': [4, 7, 10],
    'M7': [4, 7, 11],
    'm7': [3, 7, 10],
  };


  function showMappedChord(currentLoop, currentNote, chordName) {
    var info = loops[currentLoop][currentNote];
    var root = getRootNote(info.notes);
    info.notes = [root];
    chordMap[chordName].forEach(function(sumBy) {
      info.notes.push(root + sumBy);
    });
    showChord(currentLoop, currentNote);
  }


  function invert(currentLoop, currentNote, direction) {
    var info = loops[currentLoop][currentNote];
    var notes = info.notes.slice(0);
    var changedNote;

    if (direction === 'up') {
      console.log('inverting up');
      var first = notes.shift();
      changedNote = first + 12;
      notes.push(changedNote);
      if (changedNote > 12) {
        console.log('inversion out of bounds');
        return;
      }
    } else {
      console.log('inverting down');
      var last = notes.pop();
      changedNote = last - 12;
      notes.splice(0, 0, changedNote);
      if (changedNote < -12) {
        console.log('inversion out of bounds');
        return;
      }
    }
    info.notes = notes;
    showChord(currentLoop, currentNote);
  }

})();
