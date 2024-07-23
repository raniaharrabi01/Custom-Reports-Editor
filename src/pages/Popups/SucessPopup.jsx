import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const SucessPopup = ({ showSuccessPopup,setShowSuccessPopup,message }) => {

  return (
    <>
      {showSuccessPopup && (
        <div className="fixed bottom-65 left-0 w-full h-full flex justify-center items-center z-50">
        <div className="w-[450px] flex items-center p-6 mt-11 text-lg text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
        <IoCheckmarkDoneCircle className="mr-4 ml-2 flex-shrink-0 inline w-8 h-8 me-3" />
          <div className="flex-grow">
            <span className="font-bold pr-1">Succès!</span> {message}.
          </div>
        </div>
         <button className="mb-2" onClick={() => setShowSuccessPopup(false)}>
              <MdOutlineClose className="w-5 h-5 ml-[-25px] mt-[-3px] text-green-800 dark:text-green-400" />
          </button>
        </div>
      )}
    </>
  );
};

export default SucessPopup;
