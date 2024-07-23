import { useEffect, useState, useRef } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Modéle from './pages/Modéle';
import CreateTemplate from './pages/Template/CreateTemplate';
import DataBase from './pages/SourceDonnées/DataBase';
import CSVFile from './pages/SourceDonnées/CSVFile';
import saveTemplate from './services/saveTemplate';
import PopupTemplateName from "./pages/Template/PopupTemplateName.jsx";
import PopupContext from "./pages/Template/PopupContext.jsx";
import PopupSourceData from "./pages/SourceDonnées/PopupSourceData.jsx";
import getDataTemplateSelected from "./services/getDataTemplateSelected";
import getContextData from "./services/getContextData";
import SucessPopup from "./pages/Popups/SucessPopup.jsx";
import FailedPopup from "./pages/Popups/FailedPopup.jsx";


function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [editor, setEditor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalSourceData, setshowModalSourceData] = useState(false);
  const [ShowModalAddContext, setShowModalAddContext] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failedMessage, setFailedMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [context, setContext] = useState({});
  const [ContextData, setContextData] = useState({});
  const [addcontext, setAddcontext] = useState(false);
  const [TemplateSaved, setTemplateSaved] = useState(false);
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState({
    cssData: '',
    htmlData: '',
    id: null
  });


  const addContextRef = useRef(addcontext);
  const TemplateSavedRef = useRef(TemplateSaved);


  useEffect(() => {
    addContextRef.current = addcontext;
  }, [addcontext]);


  useEffect(() => {
    TemplateSavedRef.current = TemplateSaved;
  }, [TemplateSaved]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  useEffect(() => {
    console.log(successMessage);
  }, [setSuccessMessage]);


  useEffect(() => {
    document.addEventListener(
      "addTemplate",
      (e) => {
        setEditor(e.detail.editor);
        console.log(addContextRef.current);
        if (addContextRef.current) {
          setShowModal(true);  
        } else {
          setFailedMessage("Préparez le contexte avant d'enregistrer votre modèle");
          setShowFailedPopup(true);   
        }
      },
      false,
    );
    setTimeout(() => setLoading(false), 1000);
  }, []);


  useEffect(() => {
    document.addEventListener(
      "addContext",
      (e) => {
        setEditor(e.detail.editor);
        setShowModalAddContext(true);
      },
      false,
    );
  }, []);


 const addTemplateActionHandler = (template_name) => {
    const htmlData = editor.getHtml().replace(/"/g, "'");
    const cssData = editor.getCss();
    const default_Html = "<body></body>";
    if (htmlData === default_Html) {
      setFailedMessage("Préparez votre modèle");
      setShowFailedPopup(true);
    } else 
      {
        saveTemplate(context,htmlData,cssData,template_name,templateData.id,setFailedMessage,setSuccessMessage,setShowSuccessPopup,setShowFailedPopup,setTemplateSaved);
        setTemplateName(template_name);
      }
 }
 
 const addContextActionHandler = (context) => {
  console.log(context);
  setContext(context);
  console.log(addcontext);
 }

 useEffect(() => {
  document.addEventListener(
    "modifieTemplateData",
    (e) => {
      getDataTemplateSelected(e.detail.name,setTemplateData);
      getContextData(setContextData,e.detail.name)
      navigate("/CreateTemplate");
      },
    false,
  );
 }, []);



 const getData = (editor) => {
  const htmlData = editor.getHtml().replace(/"/g, "'");
  const cssData = editor.getCss();
  setTemplateData({
    ...templateData,
    htmlData: htmlData,
    cssData: cssData
  });
}


 useEffect(() => {
  document.addEventListener(
    "passEditor",
    (e) => {
        getData(e.detail.editor);
        if(TemplateSavedRef.current == true){
          setshowModalSourceData(true);
        }else {
          setFailedMessage("Enregistrez votre modèle avant de générer votre rapport");
          setShowFailedPopup(true);
        }
    },
    false,
  );
}, []);


useEffect(() => {
  document.addEventListener(
    "retour",
    () => {
      navigate('/TemplateList');  
      localStorage.removeItem("gjsProject");
    },
    false,
  );
}, []);


  return loading ? (
    <Loader />
  ) : (
    <>
      <PopupTemplateName showModal={showModal} setShowModal={setShowModal} action={addTemplateActionHandler} />
      <SucessPopup showSuccessPopup={showSuccessPopup} setShowSuccessPopup={setShowSuccessPopup} message={successMessage}/>
      <FailedPopup showFailedPopup={showFailedPopup} setShowFailedPopup={setShowFailedPopup} message={failedMessage}/>
      <PopupSourceData showModalSourceData={showModalSourceData} setshowModalSourceData={setshowModalSourceData} templateData={templateData} name={templateName} />
      <PopupContext showModal={ShowModalAddContext} setShowModal={setShowModalAddContext} action={addContextActionHandler} setAddcontext={setAddcontext} ContextData={ContextData} />
      <Routes>
        <Route
          path="/DataSource/ExternalDataBase"
          element={
            <>
              <PageTitle title="La source est une base de données" />
              <DataBase editor={editor} />
            </>
          }
        />
        <Route
          path="/DataSource/CSVFile"
          element={
            <>
              <PageTitle title="La source est un fichier CSV" />
              <CSVFile editor={editor} />
            </>
          }
        />
        <Route
          path="/CreateTemplate"
          element={
            <>
              <PageTitle title="CreateTemplate" />
              <CreateTemplate html={templateData.htmlData} css={templateData.cssData} project/>
            </>
          }
        />
        <Route
          path="/TemplateList"
          element={
            <>
              <PageTitle title="Modéles" />
              <Modéle setTemplateData={setTemplateData} />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        {/* Redirection vers /auth/signin pour le chemin racine */}
        <Route path="/" element={<Navigate to="TemplateList" />} />
      </Routes>
    </>
  );
 }

 export default App;
