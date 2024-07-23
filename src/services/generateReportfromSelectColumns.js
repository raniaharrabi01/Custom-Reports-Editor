const generateReportfromSelectColumns = (reportFormat,DataBaseConnexion,columnsData,tableName,templateData,editor,setShowLoadingPopup,templateName ) => {
    setShowLoadingPopup(true);
    let name = templateName;
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
    const ReportRequest ={modelData : modelData , data : DataBaseConnexion, columnsData : columnsData}
   let endpoint = '';
    if (reportFormat === 'pdf') {
        endpoint = 'ExportPDFReport/FromSelectColumns';
    } else if (reportFormat === 'html') {
        endpoint = 'ExportHtmlReport/FromSelectColumns';
    } else if (reportFormat === 'excel') {
        endpoint = 'ExportExcelReport/FromSelectColumns';
    }
    fetch(`http://localhost:8080/${endpoint}/${tableName}`, {
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
                downloadPDF(response,name);
                setShowLoadingPopup(false);
            } else if (reportFormat === 'excel') {
                saveAsXlsxFile(response,name);
                setShowLoadingPopup(false);
            }            
        })
        .catch(error => {
            console.error("Erreur:", error.message);
        });
      };

      function downloadPDF(pdf,name) {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = name+".pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    function saveAsXlsxFile(excel,name){
        var mediaType=`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excel}`;
        var a = document.createElement('a');
        a.href = mediaType;
        a.download = name+'.xlsx';
        a.click();
    }
        
export default generateReportfromSelectColumns;
  