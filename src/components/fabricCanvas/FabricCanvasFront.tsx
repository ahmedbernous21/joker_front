import { useEffect } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import {
  getCurrentArticle,
  getCurrentFrontSide,
} from "../../store/selectors/canvasSelectors";
import fixScrolling from "../../utils/FabricScrolling";
import FontFaceObserver from "fontfaceobserver";

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
  const { frontCanvas, selectedLayer } = useSelector(
    (state: IRootState) => state.canvas,
  );

  useEffect(() => {
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

  // Add main image bg
  useEffect(() => {
    if (frontCanvas) {
      const image = new Image();
      image.src = currentArticleFrontSide?.src;
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
        frontCanvas.backgroundImage = canvasBGImage ;
        frontCanvas.renderAll();
      };
    }
  }, [
    currentArticle.articleBackground,
    currentArticleFrontSide?.src,
    frontCanvas,
  ]);

  // Add text objects
  useEffect(() => {
    if (frontCanvas) {
      const objects = frontCanvas.getObjects("textbox");
      objects.forEach((obj) => {
        frontCanvas.remove(obj);
      });

      for (const canvasText of currentArticleFrontSide?.texts || []) {
        const text = new fabric.Textbox(canvasText.text || "", {
          id: canvasText.id,
          width: canvasText.width,
          fontSize: canvasText.fontSize,
          textAlign: canvasText.textAlign,
          splitByGrapheme: true,
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
          frontCanvas.setActiveObject(text);
        }

        const font = new FontFaceObserver(
          canvasText.fontFamily?.split(`"`)[1] as string,
        );
        if (canvasText.fontFamily?.split(`"`)[1] != "Times New Roman") {
          font.load(null, 10000).then(() => {
            text.set("fontFamily", canvasText.fontFamily as string);
            text._clearCache();
            text.initDimensions();
            frontCanvas.renderAll();
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

        frontCanvas.add(text);
      }
      frontCanvas.renderAll();
    }
  }, [currentArticleFrontSide?.texts, dispatch, frontCanvas]);

  // Add images
  useEffect(() => {
    if (frontCanvas) {
      const objects = frontCanvas.getObjects("image");
      const existingImageIds = objects.map((obj) => obj.id);
      currentArticleFrontSide?.images?.forEach((canvasImage) => {
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

            frontCanvas.add(canvasBGImage);
          };
        }
      });

      frontCanvas.renderAll();
    }
  }, [currentArticleFrontSide?.images, dispatch, frontCanvas]);

  // Remove images handler
  useEffect(() => {
    if (frontCanvas) {
      frontCanvas.getObjects().forEach((obj) => {
        const isExist = currentArticleFrontSide?.images?.find(
          (text) => text.id === obj.id,
        );
        if (!isExist && obj.type === "image") {
          frontCanvas.remove(obj);
        }
      });
    }
  }, [currentArticleFrontSide?.images, frontCanvas]);

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
