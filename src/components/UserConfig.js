import { useEffect, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { renderElement } from '@/app/page';
import { primMST } from '@/lib/algorithm/prim';
import { kruskalMST } from '@/lib/algorithm/kruskal';
import styles from './components.module.css';
import { clusterMST } from '@/lib/algorithm/clustering';
const { removeVertex, addVertex } = require('@/lib/algorithm/util');

const showMessage = (ref, severity, message) => {
  ref.current.show({
    severity: severity,
    summary: severity[0].toUpperCase().concat(severity.substring(1)),
    detail: message,
    life: 3000,
  });
};

export function UserConfig(props) {
  const { matrix, setMatrix, setMST, setRenderInitialGraph, setRenderMST } =
    props;
  const messageToast = useRef(null);
  const [algorithm, setAlgorithm] = useState('');
  const [isCluster, setCluster] = useState(false);
  const [clusterCount, setClusterCount] = useState();

  const handleVisualizeGraph = () => {
    setRenderInitialGraph(false);
    renderElement(setRenderInitialGraph);
  };

  const handleVisualizeMST = () => {
    setRenderMST(false);
    if (matrix.length === 0) {
      showMessage(
        messageToast,
        'error',
        'Unable to generate MST. Graph is empty'
      );
      return;
    }
    if (algorithm === '') {
      showMessage(messageToast, 'error', 'Select one algorithm');
      return;
    }
    try {
      const mst = algorithm === 'prim' ? primMST(matrix) : kruskalMST(matrix);
      setMST(mst);
      if (isCluster) {
        const clusteredMst = clusterMST(mst, +clusterCount.clusters);
        console.log('cluster result:');
        console.table(clusteredMst);
        setMST(clusteredMst);
      }
      renderElement(setRenderMST);
      showMessage(messageToast, 'success', 'MST generated');
    } catch (error) {
      showMessage(messageToast, 'error', error.message);
    }
  };

  return (
    <Panel
      header="User Configuration"
      pt={{
        root: { className: `${styles.Panel} ${styles.UserConfig}` },
        header: { className: styles.PanelHeader },
      }}
    >
      <Toast ref={messageToast} position="bottom-right" />
      <AlgorithmOptions
        matrix={matrix}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isCluster={isCluster}
        setCluster={setCluster}
        clusterCount={clusterCount}
        setClusterCount={setClusterCount}
      />
      <GraphCustomization matrix={matrix} setMatrix={setMatrix} />
      <Button
        label="Visualize graph"
        onClick={(e) => {
          handleVisualizeGraph();
        }}
        className={styles.VisualizeBtn}
      />
      <Button
        label="Visualize MST"
        onClick={handleVisualizeMST}
        className={styles.VisualizeBtn}
      />
    </Panel>
  );
}

function AlgorithmOptions(props) {
  const {
    matrix,
    algorithm,
    setAlgorithm,
    isCluster,
    setCluster,
    clusterCount,
    setClusterCount,
  } = props;

  return (
    <section className={styles.InputSection}>
      <h2>Algorithm</h2>
      <div className={styles.Option}>
        <RadioButton
          inputId="opt-prim"
          name="algorithm"
          value="prim"
          onChange={(e) => setAlgorithm(e.value)}
          checked={algorithm === 'prim'}
        />
        <label htmlFor="opt-prim">Prim</label>
      </div>
      <div className={styles.Option}>
        <RadioButton
          inputId="opt-kruskal"
          name="algorithm"
          value="kruskal"
          onChange={(e) => setAlgorithm(e.value)}
          checked={algorithm === 'kruskal'}
        />
        <label htmlFor="opt-kruskal">Kruskal</label>
      </div>
      <div className={styles.inputSwitch}>
        <InputSwitch
          id="opt-cluster"
          checked={isCluster}
          onChange={(e) => setCluster(e.value)}
        />
        <label htmlFor="opt-cluster">Cluster MST</label>
      </div>
      <Dropdown
        value={clusterCount}
        onChange={(e) => setClusterCount(e.value)}
        options={matrix.map((_, i) => ({ clusters: `${i + 1}` }))}
        optionLabel="clusters"
        placeholder="Select the number of clusters"
        className="w-full md:w-14rem"
        disabled={!isCluster || matrix.length === 0}
        pt={{
          root: { className: styles.InputBox },
        }}
      />
    </section>
  );
}

function GraphCustomization(props) {
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
      showMessage(messageToast, 'success', 'Change has been saved');
    } catch (error) {
      console.log(error);
      showMessage(messageToast, 'error', error.message);
    }
  };

  const handleSaveRemoveNode = () => {
    const removedNode = +nodeToRemove.node;
    setMatrix(removeVertex(matrix, removedNode));
    showMessage(messageToast, 'success', 'Change has been saved');
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
          placeholder='{"1": 3}, {"4": 2}'
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
