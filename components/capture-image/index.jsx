import { useState, useRef, Fragment } from 'react';
import Webcam from 'react-webcam';
import { Icon } from '../Icon';
import ButtonLoader from '../Button-Loading';

const CaptureImage = ({ screenshot, setScreenshot, handleSubmit, loading }) => {
  const webcamRef = useRef(null);

  const CaptureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {!screenshot ? (
        <div className="w-80 h-80">
          <div className="bg-slate-100 dark:bg-slate-800 w-full rounded-md p-1 mb-2 text-center text-[10px] center-flex font-medium">
            Please capture a clear photo of the visitor
          </div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            minScreenshotHeight={750}
            minScreenshotWidth={750}
          />
        </div>
      ) : (
        <div className="w-80 h-80">
          <div className="bg-slate-100 dark:bg-slate-800 w-full rounded-md p-1 mb-2 text-center text-[10px] center-flex font-medium">
            Confirm image
          </div>
          <img src={screenshot} alt="Selfie" />
        </div>
      )}

      <div className="flex justify-evenly -mt-10 -mb-5">
        {!screenshot ? (
          <button
            className="rounded-full aspect-square px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-400  text-white center-flex bg-white bg-opacity-100"
            onClick={CaptureSelfie}>
            <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-600 top-1/2 group-focus:h-64 group-focus:-translate-y-32 group-hover:h-64 group-hover:-translate-y-32 ease group-active:bg-black"></span>
            <span className="relative text-sky-600 transition duration-300 group-focus:text-white group-hover:text-white ease center-flex">
              <Icon nameIcon="BiSolidCamera" propsIcon={{ size: 24 }} />
            </span>
          </button>
        ) : (
          ''
        )}
      </div>

      {screenshot && (
        <div className="flex justify-evenly -mt-10 -mb-5">
          <div>
            <button
              className="rounded-full aspect-square p-1 m-1 mx-4 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600  text-white center-flex bg-white bg-opacity-100"
              onClick={() => setScreenshot(null)}>
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-red-700 top-1/2 group-focus:h-64 group-focus:-translate-y-32 group-hover:h-64 group-hover:-translate-y-32 ease group-active:bg-black"></span>
              <span className="relative text-red-600 transition duration-300 group-focus:text-white group-hover:text-white ease center-flex">
                {!loading ? (
                  <Icon nameIcon="BiX" propsIcon={{ size: 32 }} />
                ) : (
                  <div className="p-2">
                    <ButtonLoader
                      isProcessing={loading}
                      strokeClassName={'text-red-600'}
                    />
                  </div>
                )}
              </span>
            </button>
            <p className="text-red-600 text-[10px] text-center mt-1">
              Retake Photo
            </p>
          </div>

          <div>
            <button
              className="rounded-full aspect-square p-1 m-1 mx-4 overflow-hidden relative group cursor-pointer border-2 font-medium border-green-600 disabled:border-gray-400 text-white center-flex bg-white bg-opacity-100"
              onClick={handleSubmit}>
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-green-700 group-disabled:bg-gray-600 top-1/2 group-focus:h-64 group-focus:-translate-y-32 group-hover:h-64 group-hover:-translate-y-32 ease group-active:bg-black"></span>
              <span className="relative text-green-600 transition duration-300 group-disabled:text-gray-500 group-focus:text-white group-hover:text-white ease center-flex">
                {!loading ? (
                  <Icon nameIcon="BiCheck" propsIcon={{ size: 32 }} />
                ) : (
                  <div className="p-2">
                    <ButtonLoader
                      isProcessing={loading}
                      strokeClassName={'text-green-600'}
                    />
                  </div>
                )}
              </span>
            </button>
            <p className="text-green-600 text-[10px] text-center mt-1">
              Submit Photo
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureImage;
