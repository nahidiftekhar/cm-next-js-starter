import Compressor from 'compressorjs';

export async function compressImage(file, quality, originalHeight, originalWidth) {
    return await new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: quality,
            maxWidth: 400,
            maxHeight: originalHeight && originalWidth ? 400*originalHeight/originalWidth : 300,
            success(result) {
                resolve(result);
            },
            error(err) {
              console.log(err.message);
                reject(err);
            },
          });
        ;
    });
  }
