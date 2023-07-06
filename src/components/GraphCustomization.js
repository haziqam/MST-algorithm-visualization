import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { showMessage } from './ToastShowMsg';
import styles from './components.module.css';
const { removeVertex, addVertex } = require('@/lib/algorithm/util');

export function GraphCustomization(props) {
  const [addNode, setAddNode] = useState(false);
  const [removeNode, setRemoveNode] = useState(false);
  const [newNodeDict, setNewNodeDict] = useState('');
  const [nodeToRemove, setNodeToRemove] = useState();
  const messageToast = useRef(null);
  const { matrix, setMatrix } = props;

  const handleSaveAddNode = () => {
    try {
      const nodeDict = JSON.parse(newNodeDict);
      for (const key in nodeDict) {
        if (key >= matrix.length || key < 0) {
          throw new Error(`Invalid node id. Key "${key}" is out of bound`);
        }
      }
      setMatrix(addVertex(matrix, nodeDict));
      showMessage(messageToast, 'success', 'Success', 'Change has been saved');
    } catch (error) {
      console.log(error);
      showMessage(messageToast, 'error', 'Error', error.message);
    }
  };

  const handleSaveRemoveNode = () => {
    const removedNode = +nodeToRemove.node;
    setMatrix(removeVertex(matrix, removedNode));
    showMessage(messageToast, 'success', 'Success', 'Change has been saved');
  };

  return (
    <section className={styles.InputSection}>
      <Toast ref={messageToast} position="bottom-right" />
      <h2>Edit your graph</h2>
      <div className={styles.inputSwitch}>
        <InputSwitch
          id="opt-add-node"
          checked={addNode}
          onChange={(e) => setAddNode(e.value)}
        />
        <label htmlFor="opt-add-node">
          Add node (new node id: {matrix.length})
        </label>
      </div>
      <div className={styles.SaveableInput}>
        <InputText
          value={newNodeDict}
          onChange={(e) => setNewNodeDict(e.target.value)}
          disabled={!addNode}
          placeholder='{"1": 3, "4": 2}'
          pt={{
            root: { className: styles.InputBox },
          }}
        />
        <Button
          label="Save"
          disabled={!addNode}
          onClick={(e) => {
            handleSaveAddNode();
          }}
        />
      </div>
      <div className={styles.inputSwitch}>
        <InputSwitch
          id="opt-rmv-node"
          checked={removeNode}
          onChange={(e) => setRemoveNode(e.value)}
        />
        <label htmlFor="opt-rmv-node">Remove node</label>
      </div>
      <div className={styles.SaveableInput}>
        <Dropdown
          value={nodeToRemove}
          onChange={(e) => {
            setNodeToRemove(e.value);
          }}
          options={matrix.map((_, i) => ({ node: `${i}` }))}
          optionLabel="node"
          placeholder="Select a node to remove"
          className="w-full md:w-14rem"
          disabled={!removeNode || matrix.length === 0}
          pt={{
            root: { className: styles.InputBox },
          }}
        />
        <Button
          label="Save"
          onClick={(e) => {
            handleSaveRemoveNode();
          }}
          disabled={!removeNode || matrix.length === 0}
        />
      </div>
    </section>
  );
}
