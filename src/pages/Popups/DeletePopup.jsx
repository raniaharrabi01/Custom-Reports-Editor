import React from "react";

const DeletePopup = ({ setShowDeletePopup, showDeletePopup, setDeleteModel }) => {
  return (
    <>
      {showDeletePopup && (
        <div className="fixed top-0 mt-20 left-0 w-full h-full flex justify-center items-start z-50 p-4">
          <div className="relative flex items-center p-4 text-sm text-black bg-slate-200 rounded-lg shadow-md" role="alert">
            <button
              type="button"
              onClick={() => setShowDeletePopup(false)}
              className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-black">
                Êtes-vous sûr de vouloir supprimer ce produit ?
              </h3>
              <button
                onClick={() => {setDeleteModel(true)}}
                data-modal-hide="popup-modal"
                type="button"
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Oui, supprimer 
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white ml-10 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Non, annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePopup;
