import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import RequéteSQL from './RequéteSQL';
import ListeDesTables from './ListeDesTables';
import getListTablesAndCulumns from '../../services/getListTablesAndColumns';
import PopupListeModéles from './PopupListeModéles';
import logo_mysql from '../../images/logo/logo_mysql4.png';
import logo_oracle from '../../images/logo/oracle-database.webp';
import postegre from '../../images/logo/postegre.jpg';
import FormatDuRapport from './FormatDuRapport';
import generateReportfromSQLquery from '../../services/generateReportfromSQLquery';
import generateReportfromSelectColumns from '../../services/generateReportfromSelectColumns';
import LoadingPopup from '../Popups/LoadingPopup';


const DataBase = ({editor}) =>{

  const [showModalTemplateData, setshowModalTemplateData] = useState(false);
  const [columnsData,setColumnsData] = useState({})
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [tableName, setTable] = useState('');
  const [tablesAndColumns, setTablesAndColumns] = useState({});
  const [reportFormat, setSelectedFormat] = useState(false);
  const [ConnectionEstablished, setConnectionEstablished] = useState(false);
  const [valuesArray, setValuesArray] = useState([]);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [variableName, setVariableName] = useState('');
  const [columns, setColumns] = useState([]);
  
  const [DataBaseConnexion, setDataBaseConnexion] = useState({
           username:"",
           base_name:"",
           password:"",
           host:"",
           port:"",
    });

    const [SQLisActive, setSQLIsActive] = useState(false);
    const [OracleisActive, setOracleIsActive] = useState(false);
    const [PostgreisActive, setPostgreIsActive] = useState(false);

    const handleClickSQL = () => {
      setSQLIsActive(!SQLisActive); // Inverse l'état du clic lorsque la carte est cliquée
      setShowInput(!SQLisActive);
      setPostgreIsActive(false); // Inverse l'état du clic lorsque la carte est cliquée
      setOracleIsActive(false); // Inverse l'état du clic lorsque la carte est cliquée

    };
    const handleClickOracle = () => {
      setOracleIsActive(!OracleisActive); // Inverse l'état du clic lorsque la carte est cliquée
      setShowInput(!OracleisActive);
      setSQLIsActive(false); // Inverse l'état du clic lorsque la carte est cliquée
      setPostgreIsActive(false); // Inverse l'état du clic lorsque la carte est cliquée
    };
    const handleClickPostgre = () => {
      setPostgreIsActive(!PostgreisActive); // Inverse l'état du clic lorsque la carte est cliquée
      setShowInput(!PostgreisActive);
      setSQLIsActive(false); // Inverse l'état du clic lorsque la carte est cliquée
      setOracleIsActive(false); // Inverse l'état du clic lorsque la carte est cliquée
    };

    const [templateData, setTemplateData] = useState({
      cssData: '',
      htmlData: '',
      id: null
    });

    const location = useLocation();
  
    useEffect(() => {
      // Vérifier si location.state est défini et si location.state.templateData est défini
      if (location.state && location.state.templateData) {
        const { templateData: locationTemplateData, templateName: locationTemplateName } = location.state;
        setTemplateData(locationTemplateData);
        setTemplateName(locationTemplateName); // Mettre à jour le nom du modèle
      }
    }, [location.state]);
  
    console.log(templateData);

  const handleChangeDataBase = (event) => {
     const { name, value } = event.target;
     setDataBaseConnexion(prevState => ({
       ...prevState,
       [name]: value
     }));
     if (value.trim() !== "") {
        setDataBaseConnexion(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
   };

  const handleSubmit = (event) => {
  event.preventDefault();
  getListTablesAndCulumns(DataBaseConnexion,setTablesAndColumns,setConnectionEstablished,setShowInput,SQLisActive,OracleisActive,PostgreisActive)
  };
  
  useEffect(() => {
  console.log(tablesAndColumns);
  }, [tablesAndColumns]);

  const handleGenerateReport = () => {
    if (columnsData.variableName && columnsData.columns && columnsData.columns.length > 0) {
      generateReportfromSelectColumns(reportFormat,DataBaseConnexion,columnsData,tableName,templateData,editor,setShowLoadingPopup,templateName);
      console.log(showLoadingPopup);
    }
    else {
      generateReportfromSQLquery(reportFormat, DataBaseConnexion, valuesArray, templateData, editor, setShowLoadingPopup, templateName);
    }
  }; 
  
  const handleDataColumns = () => {
    console.log(columns);
    const newData = {
      variableName: variableName,
      columns: columns
    };
    setColumnsData(newData);
    console.log(newData);
  }

    return(
    <DefaultLayout>
        {showLoadingPopup && (
        <LoadingPopup />
        )}
        <Breadcrumb pageName="Source de données : Base de données" />
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
            //onChange={handleNameChnage}
            type="text"
            id="templateName"
            placeholder="Nom du modèle"
            className="flex-1 border-[1.5px] border-stroke bg-white px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
           />
          </div>
          </div>
         </div>
          <h1 className="ml-4 mt-6" style={{ marginBottom: '-21px' }}> Les types de Bases de données disponibles :</h1>
            <div>
               {/* le code du cards */}
            <div className="flex justify-start">
            <div className="text-lg m-6 group relative w-[160px] mt-10" >
            <div className={`w-full max-w-sm bg-white ${SQLisActive ? 'border border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/50' : ''} rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
             <div className="flex justify-end px-4 pt-4">
             </div>
             <div className="flex flex-col items-center pb-10">
             <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={logo_mysql} alt="logo MySQL"/>
             <span className="text-sm text-gray-500 dark:text-gray-400">MySQL</span>
             <div className="flex mt-4 md:mt-6">
             <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() =>handleClickSQL()}>Selectionner</a>
            </div>
            </div>
            </div>
            </div>
            <div className="text-lg m-6 group relative w-[160px] mt-10" onClick={handleClickPostgre}>
            <div className={`w-full max-w-sm bg-white ${PostgreisActive ? 'border border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/50' : ''} rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
             <div className="flex justify-end px-4 pt-4">
             </div>
             <div className="flex flex-col items-center pb-10">
             <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={postegre} alt="logo MySQL"/>
             <span className="text-sm text-gray-500 dark:text-gray-400">postgreSQL</span>
             <div className="flex mt-4 md:mt-6">
             <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">Selectionner</a>
            </div>
            </div>
            </div>
            </div>
            <div className="text-lg m-6 group relative w-[160px] mt-10">
            <div className={`w-full max-w-sm bg-white ${OracleisActive ? 'border border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/50' : ''} rounded-lg dark:bg-gray-800 shadow dark:border-gray-700`}>
             <div className="flex justify-end px-4 pt-4">
             </div>
             <div className="flex flex-col items-center pb-10">
             <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={logo_oracle} alt="logo MySQL"/>
             <span className="text-sm text-gray-500 dark:text-gray-400">Oracle</span>
             <div className="flex mt-4 md:mt-6">
             <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" >Selectionner</a>
            </div>
            </div>
            </div>
            </div>
            </div>
            {/* formulaire de connexion de la base de données */}
          {showInput && (
         <form onSubmit={handleSubmit}>
         <div className="flex justify-center">
         <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{width: '800px'}}>
       <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
       <h3 className="font-bold text-[#4169E1] dark:text-[#4169E1]" style={{display: 'flex', justifyContent: 'center'}}>Connection base de données</h3>
       </div>
       <div className="flex flex-col gap-5.5 p-6.5">

        <div className='flex'>
       <div className="w-1/2">
           <label htmlFor="host" className="mb-3 ml-2 block text-sm font-medium text-black dark:text-white">
             Host :
           </label>
           <input
             name="host"
             value={DataBaseConnexion.host} onChange={handleChangeDataBase}
             type="text"
             id="host"
             placeholder="Host de la base de données"
             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
           />
         </div>

         <div className="w-1/2">
           <label htmlFor="port" className="mb-3 ml-2 block text-sm font-medium text-black dark:text-white">
             Port :
           </label>
           <input
             name="port"
             value={DataBaseConnexion.port} onChange={handleChangeDataBase}
             type="text"
             id="port"
             placeholder="Port de la base de données"
             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
           />
         </div>
         </div>

         <div>
           <label htmlFor="username" className="mb-3 ml-2 block text-sm font-medium text-black dark:text-white">
             Nom d'utilisateur :
           </label>
           <input
             name="username"
             value={DataBaseConnexion.username} onChange={handleChangeDataBase}
             type="text"
             id="username"
             placeholder="Nom d'utilisateur de la base de données"
             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
           />
         </div>

         <div>
           <label htmlFor="password" className="mb-3 ml-2 block text-sm font-medium text-black dark:text-white">
             Mot de passe :
           </label>
           <input
             name="password"
             value={DataBaseConnexion.password} onChange={handleChangeDataBase}
             type="password"
             id="password"
             placeholder="Mot de passe de la base de données"
             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
           />
         </div>

         <div>
           <label htmlFor="base_name" className="mb-3 ml-2 block text-sm font-medium text-black dark:text-white">
             Nom de la base de données :
           </label>
           <input
              name='base_name'
             value={DataBaseConnexion.base_name} onChange={handleChangeDataBase}
             type="text"
             id="base_name"
             placeholder="Nom de la base de données"
             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
           />
         </div>

         <div className="flex justify-center">
          <button type="submit" className="inline-block rounded-full bg-black py-3 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-9 xl:px-4 mt-2">Connecter</button>
        </div>
       </div>
        </div>
       </div>
        </div>
        </form>
        )}
        {ConnectionEstablished && ! showInput && (
          <div>
            <div> 
            <h2 className="pl-[26px] pb-8 pt-4 text-base font-semibold text-black dark:text-white">
             Explorer la base de données :
           </h2>            
           </div>
          <div className="grid grid-cols-2 divide-x">
            <div className="">
              <ListeDesTables DataBaseConnexion={DataBaseConnexion} ListeTablesAndColumns={tablesAndColumns} variableName={variableName} setTable={setTable} setColumns={setColumns} setVariableName={setVariableName} handleGenerateReport={handleGenerateReport} />
            </div>
            <div className="px-20">
              <div>            
                <p className="mt-[-49px] ml-[-106px] w-[50px] pl-1 pb-2 border border-black text-4xl">ou</p>
             </div>
              <RequéteSQL valuesArray={valuesArray} setValuesArray={setValuesArray }/>
            </div>
          </div>
          <div className="flex justify-center">
                 <button
                     type="button"
                      className="flex items-center justify-center rounded-full bg-black py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-4 mt-4"
                      onClick={() => {handleDataColumns(); setShowModal(true)}}
                        >
                     Générer un rapport
                    </button>
          </div>
            {showModal && (
              <FormatDuRapport
               setShowModal={setShowModal}
               setSelectedFormat={setSelectedFormat}
               handleGenerateReport={handleGenerateReport}
            />
            )}
         </div>
       )}
       </div>
      </div>
    </DefaultLayout>  
);
};
export default DataBase;