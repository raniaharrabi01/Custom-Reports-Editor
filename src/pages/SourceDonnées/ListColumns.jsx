import React, { useState } from 'react';

const ListColumns = ({ columns, setColumns, variableName, setVariableName }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleChangeVariableName = (e) => {
    const Variable = e.target.value;
    setVariableName(Variable);
  };

  const handleCheckboxChange = (index) => {
    const columnName = columns[index];
    const newSelectedColumns = selectedColumns.includes(columnName)
      ? selectedColumns.filter((col) => col !== columnName)
      : [...selectedColumns, columnName];
    setSelectedColumns(newSelectedColumns);
    setColumns(newSelectedColumns);
    setSelectAll(newSelectedColumns.length === columns.length);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    const newSelectedColumns = newSelectAll ? columns : [];
    setSelectAll(newSelectAll);
    setSelectedColumns(newSelectedColumns);
    setColumns(newSelectedColumns); 
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark mt-8 ml-6 w-[300px]">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h1 className="font-medium mb-4" style={{ color: 'rgb(65, 105, 225)' }}>Liste des colonnes :</h1>
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="select_all"
                name="select_all"
                value="select_all"
                checked={selectAll}
                className="mr-2 h-6 w-6 rounded border"
                onChange={handleSelectAllChange}
              />
              <label
                htmlFor="select_all"
                className="flex items-center cursor-pointer select-none text-black"
                style={{ width: 'calc(100% - 28px)' }}
              >
                Sélectionner tout
              </label>
            </div>
            {columns.map((name, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`checkbox_${name}`}
                  name={name}
                  value={name}
                  checked={selectedColumns.includes(name)}
                  className="mr-2 h-6 w-6 rounded border"
                  onChange={() => handleCheckboxChange(index)}
                />
                <label
                  htmlFor={`checkbox_${name}`}
                  className="flex items-center cursor-pointer select-none text-black"
                  style={{ width: 'calc(100% - 28px)' }}
                >
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
       <div className="flex items-center justify-center mt-5">
         <h3 className="font-medium text-xl text-black dark:text-white mr-4 ml-[-70px]">Spécifiez le nom du paramètre :</h3>
         <input
           type="text"
           value={variableName}
           placeholder="paramètre"
           className="w-[150px] border-[1.5px] border-stroke bg-white p-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
           onChange={handleChangeVariableName}
         />
      </div>
    </div>
  );
};

export default ListColumns;
