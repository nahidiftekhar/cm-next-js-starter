/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';

import { generateRandomString } from '@/services/string-functions';
import { compressImage } from '@/services/image-compressor';
import { displayImageFromArrayBuffer } from '@/services/image-functions';

const AnotherImageUploader = ({
  imageFor,
  expectedHeight,
  existingImage,
}) => {

  const [visibleImage, setVisibleImage] = useState('');
  const [errorMessage, setErroMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingImage) {
      setVisibleImage(existingImage);
    }
  }, [existingImage]);

  function replaceSlash(str) {
    str = str.replace(/\//g, '-');
    return str;
  }

  const uploadFile = async (e) => {
    setLoading(true);
    setErroMessage('');
    const fileExtension =
      e.target.files[0].name.split('.')[
        e.target.files[0].name.split('.').length - 1
      ];
    if (
      e.target.files[0].size / 1024 > 5120 ||
      ['jpg', 'jpeg', 'png', 'JPG', 'PNG', 'JPEG'].indexOf(fileExtension) === -1
    ) {
      setErroMessage('Please upload image (jpg/png) below 5MB');
      setLoading(false);
      return false;
    }
    const fileName = `${generateRandomString(32)}.${fileExtension}`;
    const fileType = e.target.files[0].type;

    let imageWidth = 0;
    let imageHeight = 0;
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      imageWidth = img.naturalWidth;
      imageHeight = img.naturalHeight;
    };

    try {
      const compressedImage = await compressImage(
        e.target.files[0],
        0.6,
        imageHeight,
        imageWidth
      );

      const reader = new FileReader();
      reader.readAsArrayBuffer(compressedImage);
      reader.onload = async () => {
        const imageArrayBuffer = reader.result;
        // const fileId = await addDataToDB(fileName, imageArrayBuffer);
        // if (fileId) {
          // setImageIds((prev) => ({ ...prev, [imageFor]: fileId }));
          // const recordFromDb = await getDataByIdFromDB(fileId);
          // if (recordFromDb) {
            setVisibleImage(
              displayImageFromArrayBuffer(imageArrayBuffer, fileType)
            );
          // }
          setLoading(false);
          setErroMessage('');
        // }
      };
    } catch (error) {
      console.log(error);
      setErroMessage('Upload failed');
      setLoading(false);
    }
  };

  return (
    <section className={`container w-full mx-auto items-center min-h-[280px] bg-emerald-700`}>
      <div className="mx-auto rounded-lg overflow-hidden items-center">
        <div className={``}>
          <div
            id="image-preview"
            className={`min-h-[${expectedHeight}px] p-2 mb-1 bg-gray-100 dark:bg-gray-800 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer`}>
            <input
              id={imageFor}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={uploadFile}
            />
            {visibleImage ? (
              <img
                src={visibleImage}
                style={{ width: '100%', height: `${expectedHeight}px` }}
                className="object-contain rounded-lg"
                alt="Image preview"
              />
            ) : (
              <label
                htmlFor={imageFor}
                className={`cursor-pointer h-[200px] py-5`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto mb-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>

                <p className="font-normal text-sm text-gray-400 dark:text-gray-200 md:px-6">
                  Choose photo size should be less than{' '}
                  <b className="text-gray-600 dark:text-white">5mb</b>
                  &nbsp;and should be in{' '}
                  <b className="text-gray-600 dark:text-white">
                    JPG or PNG
                  </b>{' '}
                  format.
                </p>
              </label>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full">
              <label
                htmlFor={imageFor}
                className="w-full text-white dark:text-black bg-slate-600 dark:bg-white hover:bg-[#050708]/90 dark:hover:bg-shades-2/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-0 cursor-pointer">
                <span className="text-center ml-2">
                  {visibleImage ? 'Change Image' : 'Select Image'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnotherImageUploader;
