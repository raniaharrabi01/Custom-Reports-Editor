import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";


const FailedPopup = ({ showFailedPopup, setShowFailedPopup, message }) => {
  return (
    <>
      {showFailedPopup && (
        <div className="fixed bottom-65 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="w-[450px] flex items-center p-6 mt-15 text-lg text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <MdReportProblem className="mr-4 ml-2 flex-shrink-0 inline w-8 h-8 me-3" />
            <div className="flex-grow">
              <span className="font-bold pr-1">Échec!</span> {message}.
            </div>
            <button onClick={() => setShowFailedPopup(false)} className="ml-auto">
              <MdOutlineClose className="w-5 h-5 mr-[-18px] mt-[-35px] text-red-800 dark:text-red-400" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FailedPopup;
