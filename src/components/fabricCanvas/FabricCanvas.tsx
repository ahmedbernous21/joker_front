import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import {
  getCurrentArticle,
  getCurrentSide,
} from "../../store/selectors/canvasSelectors";

const CanvasTexts = () => {
  const canvasWidth = 320;
  const canvasHeight = 450;
  const dispatch = useDispatch();
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const currentArticleSide = useSelector((state: IRootState) =>
    getCurrentSide(state),
  );
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
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
    fixScrolling();

    let canvas = new fabric.Canvas("canvas", {
      selection: false,
      allowTouchScrolling: true,
    });
    canvas.on("mouse:down", (e) => {
      if (!e.target) {
        dispatch(canvasActions.setSelectedLayer(null));
      }
    });

    // Debounce the text:changed event

    canvasRef.current = canvas;

    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, [dispatch]);

  useEffect(() => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects("textbox");
      objects.forEach((obj) => {
        canvasRef.current?.remove(obj);
      });
      currentArticleSide?.texts?.forEach((canvasText) => {
        const text = new fabric.Textbox(canvasText.text || "", {
          id: canvasText.id,
          width: canvasText.width,
          fontSize: canvasText.fontSize,
          textAlign: canvasText.textAlign,
          fontFamily: canvasText.fontFamily,
          splitByGrapheme: true,
          fill: canvasText.color,
          fontStyle: canvasText.fontStyle === "italic" ? "italic" : "normal",
          fontWeight: canvasText.fontWeight === "bold" ? "bold" : "normal",
          underline: canvasText.underline || false,
          left: canvasText.x,
          top: canvasText.y,
          editable: true,
          selectable: true,
        });

        text.on("selected", () => {
          dispatch(
            canvasActions.setSelectedLayer({ id: canvasText.id, type: "text" }),
          );
        });
        text.on("deselected", (e) => {
          dispatch(
            canvasActions.editText({
              id: e.target.id,
              text: e.target.text,
              x: e.target.left,
              y: e.target.top,
            }),
          );
        });

        if (canvasRef.current) {
          canvasRef.current.add(text);
        }
      });
    }
  }, [currentArticleSide?.texts, dispatch]);

  // add images
  useEffect(() => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects("image");
      objects.forEach((obj) => {
        canvasRef.current?.remove(obj);
      });
      currentArticleSide?.images?.forEach((canvasImage) => {
        const image = new Image();
        image.src = canvasImage.src;

        image.onload = () => {
          const canvasBGImage = new fabric.FabricImage(image);
          canvasBGImage.id = canvasImage.id;
          canvasBGImage.backgroundColor = currentArticle.articleBackground;
          if (canvasImage.x && canvasImage.y) {
            canvasBGImage.left = canvasImage.x;
            canvasBGImage.top = canvasImage.y;
          }
          if (canvasRef.current) {
            canvasRef.current.add(canvasBGImage);
            canvasRef.current.renderAll();
          }
          canvasBGImage.on("selected", () => {
            dispatch(
              canvasActions.setSelectedLayer({
                id: canvasBGImage.id,
                type: "image",
              }),
            );
          });
          canvasBGImage.on("deselected", (e) => {
            dispatch(
              canvasActions.editImage({
                id: e.target.id,
                x: e.target.left,
                y: e.target.top,
              }),
            );
          });
        };
      });

      canvasRef.current.renderAll();
    }
  }, [currentArticleSide?.images, dispatch]);

  // add images
  useEffect(() => {
    const imageUrl = currentArticleSide?.src;

    const image = new Image();
    if (imageUrl) {
      image.src = imageUrl;
    }

    image.onload = () => {
      const canvasBGImage = new fabric.FabricImage(image);
      canvasBGImage.backgroundColor = currentArticle.articleBackground;

      // Calculate scaling to fit the canvas
      const scaleX = canvasWidth / image.width;
      const scaleY = canvasHeight / image.height;

      canvasBGImage.scaleX = scaleX;
      canvasBGImage.scaleY = scaleY;
      // Center the image
      canvasBGImage.set({
        left: 320 / 2,
        top: 450 / 2,
        originX: "center",
        originY: "center",
      });
      if (canvasRef.current) {
        canvasRef.current.backgroundImage = canvasBGImage;
        canvasRef.current.renderAll();
      }
    };
  }, [currentArticle.articleBackground, currentArticleSide?.src]);

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="relative rounded-xl border-2"
      />
    </div>
  );
};

export default CanvasTexts;
