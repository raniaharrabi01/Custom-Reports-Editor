import React, { useState } from "react";
import ListColumns from "./ListColumns";

const ListeDesTables = ({ DataBaseConnexion, ListeTablesAndColumns, setTable, variableName, setColumns, setVariableName }) => {
  
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedColumnsMap, setSelectedColumnsMap] = useState({});

  const handleTableClick = (table, columns) => {
    setSelectedColumnsMap((prevMap) => ({
      ...prevMap,
      [selectedTable]: null, // Fermer la table précédemment ouverte
      [table]: columns // Ouvrir la nouvelle table
    }));
    setSelectedTable(table);
    setTable(table);
  };

  return (
    <div>
      <h3 className="font-semibold text-[#4169E1] dark:text-[#4169E1] pl-[28px]">Liste des tables de la base de données '{DataBaseConnexion.base_name}' : </h3>
      <ul className="mt-6 ml-10 flex flex-col gap-2.5">
        {ListeTablesAndColumns &&
          Object.entries(ListeTablesAndColumns).map(([table, columns]) => (
            <li key={table}>
              <div className="mb-2 block text-sm font-medium text-black dark:text-white flex items-center cursor-pointer group" onClick={() => handleTableClick(table, columns)}>
                <svg
                  className="fill-current mr-2 transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-800"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_130_9756)">
                    <path
                      d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_130_9756">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0 0.052124)"
                      />
                    </clipPath>
                  </defs>
                </svg>          
                <span className="text-base">{table}</span>
              </div>
              {selectedTable === table && (
                <ListColumns columns={columns} tableName={table} setColumns={setColumns} variableName={variableName} setVariableName={setVariableName} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListeDesTables;
