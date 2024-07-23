
const deleteTemplate = (data,name,setRecord,setData,setFailedMessage,setSuccessMessage,setShowSuccessPopup,setShowFailedPopup) => {
    fetch('http://localhost:8080/Template/deleteTemplate', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: name
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du modèle");
        }
        return response;
      })
      .then(response => {
        setSuccessMessage("le modéle est supprimer");
        setShowSuccessPopup(true)
        const updatedData = data.filter(model => model.name !== name);
        // Mettre à jour l'état 'data' avec le tableau filtré
        setData(updatedData);
        // Mettre à jour l'état 'record' avec le tableau filtré
        const updatedChunks = [];
        const chunkSize = 5;
        for (let i = 0; i < updatedData.length; i += chunkSize) {
          updatedChunks.push(updatedData.slice(i, i + chunkSize));
        }
        setRecord(updatedChunks);
      })
      .catch(error => {
        console.error("Erreur:", error.message);
        setFailedMessage("une erreur se produit");
        setShowFailedPopup(true);
      });
  }
  export default deleteTemplate;