import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import {
  getCurrentArticle,
  getCurrentSide,
} from "../../store/selectors/canvasSelectors";

const FabricCanvas = () => {
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
    dispatch(canvasActions.setSelectedLayer(null));
    canvas.on("mouse:down", (e) => {
      if (!e.target) {
        dispatch(canvasActions.setSelectedLayer(null));
      }
    });

    canvasRef.current = canvas;

    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, [dispatch]);

  // remove image handler
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.getObjects().forEach((obj) => {
        const isExist = currentArticleSide?.images?.find(
          (text) => text.id === obj.id,
        );
        if (!isExist && obj.type === "image") {
          canvasRef.current?.remove(obj);
        }
      });
    }
  }, [currentArticleSide?.images]);

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
          fontStyle: canvasText.style == "italic" ? "italic" : "normal",
          fontWeight: canvasText.fontWeight === "bold" ? "bold" : "normal",
          underline: canvasText.underline ? true : false,
          left: canvasText.x,
          top: canvasText.y,
          editable: true,

          angle: canvasText.rotation,
          selectable: true,
          scaleX: canvasText.scaleX || 1,
          scaleY: canvasText.scaleY || 1,
        });

        text.on("selected", (e) => {
          dispatch(
            canvasActions.setSelectedLayer({ id: canvasText.id, type: "text" }),
          );
        });
        text.on("editing:exited", (e) => {
          dispatch(canvasActions.editText({ id: text.id, text: text.text }));
        });

        text.on("deselected", (e) => {
          if (!e.target) {
            return;
          }
          dispatch(
            canvasActions.editText({
              id: e.target.id,
              x: e.target.left,
              rotation: e.target.angle,
              y: e.target.top,
              fontFamily: e.target.fontFamily,
              width: e.target.width,
              lineHeight: e.target.lineHeight,
              textAlign: e.target.textAlign,
              height: e.target.height,
              scaleX: e.target.scaleX,
              scaleY: e.target.scaleY,
            }),
          );
        });

        if (canvasRef.current) {
          canvasRef.current.add(text);
        }
      });

      canvasRef.current.renderAll();
    }
  }, [currentArticleSide?.texts, dispatch]);

  // add images
  useEffect(() => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects("image");
      const existingImageIds = objects.map((obj) => obj.id);

      currentArticleSide?.images?.forEach((canvasImage) => {
        if (!existingImageIds.includes(canvasImage.id)) {
          const image = new Image();
          image.src = canvasImage.src;

          image.onload = () => {
            const canvasBGImage = new fabric.FabricImage(image, {
              id: canvasImage.id,
              left: canvasImage.x,
              top: canvasImage.y,
              angle: canvasImage.rotation,
              scaleX : canvasImage.scaleX,
              scaleY : canvasImage.scaleY,
            });

            canvasBGImage.on("selected", (e) => {
              dispatch(
                canvasActions.setSelectedLayer({
                  id: canvasBGImage.id,
                  type: "image",
                }),
              );
            });

            canvasBGImage.on("deselected", (e) => {
              if (!e.target) {
                return;
              }

              dispatch(
                canvasActions.editImage({
                  id: e.target.id,
                  x: e.target.left,
                  y: e.target.top,
                  rotation: e.target.angle,
                  scaleX: e.target.scaleX,
                  scaleY: e.target.scaleY,
                }),
              );
            });
            if (canvasRef.current) {
              canvasRef.current.add(canvasBGImage);
            }
          };
        }
      });

      canvasRef.current.renderAll();
    }
  }, [currentArticleSide?.images, dispatch]);

  // add main image bg
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
        width={canvasWidth}
        height={canvasHeight}
        className="relative rounded-xl border-2"
      />
    </div>
  );
};

export default FabricCanvas;
