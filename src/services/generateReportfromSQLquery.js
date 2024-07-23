const generateReportfromSQLquery = (reportFormat, DataBaseConnexion, valuesArray, templateData, editor, setShowLoadingPopup) => {
    let htmlData, cssData, id;
    if (editor) {
        htmlData = editor.getHtml();
        cssData = editor.getCss();
    } else {
        htmlData = templateData.htmlData;
        cssData = templateData.cssData;
        id = templateData.id;
    }
    const Html = htmlData.replace(/"/g, "'");
    const modelData = { htmlData: Html, cssData: cssData, id: id };
    const ReportRequest = { modelData: modelData, data: DataBaseConnexion, sqlquery:valuesArray }

    let endpoint = '';
    if (reportFormat === 'pdf') {
        endpoint = 'ExportPDFReport/FromSQLquery';
    } else if (reportFormat === 'html') {
        endpoint = 'ExportHtmlReport/FromSQLquery';
    } else if (reportFormat === 'excel') {
        endpoint = 'ExportExcelReport/FromSQLquery';
    }

    fetch(`http://localhost:8080/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ReportRequest)
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
            }       
        })
        .catch(error => {
            console.error("Erreur:", error.message);
        });
};

function downloadPDF(pdf,) {
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

export default generateReportfromSQLquery;
