import { useEffect, useState } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import {
  getCurrentArticle,
  getCurrentFrontSide,
} from "../../store/selectors/canvasSelectors";

const FabricCanvasFront = () => {
  const canvasWidth = 320;
  const canvasHeight = 450;
  const dispatch = useDispatch();
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const currentArticleFrontSide = useSelector((state: IRootState) =>
    getCurrentFrontSide(state),
  );
  const { frontCanvas } = useSelector((state: IRootState) => state.canvas);

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

    const frontCanvasInstance = new fabric.Canvas("frontCanvas", {
      selection: false,
      allowTouchScrolling: true,
    });

    frontCanvasInstance.on("mouse:down", (e) => {
      if (!e.target) {
        dispatch(canvasActions.setSelectedLayer(null));
      }
    });

    dispatch(canvasActions.setFrontCanvas(frontCanvasInstance));
    frontCanvasInstance.renderAll();

    return () => {
      frontCanvasInstance.dispose();
    };
  }, [dispatch]);

  // remove image handler
  useEffect(() => {
    const removeImages = (canvas: fabric.Canvas) => {
      canvas.getObjects().forEach((obj) => {
        const isExist = currentArticleFrontSide?.images?.find(
          (text) => text.id === obj.id,
        );
        if (!isExist && obj.type === "image") {
          canvas.remove(obj);
        }
      });
    };

    if (frontCanvas) {
      removeImages(frontCanvas);
    }
  }, [currentArticleFrontSide?.images, frontCanvas]);

  useEffect(() => {
    if (frontCanvas) {
      const objects = frontCanvas.getObjects("textbox");
      objects.forEach((obj) => {
        frontCanvas.remove(obj);
      });
      currentArticleFrontSide?.texts?.forEach((canvasText) => {
        const text = new fabric.Textbox(canvasText.text || "", {
          id: canvasText.id,
          width: canvasText.width,
          fontSize: canvasText.fontSize,
          textAlign: canvasText.textAlign || "center",
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
              textAlign: e.target.textAlign || "center",
              height: e.target.height,
              scaleX: e.target.scaleX,
              scaleY: e.target.scaleY,
            }),
          );
        });

        frontCanvas.add(text);
      });

      frontCanvas.renderAll();
    }
  }, [currentArticleFrontSide?.texts, dispatch, frontCanvas]);

  // add images
  useEffect(() => {
    const addImages = (canvas) => {
      const objects = canvas.getObjects("image");
      const existingImageIds = objects.map((obj) => obj.id);

      currentArticleFrontSide?.images?.forEach((canvasImage) => {
        if (!existingImageIds.includes(canvasImage.id)) {
          const image = new Image();
          image.src = canvasImage.src;

          image.onload = () => {
            // Calculate scaling to fit the canvas
            const scaleX = canvasWidth / image.width;
            const scaleY = canvasHeight / image.height;
            const scale = Math.min(scaleX, scaleY, 1); // Ensure the scale is not greater than 1

            const canvasBGImage = new fabric.Image(image, {
              id: canvasImage.id,
              left: canvasImage.x,
              top: canvasImage.y,
              angle: canvasImage.rotation,
              scaleX: scale,
              scaleY: scale,
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

            canvas.add(canvasBGImage);
          };
        }
      });

      canvas.renderAll();
    };

    if (frontCanvas) {
      addImages(frontCanvas);
    }
  }, [currentArticleFrontSide?.images, dispatch, frontCanvas]);

  // add main image bg
  useEffect(() => {
    const addMainImageBg = (canvas, imageUrl) => {
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
        canvas.backgroundImage = canvasBGImage;
        canvas.renderAll();
      };
    };

    if (frontCanvas) {
      addMainImageBg(frontCanvas, currentArticleFrontSide?.src);
    }
  }, [
    currentArticle.articleBackground,
    currentArticleFrontSide?.src,
    frontCanvas,
  ]);

  return (
    <div className={currentArticle.active == "front" ? "" : "absolute -z-10"}>
      <canvas
        id="frontCanvas"
        width={canvasWidth}
        height={canvasHeight}
        className={`relative rounded-xl border-2`}
      />
    </div>
  );
};

export default FabricCanvasFront;
