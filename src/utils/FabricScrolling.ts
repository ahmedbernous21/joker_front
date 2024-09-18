
import * as fabric from "fabric";
// fix error from the library itself
const fixScrolling = () => {
  var defaultOnTouchStartHandler = fabric.Canvas.prototype._onTouchStart;
  Object.assign(fabric.Canvas.prototype, {
    _onTouchStart: function (e) {
      var target = this.findTarget(e);
      if (this.allowTouchScrolling && !target && !this.isDrawingMode) {
        return;
      }
      defaultOnTouchStartHandler.call(this, e);
    },
  });
};

export default fixScrolling;
