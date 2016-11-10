'use babel';

import EditorHandler from './editor-handler';
import { CompositeDisposable } from 'atom';

export default {

  editorHandler: null,
  subscriptions: null,

  activate(state) {
    this.setEditorHandler();
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rectangular-selection:move-up': () => this.editorHandler.moveUp(),
      'rectangular-selection:move-down': () => this.editorHandler.moveDown()
    }));

    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(() => this.resetEditorHandler()));
  },

  deactivate() {
    this.editorHandler.unsubscribe();
    this.subscriptions.dispose();
  },

  setEditorHandler() {
    editor = atom.workspace.getActiveTextEditor();
    if (editor != null) {
      this.editorHandler = new EditorHandler(editor);
      this.editorHandler.subscribe();
    }
  },

  resetEditorHandler() {
    if (this.editorHandler != null) {
      this.editorHandler.unsubscribe();
    }
    this.setEditorHandler();
  }
};
