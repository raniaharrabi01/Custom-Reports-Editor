const getContextData = (setContextData,name) => {
    fetch(`http://localhost:8080/Template/getContextData/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération de la liste de données");
            }
            return response.text();
        })
        .then(response => {
            console.log(response);
            setContextData(response);
        })
        .catch(error => {
            console.error("Erreur:", error.message);
        });
}
export default getContextData;