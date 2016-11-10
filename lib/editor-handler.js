'use babel';

import { CompositeDisposable, Point, Range } from 'atom';

export default class EditorHandler {

  constructor(editor) {
    this.editor = editor;
    this.subscriptions = new CompositeDisposable();
  }

  subscribe() {
    this.subscriptions.add(this.editor.onDidChangeSelectionRange(() => this.setSelectingRange()));
    this.subscriptions.add(this.editor.onDidChangeCursorPosition(() => this.setSelectingRange()));
  }

  unsubscribe() {
    this.editor = null;
    this.selectingRange = null;
    this.subscriptions.dispose();
  }

  moveUp() {
    if (this.selectingRange == null) {
      this.setSelectingRange();
    }

    startPoint = this.selectingRange.start;
    endPoint = this.selectingRange.end;

    startPoint.row -= 1;
    endPoint.row -= 1;

    range = new Range(startPoint, endPoint);

    if (this.isSelectableRow(range.end.row)) {
      this.editor.addSelectionForScreenRange(range);
    }

    this.selectingRange = range;
  }

  moveDown() {
    if (this.selectingRange == null) {
      this.setSelectingRange();
    }

    startPoint = this.selectingRange.start;
    endPoint = this.selectingRange.end;

    startPoint.row += 1;
    endPoint.row += 1;

    range = new Range(startPoint, endPoint);

    if (this.isSelectableRow(range.end.row)) {
      this.editor.addSelectionForScreenRange(range);
    }

    this.selectingRange = range;
  }

  isSelectableRow(row) {
    lineText = this.editor.lineTextForScreenRow(row);
    return (lineText != null && lineText.length >= this.selectingRange.start.column);
  }

  setSelectingRange() {
    this.selectingRange = this.editor.getSelectedScreenRange();
  }
}
