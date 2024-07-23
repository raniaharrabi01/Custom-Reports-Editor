const ValidateSQLQuery = () =>
{
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
    setSuccessMessage("Requête SQL invalide");
    setShowSuccessPopup(true)
  })
  .catch(error => {
    console.error("Erreur:", error.message);
    setFailedMessage("Requête SQL invalide. Seules les requêtes SELECT sont autorisées.");
    setShowFailedPopup(true);
  });
}