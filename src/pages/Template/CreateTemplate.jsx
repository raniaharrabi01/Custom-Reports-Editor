import React, { useState, useEffect } from 'react';
import './CreateTemplate.css';
import "grapesjs/dist/css/grapes.min.css";
import AddButtons from './AddButtons';
import AddTableau from './AddTableau';
import gjsPrestWebpage from "grapesjs-preset-webpage";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsPluginCkeditor from "grapesjs-plugin-ckeditor";
import grapesjsTuiImageEditor from "grapesjs-tui-image-editor";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsStyleGradient from "grapesjs-style-gradient";
import grapesjsStyleFilter from "grapesjs-style-filter";
import grapesjsStyleBg from "grapesjs-style-bg";
import gjsBlocksFlexbox from "grapesjs-blocks-flexbox";
import grapesjsTooltip from "grapesjs-tooltip";
import grapesjsCustomCode from "grapesjs-custom-code";
import grapesjsIndexeddb from "grapesjs-indexeddb";
import grapesjsTyped from "grapesjs-typed";

import grapesjs from "grapesjs";
const CreateTemplate = (props) => {
  const [editor,setEditor] = useState(null);
    useEffect (() => {
        let initConfig = {
          container: "#editor",
          css: "",
          plugins: [gjsPrestWebpage, grapesjsPluginForms, AddTableau, AddButtons, grapesjsPluginCkeditor, grapesjsTuiImageEditor, 
                    gjsBlocksFlexbox, grapesjsCustomCode, grapesjsIndexeddb, grapesjsTyped,grapesjsBlocksBasic, 
                    grapesjsComponentCountdown,grapesjsStyleGradient, grapesjsStyleFilter, grapesjsStyleBg, grapesjsTooltip]
                    ,
          pluginsOpts:{
            "grapesjsBlocksBasic": {
              blocks: ['Text', 'Link', 'Image'],
            }
          },
          }
          if(props.html || props.css) {
            initConfig.projectData = {
              pages: [
                {
                  component: `
                    ${props.html}
                    <style>${props.css}</style>
                 `
              }
            ]
           }
          }
        const newEditor = grapesjs.init(initConfig);
          setEditor(newEditor);}, 
    [props.html, props.css]);  
    return (
        <div className='App'>
          <div id='editor'></div>
        </div>
    );
  }

export default CreateTemplate;