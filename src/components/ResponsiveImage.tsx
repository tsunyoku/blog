import { useState } from "react";

interface ResponsiveImageProps {
  alt: string;
  src: string;
}

export default function ResponsiveImage({ alt, src }: ResponsiveImageProps) {
  let image = new Image();
  image.src = src;

  // This is a hacky way to determine if the image is portrait or landscape
  // Portrait images are way too big when you use 25vw
  var [imageWidth, setImageWidth] = useState("");
  image.onload = () => {
    if (image.naturalHeight > image.naturalWidth) {
      // Portrait
      setImageWidth("15vw");
    } else {
      // Landscape
      setImageWidth("25vw");
    }
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{ width: imageWidth, minWidth: "290px" }}
      ></img>
    </>
  );
}
