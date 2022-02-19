export function useImageResize() {
  const resize = (blob, maxSideLength) => {
    maxSideLength = Math.abs(maxSideLength);

    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(blob);

      image.onload = async function () {
        if (this.width == 0 || this.height == 0) {
          console.log("Image is empty");
        } else {
          try {
            let canvas = document.createElement("canvas");

            const ratio = this.width / this.height;
            canvas.width =
              this.width > this.height ? maxSideLength * ratio : maxSideLength;
            canvas.height =
              this.width < this.height ? maxSideLength / ratio : maxSideLength;

            let context = canvas.getContext("2d");

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
              image,
              0,
              0,
              this.width,
              this.height,
              0,
              0,
              canvas.width,
              canvas.height
            );

            const dataURI = canvas.toDataURL("image/png", 1.0);
            const response = await fetch(dataURI);
            const arrayBuffer = await response.arrayBuffer();

            resolve({ image, buffer: Buffer(arrayBuffer) });
          } catch (error) {
            reject(error);
          }
        }
      };
    });
  };

  return { resize };
}
