import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { applyChordFormula, invertChord, noteName } from 'lib/util/notes';

const alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


export default class ExportedData extends Component {

  static propTypes = {
    clearData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  formatChords(part, index, formatter) {
    var chords = [];
    // FIXME: this will go out of range if some weirdo puts more than 26
    // sections in their song.
    var section = alphabet[index];
    part.forEach((data) => {
      chords.push(formatter(data));
    });
    return `${section}: ${chords.join(' >>> ')}`;
  }

  formatData() {
    let output = [];

    this.props.data.parts.forEach((part, index) => {
      output.push(this.formatChords(part, index, (data) => {
        return noteName(data.chordRoot) + data.chordType;
      }));
    });

    output.push('');

    this.props.data.parts.forEach((part, index) => {
      output.push(this.formatChords(part, index, (data) => {
        function getName(note) {
          let name = noteName(note);
          if (note === data.chordRoot) {
            name = '[' + name + ']';
          }
          return name;
        }
        let chordNotes = applyChordFormula({root: data.chordRoot,
                                            chordType: data.chordType});
        let partNotes = invertChord(data.chordInversion,
                                    chordNotes);
        return partNotes.map(getName).join(' ');
      }));
    });

    output.push('');
    output.push('Arrangement URL:');
    output.push(window.location.href);

    return output.join('\n');
  }

  render() {
    return (
      <div className={cx('overlay')}>
        <div className={cx('overlay-panel')}>
          <p>
            <textarea readOnly={true} value={this.formatData()}/>
          </p>
          <p>
            <button onClick={() => this.props.clearData()}>OK</button>
          </p>
        </div>
      </div>
    );
  }

}
