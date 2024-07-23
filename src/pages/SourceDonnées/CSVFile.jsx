import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useState,useEffect } from 'react';
import { MdUploadFile, MdFileDownloadDone } from "react-icons/md";
import './CSVFile.css'
import { useLocation } from 'react-router-dom';
import FormatDuRapport from './FormatDuRapport';
import generateReportfromCSVFile from '../../services/generateReportfromCSVFile';
import PopupListeModéles from './PopupListeModéles';
import Papa from 'papaparse';
import LoadingPopup from '../Popups/LoadingPopup';


const CSVFile = ({editor}) => {

    const [fileName, setFileName] = useState('');
    const [showLoadingPopup, setShowLoadingPopup] = useState(false);
    const [dataFile, setDataFile] = useState({});
    const [data, setData] = useState([]);
    const [headers, setHeaders ] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalTemplateData, setshowModalTemplateData] = useState(false);
    const [reportFormat, setSelectedFormat] = useState(false);
    const [variableName, setVariableName] = useState('');
    const [templateData, setTemplateData] = useState({
        cssData: '',
        htmlData: '',
        id: null
      });

      const handleChangeVariableName = (e) => {
        const Variable = e.target.value;
        setVariableName(Variable);
      };

      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                // Remove empty rows
                const filteredData = results.data.filter(row => Object.values(row).some(value => value !== ''));
                setData(filteredData);
                setHeaders(Object.keys(filteredData[0]));
            },
        });
        setFileName(file.name);
    };

    const handleDataFileUpload = () => {
        const formattedData = {};
        formattedData[variableName] = [];
        if (data.length > 0) {
            data.forEach(row => {
                const newRow = {};
                Object.keys(row).forEach(header => {
                    newRow[header] = row[header];
                });
                formattedData[variableName].push(newRow);
            });
        }
        setDataFile(formattedData);
    };

    const handleGenerateReport = () => {
        generateReportfromCSVFile(reportFormat, dataFile, editor, templateData, setShowLoadingPopup);
    };

    const location = useLocation();
  
    useEffect(() => {
      // Vérifier si location.state est défini et si location.state.templateData est défini
      if (location.state && location.state.templateData) {
        const { templateData: locationTemplateData } = location.state;
        setTemplateData(locationTemplateData);
      }
    }, [location.state]);

    console.log(templateData);

    useEffect(() => {
        console.log(dataFile);
      }, [dataFile]);
      
    
    return (
        <DefaultLayout>
    {showLoadingPopup && (
        <LoadingPopup />
        )}
            <Breadcrumb pageName="Source de données : Fichier CSV" />
            <div>
            <div>
         <h3 className="font-bold text-[#4169E1] dark:text-[#4169E1] mb-4 ml-4">Selectionner un modéle : </h3>
         <div className="flex items-center">
          <button type="button" className="ml-4 inline-flex items-center justify-center bg-black py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-4" onClick={() => setshowModalTemplateData(true)}>
          Sélectionner 
          </button>
          {showModalTemplateData ? (
            <PopupListeModéles setshowModalTemplateData={setshowModalTemplateData} setTemplateName={setTemplateName} setTemplateData={setTemplateData}/>
           ) : null}
          <div>
          <input
            name='templateName'
            value={templateName}
            type="text"
            id="templateName"
            placeholder="Nom du modèle"
            className="flex-1 border-[1.5px] border-stroke bg-white px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
           />
          </div>
          </div>
         </div>
                <div className='select_box'>
                <h3 className="font-medium text-xl text-black dark:text-white ml-4 mt-5 flex items-center justify-center rounded-md">
                   importer votre fichier ici : </h3>
                    <div className='file-container flex items-center justify-center mt-[-40px]'>
                        <input type="file" accept=".csv" onChange={handleFileUpload} id="fileInput" />
                        <div className="content ml-8">
                            <label htmlFor="fileInput" className="fileLabel -mt-5">
                                <div className='icons'>
                                    {fileName ? <MdFileDownloadDone /> : <MdUploadFile />}
                                </div>
                                <span className='labeler'>Charger un fichier</span>
                                <span id="fileName">{fileName ? `Nom du fichier : ${fileName}` : 'Aucun fichier sélectionné !'}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                <div className='font-medium text-xl text-black dark:text-white ml-8 mt-5 flex items-center justify-center rounded-md'>
                <h3>Spécifiez le nom du paramètre :</h3>
                </div>
               <input
                type="text"
                value={variableName}
                placeholder='paramètre'
                className="mt-5 ml-9 w-[150px] border-[1.5px] border-stroke bg-white p-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                onChange={handleChangeVariableName}
               />
              </div>
                <div className="flex justify-center mt-7 ml-[30px]">
                    <button className="inline-flex items-center justify-center rounded-full bg-black py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-4" onClick={() => {handleDataFileUpload(),setShowModal(true)}}>
                        Générer un rapport
                    </button>
                </div>
            </div>
            {showModal ? (
                <FormatDuRapport setShowModal={setShowModal} setSelectedFormat={setSelectedFormat} handleGenerateReport={handleGenerateReport}/>
    ) : null}
        </DefaultLayout>
    )
}

export default CSVFile;
