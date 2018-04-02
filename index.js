/**
 * How to use it?
 *
 * import nanoClipboard from 'nano-clipboard';
 * var success = nanoClipboard('Hello, world');
 *
 * @param text
 * @param usePrompt, default false.
 * @returns {boolean}
 */
!function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(root); // nodejs support
    module.exports['default'] = module.exports; // es6 support
  }
  else
    root.nanoClipboard = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {

  /**
   * use command to copy. https://github.com/sindresorhus/copy-text-to-clipboard
   * @param input
   * @returns {boolean}
   */
  function copyWithCommand(input) {
    var el = document.createElement('textarea');

    el.value = input;

    // Prevent keyboard from showing on mobile
    el.setAttribute('readonly', '');

    el.style.contain = 'strict';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = document.getSelection();
    var originalRange = false;
    if (selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }

    document.body.appendChild(el);
    el.select();

    // Explicit selection workaround for iOS
    el.selectionStart = 0;
    el.selectionEnd = input.length;

    var success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }

    document.body.removeChild(el);

    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    return success;
  }

  /**
   * backup copy way
   * @param text
   * @returns {boolean}
   */
  function backupCopy(text) {
    if (window.prompt) {
      window.prompt('Copy to clipboard by ctrl / ⌘  + c', text);
      return true;
    }
    return false;
  }

  /**
   * main entry
   */
  return function(text, usePrompt) {
    var success = copyWithCommand(text);
    // if not success and usePrompt, then use backup way.
    return (usePrompt && !success) ?
      backupCopy(text) :
      success;
  }
});
