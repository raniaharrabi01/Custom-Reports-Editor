const getListTablesAndCulumns = (DataBaseConnexion,setTablesAndColumns,setConnectionEstablished,setShowInput,SQLisActive,OracleisActive,PostgreisActive) => {
    console.log(DataBaseConnexion);
    let endpoint = '';
    if(SQLisActive){
        endpoint="SQLDataBase";
    }
    else if(OracleisActive){
        endpoint="OracleDataBase";
    }
    else if(PostgreisActive){
        endpoint="PostgreDataBase";
    }
    console.log(endpoint);
      fetch(`http://localhost:8080/tablesAndColumns/${endpoint}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(DataBaseConnexion),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Erreur lors de la récupération des noms de tableaux et colonnes");
          }
          return response.json();
      })
      .then(data => {
          setTablesAndColumns(data);
          setShowInput(false);
          setConnectionEstablished(true);
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des noms de tableaux et colonnes:", error.message);
      });
  };
export default getListTablesAndCulumns;