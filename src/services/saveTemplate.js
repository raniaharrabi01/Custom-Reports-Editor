
const SaveTemplate = (context,htmlData,cssData,name,id,setFailedMessage,setSuccessMessage,setShowSuccessPopup,setShowFailedPopup,setTemplateSaved) => {
  
  const dataModel = { htmlData: htmlData, cssData: cssData, name: name, id: id, context: context };
  console.log(dataModel);
  if (id != null) { 
    fetch("http://localhost:8080/Template/ModifyTemplateData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataModel),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la modification des données du modèle");
      }
    })
    .then(response => {
      setSuccessMessage("Les données ont été modifiées avec succès");
      setShowSuccessPopup(true)
    })
    .catch(error => {
      console.error("Erreur:", error.message);
      setFailedMessage("Le nom du modèle est déjà utilisé, veuillez choisir un autre nom.");
      setShowFailedPopup(true);
    });
  }
  else
  {
    const dataModel = { htmlData: htmlData, cssData: cssData, name: name, context: context };
    console.log(dataModel);
        fetch("http://localhost:8080/Template/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataModel),
        })
          .then((response) => {
            if (response.ok) {
              setSuccessMessage("Modèle enregistré avec succès");
              setShowSuccessPopup(true);
              setTemplateSaved(true);
            } else {
              throw new Error("Erreur lors de l'enregistrement du modéle");
            }
          })
          .catch((error) => {
            setFailedMessage("Une erreur s'est produite lors de l'enregistrement du modéle");
            setShowFailedPopup(true);
          });
      }
  };

export default SaveTemplate;