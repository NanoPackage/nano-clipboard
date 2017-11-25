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
   * use command to copy.
   * @param text
   * @returns {boolean}
   */
  function copyWithCommand(text) {
    try {
      // 1. create input
      var input = document.createElement('input');
      input.style.display = 'absolute';
      input.style.left = '-1px';
      input.style.bottom = '-1px';
      input.type = 'text';
      input.value = text;
      document.body.appendChild(input);

      // 2. copy text
      input.select();
      var success = document.execCommand('Copy');

      // 3. remove after copied
      document.body.removeChild(input);

      // 4. return
      return success;
    } catch (_) {
      return false;
    }
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
