import React from "react";
import { MdOutlineClose } from "react-icons/md";

const FormatDuRapport = ({ setShowModal , setSelectedFormat, handleGenerateReport }) => {

    const handleFormatChange = (format) => {
        setSelectedFormat(format);
    };
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[500px] h-[300px]" style={{ backgroundColor: "rgb(237 245 252)"}}>
                        <button className="ml-auto p-1" style={{color : "black"}} onClick={() => setShowModal(false)}>
                            <MdOutlineClose />
                        </button>
                        <div className="flex justify-center items-center p-3 pt-0 border-b border-solid border-blueGray-200 rounded-t" style={{ color : "black"}}>
                          <h3 className="font-bold text-[#4169E1] dark:text-[#4169E1] text-2xl">
                             Les formats de rapport disponibles
                          </h3>
                        </div>
                        <div className="relative p-6 pb-2 flex-auto">
                            <div>
                                <h3 className="font-medium text-lg text-[#4169E1]">Choisissez le format souhaité :</h3>
                                <div className="mt-4">
                                    <div className="input-group mb-3 mt-2">
                                        <input className="form-check-input mr-2" type="radio" name="format" id="pdf" value="pdf" onChange={() => handleFormatChange('pdf')} />
                                        <label htmlFor="pdf" className="font-medium text-black">PDF</label>
                                    </div>
                                    <div className="input-group mb-3 mt-2">
                                        <input className="form-check-input mr-2" type="radio" name="format" id="excel" value="excel" onChange={() => handleFormatChange('excel')} />
                                        <label htmlFor="excel" className="font-medium text-black">Excel</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-3">
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => { setShowModal(false); handleGenerateReport(); }}
                            >
                                Générer un rapport
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-30 backdropFilter" style={{ backdropFilter: 'blur(2px)' }}></div>
        </>
    )
}

export default FormatDuRapport;