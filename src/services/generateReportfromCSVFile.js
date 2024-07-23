 const  generateReportfromCSVFile  = (reportFormat , dataFile, editor, templateData, setShowLoadingPopup) => {
    let htmlData, cssData, id;
    if (editor) {
        htmlData = editor.getHtml();
        cssData = editor.getHtml();
    } else {
        htmlData = templateData.htmlData;
        cssData = templateData.cssData;
        id = templateData.id;
    }
    const Html = htmlData.replace(/"/g, "'");
    const modelData = { htmlData: Html, cssData: cssData, id: id };
    console.log(modelData);
    const FileData = { dataFile: dataFile, modelData: modelData };
    console.log(FileData);
    // Determine the endpoint URL based on the selected format
    let endpoint = '';
    if (reportFormat === 'pdf') {
        endpoint = 'ExportPDFReport/FromCSVFile';
    } else if (reportFormat === 'html') {
        endpoint = 'ExportHtmlReport/FromCSVFile';
    } else if (reportFormat === 'excel') {
        endpoint = 'ExportExcelReport/FromCSVFile';
    }
    fetch(`http://localhost:8080/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FileData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la génération du rapport");
            }
            return response.text();
        })
        .then(response => {
            if (reportFormat === 'pdf') {
                downloadPDF(response);
                setShowLoadingPopup(false);
            } else if (reportFormat === 'excel') {
                saveAsXlsxFile(response);
                setShowLoadingPopup(false);
            }         })
        .catch(error => {
            console.error("Erreur:", error.message);
            console.log(error.message);
        });

        function downloadPDF(pdf) {
            const linkSource = `data:application/pdf;base64,${pdf}`;
            const downloadLink = document.createElement("a");
            const fileName = "report.pdf";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        }
        function saveAsXlsxFile(excel){
            var mediaType=`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excel}`;
            var a = document.createElement('a');
            a.href = mediaType;
            a.download = 'report.xlsx';
            a.click();
        }    
};
export default generateReportfromCSVFile;