import React from 'react';
import { useState } from 'react';
import icon from '../../images/icon/iconAdd.png';
import SucessPopup from "../Popups/SucessPopup.jsx";
import FailedPopup from "../Popups/FailedPopup.jsx";


const RequêteSQL = ({ valuesArray,setValuesArray }) => {
  const [Valide, setValide] = useState(false);
  const [sqlquery, setSQLquery] = useState('');
  const [variableName, setVariableName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failedMessage, setFailedMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);

  const handleChangeSQLquery = (e) => {
    const sql = e.target.value;
    setSQLquery(sql);
  };

  const handleChangeVariableName = (e) => {
    const Variable = e.target.value;
    setVariableName(Variable);
  };

  const handleButtonClick = () => {
    if (Valide) {
    const newValues = {
      variableName,
      sqlquery
    };
    setValuesArray([...valuesArray, newValues]);
    setVariableName('');
    setSQLquery('');
    console.log(valuesArray);
  }
  else 
  {
    setFailedMessage('Validé votre Requête SQL');
    setShowFailedPopup(true);
  }
  }

  const validerSQLRequete = () => {
    const sqlQuery = sqlquery.trim();
    const sqlRegex = /^SELECT.*FROM.*$/i;
    // Vérifier si la requête SQL correspond au motif
    const isValidSql = sqlRegex.test(sqlQuery);
    if (isValidSql) {
      setSuccessMessage('Requête SQL validée');
      setShowSuccessPopup(true);
      setValide(true);
    } else {
      setFailedMessage('Requête SQL invalide');
      setShowFailedPopup(true);
      setSQLquery('');
    }
  };

  return (
    <div>
    <SucessPopup showSuccessPopup={showSuccessPopup} setShowSuccessPopup={setShowSuccessPopup} message={successMessage}/>
    <FailedPopup showFailedPopup={showFailedPopup} setShowFailedPopup={setShowFailedPopup} message={failedMessage}/>
    <form>
    <h4 className="text-[#4169E1] dark:text-[#4169E1] font-semibold mb-8">
      Intégrer données par une requête SQL :
    </h4>
    <div className="grid grid-cols-2">
      <div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[500px]">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <div className="form-group">
              <label htmlFor="requeteSQL" className="mb-3 block text-sm font-medium text-black dark:text-white">
                Écrire une requête SQL :
              </label>
              <div className="flex items-center">
               <input
                type="text"
                value={variableName}
                placeholder='paramètre'
                className="w-[150px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                onChange={handleChangeVariableName}
               />
               <textarea
                type="text"
                value={sqlquery}
                placeholder='requête SQL'
                className="w-[350px] h-[49px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                onChange={handleChangeSQLquery}
              />
              <button type="button" className='ml-3' onClick={()=> handleButtonClick()}><img src={icon} className="w-8" /></button>
             </div>
            </div>
            <div className="">
              <div className="flex">
              <button
               type="button"
               className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-4 mt-4 mr-2"
               onClick={() => validerSQLRequete()}
              >
               Valider
             </button>
              </div>
              <div className="mt-4">
          {valuesArray.map((value, index) => (
          <div key={index} className="flex items-center inline-block bg-gray-200 rounded-full px-3 py-1 m-1">
            <h3 className='mr-2 font-medium text-black'>Requête {index+1} : </h3>
            <span className="text-gray-800 mr-1 border rounded-l-lg border-none font-medium text-black p-2 bg-slate-100" style={{backgroundColor: 'rgb(206, 224, 242)'}}>{value.variableName}</span>
            <span className="text-gray-800 border rounded-r-lg border-none p-2 font-medium text-black" style={{backgroundColor: 'rgb(206, 224, 242)'}}>{value.sqlquery}</span>
          </div>
        ))}
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
  );
};

export default RequêteSQL;