const getListTemplate = (setRecord,setData) => {
    fetch('http://localhost:8080/Template/getAllTemplateData')
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des modéles");
        }
        return response.json();
       })
       .then(modelData => {
        setData(modelData);
        // Diviser les données en ensembles de taille fixe, par exemple 5 éléments par ensemble
        const chunks = [];
        const chunkSize = 5;
        for (let i = 0; i < modelData.length; i += chunkSize) {
          chunks.push(modelData.slice(i, i + chunkSize));
        }
        setRecord(chunks);
      })
      .catch(error => {
        console.error("Erreur:", error.message);
      });
  }
  export default getListTemplate;