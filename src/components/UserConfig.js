import { useEffect, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import styles from './components.module.css';
const { removeVertex, addVertex } = require('@/lib/algorithm/util');

const showMessage = (ref, severity, message) => {
  ref.current.show({
    severity: severity,
    summary: severity[0].toUpperCase().concat(severity.substring(1)),
    detail: message,
    life: 4000,
  });
};

export function UserConfig(props) {
  const { matrix, setMatrix } = props;
  const messageToast = useRef(null);

  return (
    <Panel header="User Configuration">
      <Toast ref={messageToast} position="bottom-right" />
      <AlgorithmOptions matrix={matrix} />
      <GraphCustomization matrix={matrix} setMatrix={setMatrix} />
      <Button label="Visualize graph" />
    </Panel>
  );
}

function AlgorithmOptions(props) {
  const [algorithm, setAlgorithm] = useState('');
  const [isCluster, setCluster] = useState(false);
  const [clusterCount, setClusterCount] = useState(1);
  const { matrix } = props;

  return (
    <div>
      <h2>Algorithm</h2>
      <div className="flex align-items-center">
        <RadioButton
          inputId="opt-prim"
          name="algorithm"
          value="prim"
          onChange={(e) => setAlgorithm(e.value)}
          checked={algorithm === 'prim'}
        />
        <label htmlFor="opt-prim">Prim</label>
      </div>
      <div className="flex align-items-center">
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
      />
    </div>
  );
}

function GraphCustomization(props) {
  const [addNode, setAddNode] = useState(false);
  const [removeNode, setRemoveNode] = useState(false);
  const [newNodeDict, setNewNodeDict] = useState('');
  const [nodeToRemove, setNodeToRemove] = useState();
  const messageToast = useRef(null);
  const { matrix, setMatrix } = props;

  return (
    <div>
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
      <InputText
        value={newNodeDict}
        onChange={(e) => setNewNodeDict(e.target.value)}
        disabled={!addNode}
        placeholder='Format: {"NeighborNodeId": weight} (e.g. {"1": 3}, {"4": 2})'
      />
      <Button
        label="Save"
        disabled={!addNode}
        onClick={(e) => {
          try {
            const nodeDict = JSON.parse(newNodeDict);
            for (const key in nodeDict) {
              if (key >= matrix.length) {
                throw new Error(
                  `Invalid node id. Key "${key}" is out of bound`
                );
              }
            }
            setMatrix(addVertex(matrix, nodeDict));
            showMessage(messageToast, 'success', 'Change has been saved');
          } catch (error) {
            console.log(error);
            showMessage(messageToast, 'error', error.message);
          }
        }}
      />
      <div className={styles.inputSwitch}>
        <InputSwitch
          id="opt-rmv-node"
          checked={removeNode}
          onChange={(e) => setRemoveNode(e.value)}
        />
        <label htmlFor="opt-rmv-node">Remove node</label>
      </div>

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
      />
      <Button
        label="Save"
        onClick={(e) => {
          const removedNode = +nodeToRemove.node;
          setMatrix(removeVertex(matrix, removedNode));
        }}
        disabled={!removeNode || matrix.length === 0}
      />
    </div>
  );
}
