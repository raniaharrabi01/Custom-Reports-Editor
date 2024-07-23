import React from "react";
import { MdOutlineClose } from "react-icons/md";

const PopupContextData = ({ showModalContextData, setshowModalContextData, contextData }) => {

  const formattedContextData = typeof contextData === 'string' ? contextData.split(",").join(", ") : '';

  return (
    <>
      {showModalContextData && (
        <>
          <div className="fixed inset-0 z-30 backdropFilter" style={{ backdropFilter: "blur(2px)" }}></div>
           <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
             <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none w-[400px] h-[318px]" style={{ backgroundColor: "rgb(236, 246, 255)"}}>
                <button
                  className="ml-auto p-1"
                  style={{ color: "black" }}
                  onClick={() => setshowModalContextData(false)}
                >
                  <MdOutlineClose />
                </button>
                <div className="flex justify-center p-3 pt-0 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="font-bold text-[#4169E1] dark:text-[#4169E1] text-2xl">
                    Contexte
                  </h3>
                </div>
                <div className="relative p-6 pb-2 flex-auto">
                  <div>
                    <h3 className="flex justify-center font-medium text-lg text-[#4169E1]">
                      La liste des données :
                    </h3>
                   <div className="mt-4 flex justify-center">
                   <div className="m-4 relative font-medium text-lg" style={{ color: "black" }}>
                       {formattedContextData}
                     </div>
                   </div>
                  </div>
                </div>
                <div className="flex items-center justify-center pb-6">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setshowModalContextData(false);
                    }}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopupContextData;
