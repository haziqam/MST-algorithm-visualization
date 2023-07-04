import { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
const {
  getMatrixFromString,
  isMatrixValid,
} = require('@/lib/input-processing/inputProcessing');

export function FileHandler(props) {
  const fileUploadRef = useRef(null);
  // const [errorMsg, setErrorMsg] = useState('');
  // const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const messageToast = useRef(null);

  const { setMatrix } = props;

  const showMessage = (ref, severity, message) => {
    ref.current.show({
      severity: severity,
      summary: severity[0].toUpperCase().concat(severity.substring(1)),
      detail: message,
      life: 4000,
    });
  };

  const handleFileUpload = async (event) => {
    const file = fileUploadRef.current.getFiles()[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', (loadEvent) => {
        const fileContent = loadEvent.target.result;

        try {
          setMatrix([]);
          const fileExt = file.name.split('.').pop();
          if (fileExt !== 'txt') {
            throw new Error(
              'Wrong extension. Only use file with .txt extension'
            );
          }
          if (fileContent === '') {
            throw new Error('Empty file.');
          }

          const matrix = getMatrixFromString(fileContent);
          setCurrentFile(file.name);
          setMatrix(matrix);
          showMessage(messageToast, 'success', 'File has been uploaded');
          // setShowErrorMsg(false);
        } catch (error) {
          // setErrorMsg(error.message);
          // setShowErrorMsg(true);
          showMessage(messageToast, 'error', error.message);
        }
      });

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Toast ref={messageToast} position="bottom-right" />
      <FileUpload
        name="demo[]"
        ref={fileUploadRef}
        url="api/test"
        accept=".txt"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        onBeforeUpload={handleFileUpload}
      />
      <Panel header="Used file">
        <p>{currentFile}</p>
      </Panel>
    </div>
  );
}
