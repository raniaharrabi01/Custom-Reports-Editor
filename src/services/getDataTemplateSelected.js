const getDataTemplateSelected = (name, setTemplateData) => {
  return fetch(`http://localhost:8080/Template/getDataTemplate/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des modèles');
      }
      return response.json();
    })
    .then((data) => {
      setTemplateData({
        id: data.id,
        htmlData: data.htmlData,
        cssData: data.cssData,
      });
      return {
        id: data.id,
        htmlData: data.htmlData,
        cssData: data.cssData,
      };
    });
};

export default getDataTemplateSelected;

