"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frame = `document.body.addEventListener('click', function(e) {
  e.preventDefault();
  console.log()
  window.parent.postMessage(e.target.toString(),'*');
  return false;
}, true);
`;
exports.default = exports.frame;
//# sourceMappingURL=fram.js.map