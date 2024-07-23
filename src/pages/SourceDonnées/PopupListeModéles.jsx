import React, { useState,useEffect } from "react";
import getListTemplate from '../../services/getListTemplate';
import icon from '../../images/icon/iconAdd.png';
import getDataTemplateSelected from '../../services/getDataTemplateSelected';
import { MdOutlineClose } from "react-icons/md";


const PopupListeModéles = ({setshowModalTemplateData, setTemplateName, setTemplateData}) => {


  const [data, setData] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTable, setCurrentTable] = useState(1);
  const [record, setRecord] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const handleDataTemplate = (name) => {
    getDataTemplateSelected(name,setTemplateData);
  };

  useEffect(() => {
    handleGetListTemplate();
  }, []);

  const handleGetListTemplate = () => {
    getListTemplate(setRecord,setData)
  }
  
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentTable((prevTable) => prevTable + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setCurrentTable((prevTable) => prevTable - 1);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const Filter = () => {
    setFilteredRecords(data.filter((f) => f.name.toLowerCase().includes(filterValue.toLowerCase())));
  };

  const modelsToRender =
    filteredRecords.length > 0 && filterValue !== "" ? filteredRecords : record[currentPage];

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
           <div className="relative w-auto my-6 mx-auto max-w-[900px] custom-modal-container ml-[400px]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none mt-[80px]" style={{ backgroundColor: "rgb(237 245 252)"}}>
                <button className="ml-auto p-1" onClick={() => setshowModalTemplateData(false)} style={{ color : "black"}}>
                   <MdOutlineClose />
                </button>
                <div className="flex justify-center p-3 pt-0 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="font-bold text-[#4169E1] dark:text-[#4169E1] text-xl">
                     Choisir un modéle  
                  </h2>
                </div>
                <div className="flex flex-col gap-10">
              <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ml-[65]" style={{ backgroundColor: "rgb(237 245 252)"}}>
              <div className="flex justify-between px-8 pb-4 pl-1">
                <div className="w-100">
                  <input className="w-full rounded-md border border-stroke bg-white px-8 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" type='text' placeholder='rechercher un modéle'  onChange={event => {Filter(event); handleFilterChange(event);}}/>
                </div>
              </div>
              <div className="max-w-full overflow-x-auto pl-10" style={{paddingLeft: '10px'}}>
                <table className="w-full table-auto">
                  {/* En-tête du tableau */}
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-[#cbd5e1]">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11" style={{ backgroundColor: "rgb(237 245 252)", paddingLeft: "100px"}}>
                        Nom du modéle
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white" style={{ backgroundColor: "rgb(237 245 252)"}}>
                        Date d'enregistrement
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white" style={{ backgroundColor: "rgb(237 245 252)"}}>
                        Date de modification
                      </th>
                    </tr>
                  </thead>
                  {/* Corps du tableau */}
                  <tbody>
                   {modelsToRender?.map((model, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#cbd5e1] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="flex font-medium text-black dark:text-white pl-[-3]" style={{paddingLeft: '-3px'}}>
                            <button onClick={()=>{setTemplateName(model.name);handleDataTemplate(model.name);setshowModalTemplateData(false)}}><img src={icon} className="w-10 ml-[-18px]"/></button>
                            <label style={{paddingLeft: '30px'}}>{model.name}</label>
                          </h5>
                        </td>
                        <td className="border-b border-[#cbd5e1] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {model.saveDate}
                          </p>
                        </td>
                        <td className="border-b border-[#cbd5e1] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {model.modifyDate}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
     <ul className="flex justify-end mr-2 mt-5">
     <li>
      <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPage} disabled={currentPage === 0}>
        <span className="sr-only">Previous</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
      </button>
    </li>
    {record.map((_, index) => (
      <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
        <button className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index ? 'bg-blue-80 border-blue-600 text-blue-600 bg-blue-200 hover:text-blue-800' : ''}`} onClick={() => setCurrentPage(index)}>
          {index + 1}
        </button>
      </li>
    ))}
    <li>
      <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPage} disabled={currentPage === record.length - 1}>
        <span className="sr-only">Next</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </li>
  </ul>
</nav>
        </div>
           </div>
              </div>
            </div>
           </div>
          <div className="fixed inset-0 z-30 backdropFilter" style={{ backdropFilter: 'blur(2px)' }}></div>
      </div>
  )
};

export default PopupListeModéles;
