import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const PopupContext = ({ showModal, setShowModal, action, setAddcontext, ContextData }) => {

  const [tagsInput, setTagsInput] = useState("");
  const [context, setContext] = useState("");


 useEffect(() => {
    console.log(ContextData);
    if (typeof ContextData === 'string' && ContextData.trim() !== "") {
      setContext(ContextData);
      setAddcontext(true);
    }
  }, [ContextData]);


  function handleInputChange(event) {
    setTagsInput(event.target.value);
  }
  

  function handleKeyDown(event) {
    if (event.key === "Enter" && tagsInput.trim() !== "") {
      addTag(tagsInput.trim());
      setTagsInput("");
      event.preventDefault();
    }
  }

  function addTag(tagText) {
      setContext((prevTags) => {
        const updatedTags = prevTags ? `${prevTags},${tagText}` : tagText;
        setAddcontext(true);
        return updatedTags;
      });
    }

  function removeTag(tagText) {
    setContext((prevTags) =>
      prevTags
        .split(",")
        .filter((tag) => tag !== tagText)
        .join(",")
    );
  }
  
  return showModal ? (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="w-[440px] order-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none" style={{ backgroundColor: "rgb(237 245 252)"}}>
            <button
              className="ml-auto p-1"
              onClick={() => setShowModal(false)}
              style={{ color: "black" }}
             >
              <MdOutlineClose />
            </button>
            <div className="flex justify-center p-3 pt-0 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="font-bold text-[#4169E1] dark:text-[#4169E1] text-2xl">
                Préparer le contexte
              </h3>
            </div>
            <div className="relative p-6 pb-2 flex-auto">
              <div>
                <h3 className="font-medium text-[#4169E1]">
                  Donner la liste des données :
                </h3>
                <div className="mt-4">
                  <div className="m-4 relative">
                    <input
                      type="text"
                      id="tags"
                      placeholder="Écrire un tag et appuyer sur Entrée"
                      value={tagsInput}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <div id="tags-container" className="cursor-pointer rounded-lg mt-4 p-6 flex flex-wrap gap-2 border border-black bg-slate-50">
                    {context && context.split(",").map((tagText, index) => (
                        <div key={index} className="tag">
                        <span className="text-larger font-auto text-black pl-2" style={{ fontSize: 'larger', fontFamily: 'auto' }}>{tagText}</span>
                          <span
                            className="tag-close pl-1"
                            data-tag={tagText}
                            onClick={() => removeTag(tagText)}
                            style={{ color: '#f57e7e', position: 'relative', bottom: '10px' }}
                            >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center pt-1 pb-4">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setShowModal(false);
                  action(context);
                }}
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-30 backdropFilter"
        style={{ backdropFilter: "blur(2px)" }}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default PopupContext;
