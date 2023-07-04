import { useRef, useState } from "react";
import { FileUpload } from 'primereact/fileupload';
import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';
import { getMatrixFromString } from '@/lib/input-processing/inputProcessing';

export function FileHandler(props) {
    const fileUploadRef = useRef(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [currentFile, setCurrentFile] = useState('')
    
    const {setMatrix} = props

    const handleFileUpload = async (event) => {
        const file = fileUploadRef.current.getFiles()[0]
        console.log(file)
        if (file) {
          const reader = new FileReader();
      
          reader.addEventListener('load', (loadEvent) => {
            const fileContent = loadEvent.target.result;

            try {
              const fileExt = file.name.split('.').pop()
              if (fileExt !== 'txt') throw new Error('Wrong extension. Only use file with .txt extension')
              const matrix = getMatrixFromString(fileContent)
              setCurrentFile(file.name)
              setMatrix(matrix)
              setShowErrorMsg(false)
            }
            catch(error) {
              setErrorMsg(error.message)
              setShowErrorMsg(true)
            } 
          });
      
          reader.readAsText(file);
        }
      }

    return (
      <div>
        <FileUpload 
            name="demo[]" 
            ref={fileUploadRef}
            url="api/test"
            accept=".txt" 
            maxFileSize={1000000} 
            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
            onBeforeUpload={handleFileUpload} 
        />
        <div hidden={!showErrorMsg}>
          <Message severity="error" text={errorMsg}/>
        </div>
        <Panel header='Used file'>
          <p hidden={showErrorMsg}>{currentFile}</p>
        </Panel>
      </div>
    )
}
