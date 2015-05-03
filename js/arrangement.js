(function() {
  "use strict";

  var songData = getSavedData();
  var currentPart = 0;
  var currentNote;

  if (!songData.parts) {
    songData.parts = [];
    console.log('creating song data');
    saveData();
  }


  $('select#part').on('change', function() {
    currentPart = parseInt($(this).val(), 10);
    showPart(currentPart);
  });

  $('#notes .elements').on('click', 'a', function() {
    currentNote = parseInt($(this).data('note'), 10);
    showChord(currentPart, currentNote);
  });

  $('button.inverter').on('click', function() {
    invert(currentPart, currentNote, $(this).data('inv'));
  });

  $(window).keydown(function(evt) {
    var keyCode = evt.keyCode;
    // left and right arrows.
    if (keyCode == 37 || keyCode == 39) {
      // TODO: find selected and toggle through all parts.
      showPart(0);
    }
  });

  $('#chord-select').on('change', function(evt) {
    var selectedChord = $(this).val();
    manageNote(function(notes) {
      makeMappedChord(currentPart, currentNote, selectedChord);
    });
  });

  $('#piano').on('note-selected.piano', function(evt, keyNumber, keyDiv) {
    manageNote(function(notes) {
      var selectedChord = $('#chord-select').val();
      makeMappedChord(currentPart, currentNote, selectedChord,
                      {root: keyNumber});
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
    songData.parts.forEach(function(part, partNum) {
      var chords = [];

      part.forEach(function(seq) {
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
          'PART ' + (partNum + 1) + ' CHORDS: ' + chords.join(' >>> '));
    });
  });

  $('button#clear').on('click', function() {
    if (confirm('Delete all data?')) {
      songData = {};
      saveData();
      window.location.reload();
    };
  });


  // Startup
  $('#piano').on('build-done.piano', function(evt) {
    currentPart = parseInt($('select#part').val(), 10);
    showPart(currentPart);
  });


  function saveData() {
    window.localStorage.setItem('songData', JSON.stringify(songData));
    console.log('saved changes to local storage');
  }


  function getSavedData() {
    var data = window.localStorage.getItem('songData');
    if (!data) {
      data = {};
    } else {
      data = JSON.parse(data);
    }
    return data;
  }


  function manageNote(callback) {
    if (typeof currentPart === 'undefined' ||
        typeof currentNote === 'undefined') {
      console.log('cannot manage note; no current part/note');
      return;
    }

    console.log('manage note', currentNote, 'for part', currentPart);
    var notes = songData.parts[currentPart][currentNote].notes;
    callback(notes);
    showChord(currentPart, currentNote);
  }


  function showPart(partId) {
    var notes = songData.parts[partId];
    console.log('showing part', partId, 'items:', notes && notes.length);
    if (!notes) {
      createPart(partId);
      return showPart(partId);
    }

    var container = $('#notes .elements');
    container.empty();
    var first;

    notes.forEach(function(item, noteId) {
      var a = $(document.createElement('a'));
      a.attr('href', '#');
      a.attr('data-part', partId);
      a.attr('data-note', noteId);
      a.html(item.name || '&nbsp;');
      if (!first) {
        first = a;
      }
      container.append(a);
    });

    first.trigger('click');
  }


  function showChord(partId, noteId) {
    console.log('showing chord', noteId, 'part', partId);
    $('#piano .keys .key').removeClass('pressed');
    var info = songData.parts[partId][noteId];
    updateNote(partId, noteId, info.notes);
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


  function updateNote(partId, noteId, notes) {
    var root = piano.noteName(getRootNote(notes));

    console.log('showing', root, 'for part', partId, 'note', noteId);

    $('#notes .elements a' +
      '[data-part=' + partId + ']' +
      '[data-note=' + noteId + ']').text(root);
    songData.parts[partId][noteId].name = root;
    saveData();
  }


  function createPart(partId) {
    console.log('creating part', partId);
    songData.parts[partId] = [];
    var notes = ['C', false, false, false, false, false, false, false];
    notes.forEach(function(name, index) {
      songData.parts[partId].push({
        name: name,
        id: index,
        notes: [],
      });
    });
    saveData();
  }


  var chordMap = {
    '': [],  // no chord
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


  function makeMappedChord(currentPart, currentNote, chordName, opt) {
    opt = opt || {root: undefined};
    var info = songData.parts[currentPart][currentNote];
    if (opt.root === undefined) {
      opt.root = getRootNote(info.notes);
    }
    console.log('making chord from root', piano.noteName(opt.root));
    info.notes = [opt.root];
    chordMap[chordName].forEach(function(sumBy) {
      info.notes.push(opt.root + sumBy);
    });
  }


  function invert(currentPart, currentNote, direction) {
    var info = songData.parts[currentPart][currentNote];
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
    showChord(currentPart, currentNote);
  }

})();
