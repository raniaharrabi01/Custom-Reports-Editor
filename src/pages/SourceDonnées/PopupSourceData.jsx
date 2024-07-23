import React from "react";
import { useNavigate } from 'react-router-dom';
import getDataTemplateSelected from '../../services/getDataTemplateSelected';
import { MdOutlineClose } from "react-icons/md";


const PopupSourceData = ({ showModalSourceData, setshowModalSourceData, name, setTemplateData, templateData }) => {

    const navigate = useNavigate();

    const GénérerRapport = (url) => {
        if(templateData){
            navigate(url, { state: { templateData: templateData , templateName: name } });
        }
        else if (name) {
            getDataTemplateSelected(name, setTemplateData).then(data => {
                console.log(data);
                navigate(url, { state: { templateData: data , templateName: name } });
            });
        } else {
            navigate(url);
        }
    }
    console.log(name);

    return (
      showModalSourceData && (
            <div>
                <div className="fixed inset-0 z-30 backdropFilter" style={{ backdropFilter: "blur(2px)" }}></div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[400px] h-[300px]" style={{ backgroundColor: "rgb(237 245 252)"}}>
                            <button className="ml-auto p-1" onClick={() => setshowModalSourceData(false)} style={{ color: "black" }}>
                               <MdOutlineClose />
                            </button>
                            <div className="flex justify-center pb-6 border-b border-solid border-blueGray-200 rounded-t">
                               <h3 className="font-bold text-[#4169E1] dark:text-[#4169E1] text-2xl">
                                    Source de données
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 pb-2 flex-auto">
                                <div>
                                    <h3 className="flex justify-center font-medium text-lg text-[#4169E1] p-2">Choisir votre source de données  :</h3>
                                    <div className="mt-4">
                                        <div className="flex justify-center items-center flex-col gap-2 mx-auto input-group mb-3 mt-2">
                                            <button className="w-[160px] inline-flex items-center justify-center rounded-md bg-black py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-4" onClick={() => { GénérerRapport("/DataSource/ExternalDataBase"); setshowModalSourceData(false); }}>Base de données</button>
                                            <button className="w-[160px] inline-flex items-center justify-center rounded-md bg-black py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-4" onClick={() => { GénérerRapport("/DataSource/CSVFile"); setshowModalSourceData(false); }}>Fichier CSV</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed inset-0 z-30 backdropFilter" style={{ backdropFilter: 'blur(2px)' }}></div>
            </div>
        )
    );
}

export default PopupSourceData;
