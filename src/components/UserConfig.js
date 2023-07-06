import { useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { AlgorithmOptions } from './AlgorithmOptions';
import { GraphCustomization } from './GraphCustomization';
import { renderElement } from './RenderElement';
import { showMessage } from './ToastShowMsg';
import { primMST } from '@/lib/algorithm/prim';
import { kruskalMST } from '@/lib/algorithm/kruskal';
import { clusterMST } from '@/lib/algorithm/clustering';
import styles from './components.module.css';

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
    if (matrix.length === 0) {
      showMessage(messageToast, 'warn', 'Warning', 'Graph is empty');
    } else {
      showMessage(messageToast, 'success', 'Success', 'Visualization success');
    }
  };

  const handleVisualizeMST = () => {
    setRenderMST(false);
    if (matrix.length === 0) {
      showMessage(
        messageToast,
        'error',
        'Error',
        'Unable to generate MST. Graph is empty'
      );
      return;
    }
    if (algorithm === '') {
      showMessage(messageToast, 'error', 'Error', 'Select one algorithm');
      return;
    }
    try {
      const mst = algorithm === 'prim' ? primMST(matrix) : kruskalMST(matrix);
      if (isCluster) {
        const clusteredMst = clusterMST(mst, +clusterCount.clusters);
        console.log('cluster result:');
        console.table(clusteredMst);
        setMST(clusteredMst);
      } else {
        setMST(mst);
      }
      renderElement(setRenderMST);
      showMessage(messageToast, 'success', 'Success', 'MST generated');
    } catch (error) {
      showMessage(messageToast, 'error', 'Error', error.message);
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
        onClick={handleVisualizeGraph}
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
