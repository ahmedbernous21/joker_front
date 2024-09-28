import { useEffect } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import {
  getCurrentArticle,
  getCurrentBackSide,
} from "../../store/selectors/canvasSelectors";
import fixScrolling from "../../utils/FabricScrolling";
import FontFaceObserver from "fontfaceobserver";

const FabricCanvasBack = () => {
  const canvasWidth = 320;
  const canvasHeight = 450;
  const dispatch = useDispatch();
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const currentArticleBackSide = useSelector((state: IRootState) =>
    getCurrentBackSide(state),
  );
  const { backCanvas, selectedLayer } = useSelector(
    (state: IRootState) => state.canvas,
  );

  useEffect(() => {
    fixScrolling();
    const backCanvasInstance = new fabric.Canvas("backCanvas", {
      selection: false,
      allowTouchScrolling: true,
    });
    backCanvasInstance.on("mouse:down", (e) => {
      if (!e.target) {
        dispatch(canvasActions.setSelectedLayer(null));
      }
    });
    dispatch(canvasActions.setBackCanvas(backCanvasInstance));

    backCanvasInstance.renderAll();
    return () => {
      backCanvasInstance.dispose();
    };
  }, [dispatch]);

  // Add main image bg
  useEffect(() => {
    if (backCanvas) {
      const image = new Image();
      if (currentArticleBackSide && currentArticleBackSide.src) {
        image.src = currentArticleBackSide?.src;
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
        backCanvas.backgroundImage = canvasBGImage;
        backCanvas.renderAll();
      };
    }
  }, [
    currentArticle.articleBackground,
    currentArticleBackSide?.src,
    backCanvas,
  ]);

  // Add text objects
  useEffect(() => {
    if (backCanvas) {
      const objects = backCanvas.getObjects("textbox");
      objects.forEach((obj) => {
        backCanvas.remove(obj);
      });

      for (const canvasText of currentArticleBackSide?.texts || []) {
        const text = new fabric.Textbox(canvasText.text || "", {
          id: canvasText.id,
          width: canvasText.width,
          fontSize: canvasText.fontSize,
          textAlign: canvasText.textAlign,
          splitByGrapheme: true,
          // fontFamily: canvasText.fontFamily,
          fill: canvasText.fill as string,
          fontStyle: canvasText.fontStyle,
          fontWeight: canvasText.fontWeight === "bold" ? "bold" : "normal",
          underline: canvasText.underline ? true : false,
          left: canvasText.left,
          top: canvasText.top,
          angle: canvasText.angle,
          scaleX: canvasText.scaleX || 1,
          scaleY: canvasText.scaleY || 1,
        });
        if (selectedLayer?.id == text.id) {
          backCanvas.setActiveObject(text);
        }
        const font = new FontFaceObserver(
          canvasText.fontFamily?.split(`"`)[1] as string,
        );
        if (canvasText.fontFamily?.split(`"`)[1] != "Times New Roman") {
          font.load(null, 10000).then(() => {
            text.set("fontFamily", canvasText.fontFamily as string);
            text._clearCache();
            text.initDimensions();
            backCanvas.renderAll();
          });
        }

        // Handle text selection
        text.on("selected", () => {
          dispatch(
            canvasActions.setSelectedLayer({
              id: canvasText.id,
              type: "text",
            }),
          );
        });

        text.on("modified", (e) => {
          if (!e.target) {
            return;
          }
          dispatch(
            canvasActions.editText({
              id: e.target.id,
              left: e.target.left,
              top: e.target.top,
              angle: e.target.angle,
              scaleX: e.target.scaleX,
              scaleY: e.target.scaleY,
            }),
          );
        });

        text.on("editing:exited", () => {
          dispatch(canvasActions.editText({ id: text.id, text: text.text }));
        });

        backCanvas.add(text);
      }
      backCanvas.renderAll();
    }
  }, [currentArticleBackSide?.texts, dispatch, backCanvas]);

  // Add images
  useEffect(() => {
    if (backCanvas) {
      const objects = backCanvas.getObjects("image");
      const existingImageIds = objects.map((obj) => obj.id);
      currentArticleBackSide?.images?.forEach((canvasImage) => {
        if (!existingImageIds.includes(canvasImage.id)) {
          const image = new Image();
          image.src = canvasImage.src;

          image.onload = () => {
            const canvasBGImage = new fabric.FabricImage(image, {
              id: canvasImage.id,
              left: canvasImage.left,
              top: canvasImage.top,
              angle: canvasImage.angle,
              scaleX: canvasImage.scaleX || 1,
              scaleY: canvasImage.scaleY || 1,
            });

            canvasBGImage.on("selected", () => {
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
                  left: e.target.left,
                  top: e.target.top,
                  angle: e.target.angle,
                  scaleX: e.target.scaleX,
                  scaleY: e.target.scaleY,
                }),
              );
            });

            backCanvas.add(canvasBGImage);
          };
        }
      });

      backCanvas.renderAll();
    }
  }, [currentArticleBackSide?.images, dispatch, backCanvas]);

  // Remove images handler
  useEffect(() => {
    if (backCanvas) {
      backCanvas.getObjects().forEach((obj) => {
        const isExist = currentArticleBackSide?.images?.find(
          (text) => text.id === obj.id,
        );
        if (!isExist && obj.type === "image") {
          backCanvas.remove(obj);
        }
      });
    }
  }, [currentArticleBackSide?.images, backCanvas]);

  return (
    <div className={currentArticle.active == "back" ? "" : "absolute -z-10"}>
      <canvas
        id="backCanvas"
        width={canvasWidth}
        height={canvasHeight}
        className={`relative rounded-xl border-2`}
      />
    </div>
  );
};

export default FabricCanvasBack;
