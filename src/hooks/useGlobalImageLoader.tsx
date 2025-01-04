// components/loaders/useGlobalImageLoader.js
import { useState, useEffect } from "react";

export const useGlobalImageLoader = () => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedCount = 0;
    const totalImages = images.length;

    // If no images, consider it loaded
    if (totalImages === 0) {
      setAllImagesLoaded(true);
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setAllImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAllImagesLoaded(true);
    }, 15000); // force load if some error occurs after 15 seconds

    return () => clearTimeout(timeout);
  }, []);

  return allImagesLoaded;
};
