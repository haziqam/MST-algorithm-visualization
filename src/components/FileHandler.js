import { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';
import styles from './components.module.css';
import { showMessage } from './ToastShowMsg';
const {
  getMatrixFromString,
} = require('@/lib/input-processing/inputProcessing');

export function FileHandler(props) {
  const fileUploadRef = useRef(null);
  const [currentFile, setCurrentFile] = useState('');
  const messageToast = useRef(null);
  const { setMatrix } = props;

  const handleFileUpload = async (event) => {
    const file = fileUploadRef.current.getFiles()[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', (loadEvent) => {
        const fileContent = loadEvent.target.result;

        try {
          setMatrix([]);
          setCurrentFile('');
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
          showMessage(
            messageToast,
            'success',
            'Success',
            'File has been uploaded'
          );
        } catch (error) {
          showMessage(messageToast, 'error', 'Error', error.message);
        }
      });

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Toast ref={messageToast} position="bottom-right" />
      <Panel
        header="Used file"
        pt={{
          root: { className: styles.Panel },
          header: { className: styles.PanelHeader },
        }}
      >
        {currentFile === '' ? (
          <p>No file used</p>
        ) : (
          <UsedFileContainer fileName={currentFile} />
        )}
      </Panel>
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
        pt={{
          root: { className: styles.Panel },
          buttonbar: { className: styles.PanelHeader },
        }}
      />
    </div>
  );
}

function UsedFileContainer(props) {
  const { fileName } = props;
  return (
    <div className={styles.UsedFileContainer}>
      <i className="pi pi-file"></i>
      <p>{fileName}</p>
    </div>
  );
}
