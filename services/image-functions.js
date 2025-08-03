export function displayImageFromArrayBuffer(arrayBuffer, imageType) {
  // Create a Blob from the ArrayBuffer data
  const blob = new Blob([arrayBuffer], { type: imageType });

  // Create a URL for the Blob data
  const imageURL = URL.createObjectURL(blob);

  return { imageURL, blob };
}

export function arrayBufferToBlob(arrayBuffer) {
  return new Blob([arrayBuffer]);
}

export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const getImageDimensions = async (imageUrl, callback) => {
  const img = new Image();

  img.onload = function () {
    const dimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    // Invoke the callback with the original dimensions
    callback(dimensions);
  };

  // Set the image source, triggering the onload event
  img.src = imageUrl;
};

export const getImageDimensionsFromFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
  });
};
