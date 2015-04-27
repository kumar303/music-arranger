/*! Copyright (c) 2013 - Peter Coles (mrcoles.com)
 *  Licensed under the MIT license: http://mrcoles.com/media/mit-license.txt
 */

(function() {

    window.piano = {};
    var exports = window.piano;

    //
    // Setup keys!
    //

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

    var isIos = navigator.userAgent.match(/(iPhone|iPad)/i);

    function buildPiano() {
        if (buildingPiano) return;
        buildingPiano = true;

        $keys.trigger('build-start.piano');
        $keys.empty().off('.play');

        function addKey(i) {
            //var dataURI = isIos ? '' : Notes.getDataURI(i);

            // trick to deal with note getting hit multiple times before finishing...
            var sounds = [

                // Do we need sound? Not sure yet.
                //
                //new Audio(dataURI),
                //new Audio(dataURI),
                //new Audio(dataURI)
            ];
            var curSound = 0;
            var pressedTimeout;
            //dataURI = null;
            function play(evt) {
                // sound
                //sounds[curSound].pause();
                //try {
                //    sounds[curSound].currentTime = 0.001; //HACK - was for mobile safari, but sort of doesn't matter...
                //} catch (x) {
                //    console.log(x);
                //}
                //sounds[curSound].play();
                //curSound = ++curSound % sounds.length;

                var $k = $keys.find('[data-key='+i+']');
                var deselected = $k.hasClass('pressed');
                $k.toggleClass('pressed');

                //TODO - it'd be nice to have a single event for triggering and reading
                $keys.trigger('played-note.piano', [i, $k]);
                if (deselected) {
                  $keys.trigger('note-deselected.piano', [i, $k]);
                } else {
                  $keys.trigger('note-selected.piano', [i, $k]);
                }

                // visual feedback
                //window.clearTimeout(pressedTimeout);
                //pressedTimeout = window.setTimeout(function() {
                //    $k.removeClass('pressed');
                //}, 200);
            }
            $keys.on('note-'+i+'.play', play);

            var $key = $('<div>', {
                'class': 'key' + blackKeyClass(i),
                'data-key': i,
                mousedown: function(evt) { $keys.trigger('note-'+i+'.play'); }
            }).appendTo($keys);
        }

        // delayed for-loop to stop browser from crashing :'(
        // go slower on Chrome...
        var i = -12, max = 14, addDelay = /Chrome/i.test(navigator.userAgent) ? 80 : 0;
        (function go() {
            addKey(i + notesOffset);
            if (++i < max) {
                window.setTimeout(go, addDelay);
            } else {
                buildingPiano = false;
                $keys.trigger('build-done.piano');
            }
        })();
    }

    buildPiano();


    //
    // Setup keyboard interaction
    //

    var keyNotes = {
        /*a*/ 65: 0, // c
        /*w*/ 87: 1, // c#
        /*s*/ 83: 2, // d
        /*e*/ 69: 3, // d#
        /*d*/ 68: 4, // e
        /*f*/ 70: 5, // f
        /*t*/ 84: 6, // f#
        /*g*/ 71: 7, // g
        /*y*/ 89: 8, // g#
        /*h*/ 72: 9, // a
        /*u*/ 85: 10, // a#
        /*j*/ 74: 11, // b
        /*k*/ 75: 12, // c
        /*o*/ 79: 13, // c#
        /*l*/ 76: 14, // d
        /*p*/ 80: 15, // d#
        /*;*/ 186: 16, // e
        /*;*/ 59: 16, // e ... gotta figure out why it's sometimes 186 and sometimes 59
        /*,*/ 222: 17, // f
        /*]*/ 221: 18, // f#
        /*enter*/ 13: 19 // g
    };
    var notesShift = -12;
    var downKeys = {};

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


    //
    // Piano colors
    //

    var colors = 'f33 33f 3f3 ff3 f3f 3ff'.split(' '),
        curColor = 0;

    function colorHandler(evt) {
        if (evt.type === 'click' || (evt.keyCode == 67 && !isModifierKey(evt))) {
            if (++curColor >= colors.length) curColor = 0;
            document.getElementById('piano').style.backgroundColor = '#' + colors[curColor];
        }
    }

    $(window).keyup(colorHandler);
    $('.toggle-color').click(colorHandler);

    //
    // Help controls
    //



    //
    // Demo
    //
    (function(undefined) {
        var chopsticks = (function() {
            var data = [
                {
                    'style': 'wave',
                    'volume': 'linearFade',
                    'notesOffset': 0
                }
            ];

            var main = [
                [6, -7, -5],
                [6, -7, -5],
                [6, -7, -5],
                [6, -7, -5],
                [6, -7, -5],
                [6, -7, -5],

                [6, -8, -5],
                [6, -8, -5],
                [6, -8, -5],
                [6, -8, -5],
                [6, -8, -5],
                [6, -8, -5],

                [6, -10, -1],
                [6, -10, -1],
                [6, -10, -1],
                [6, -10, -1],
                [6, -10, -1],
                [6, -10, -1],

                [6, -12, 0],
                [6, -12, 0],
                [6, -12, 0]
            ];

            data.push.apply(data, main);
            data.push(
                [6, -12, 0],
                [6, -10, -1],
                [6, -8, -3]
            );
            data.push.apply(data, main);
            data.push(
                [6, -12, 0],
                [6, -5],
                [6, -8],

                [6, -12],
                [12]
            );

            var main2 = [
                [6, 0, 4],
                [6, -1, 2],
                [6],

                [6, -3, 0],
                [6, -5, -1],
                [6],

                [6, -7, -3],
                [6, -8, -5],
                [6],

                [6, 0, 4],
                [6, 0, 4],
                [6],

                [6, -8, -5],
                [6, -10, -7],
                [6],

                [6, -1, 2],
                [6, -1, 2],
                [6]
            ];
            data.push.apply(data, main2);
            data.push(
                [6, -10, -7],
                [6, -12, -8],
                [6],

                    [6, -8, 0],
                [6, -8, 0],
                [6]
            );
            data.push.apply(data, main2);
            data.push(
                [6, -5, -1],
                [6, -8, 0],
                [6, -5],

                [6, -8],
                [6, -12],
                [6]
            );
            return data;
        })();


        var demoing = false, demoingTimeout;
        function demo(data) {
            var cfg = data[0];
            if (!buildingPiano && !demoing) {
                demoing = true;
                cfg.style && (DataGenerator.style.default = DataGenerator.style[cfg.style]);
                cfg.volume && (DataGenerator.volume.default = DataGenerator.volume[cfg.volume]);
                cfg.notesOffset !== undefined && (notesOffset = cfg.notesOffset);
                $keys.one('build-done.piano', function() {
                    //NOTE - jQuery.map flattens arrays
                    var i = 0, song = $.map(data, function(x, i) { return i == 0 ? null : [x]; });
                    (function play() {
                        if (!demoing) return;
                        if (i >= song.length) { i = 0; }
                        var part = song[i++];
                        if (part) {
                            var delay = part[0];
                            demoingTimeout = window.setTimeout(function() {
                                demoing && play();
                                for (var j=1, len=part.length; j<len; j++) {
                                    $keys.trigger('note-'+(part[j]+notesOffset)+'.play');
                                }
                            }, delay*50);
                        }
                    })();
                });
                buildPiano();
            }
        }

        function demoHandler(evt) {
            if (evt.type === 'click' || (evt.keyCode == 77 && !isModifierKey(evt))) {
                if (demoing) {
                    demoing = false;
                    window.clearTimeout(demoingTimeout);
                    $keys.unbind('build-done.piano');
                } else {
                    demo(chopsticks);
                }
            }
        }

        $(window).keyup(demoHandler);
        $('.toggle-demo').click(demoHandler);
    })();


    //
    // Looper
    //
    (function() {
        var $looper = $('.loop'),
            recording = false,
            startTime,
            totalTime,
            data,
            stopTimeout,
            loopInterval, loopTimeouts = [];

        $keys.on('played-note.piano', function(evt, key) {
            if (recording) {
                data.push({'key': key, 'time': new Date().getTime()});
            }
        });

        function recordStart() {
            if (!recording) {
                data = [];
                startTime = new Date().getTime();
                recording = true;
                window.clearTimeout(stopTimeout);
                stopTimeout = window.setTimeout(recordStop, 60*1000); // 1 minute max?
                $looper.addClass('active');

                // stop old loop
                window.clearInterval(loopInterval);
                $.each(loopTimeouts, function(i, x) { window.clearTimeout(x); });
            }
        }
        function recordStop() {
            if (recording) {
                recording = false;
                totalTime = new Date().getTime() - startTime;
                window.clearTimeout(stopTimeout);
                for (var i=0, len=data.length; i<len; i++) {
                    data[i].time = data[i].time - startTime;
                }
                if (data.length) {
                    playLoop(data, totalTime);
                }
                $looper.removeClass('active');
            }
        }

        function playLoop(data, totalTime) {
            loopInterval = window.setInterval(function() {
                loopTimeouts = [];
                $.each(data, function(i, x) {
                    loopTimeouts.push(window.setTimeout(function() {
                        $keys.trigger('note-'+x.key+'.play');
                    }, x.time));
                });
            }, totalTime);
        }

        $looper.mousedown(recordStart).mouseup(recordStop);

        $(window).on('keydown keyup', function(evt) {
            if (evt.which == 57 && !isModifierKey(evt)) {
                evt.type == 'keydown' ? recordStart() : recordStop();
            }
        });
    })();

    if (isIos) {
        $(function() {
            var $note = $('<div>', {
                'class': 'note',
                'text': 'Note: sound does not work on iOS, but you can still enjoy pretty wave forms!'
            }).appendTo('body');

            window.setTimeout(function() {
                $note.fadeOut();
            }, 6000);
        });
    }

})();
