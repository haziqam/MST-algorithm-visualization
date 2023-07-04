import { useState } from 'react';
import { Panel } from 'primereact/panel';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton'
import { InputNumber } from 'primereact/inputnumber'
import styles from './components.module.css'

export function UserConfig() {
    return (
        <Panel header='User Configuration'>
            <AlgorithmOptions />
            <GraphCustomization />
        </Panel>
    )
}

function AlgorithmOptions(props) {
    const [algorithm, setAlgorithm] = useState('')
    const [isCluster, setCluster] = useState(false)
    const [clusterCount, setClusterCount] = useState(1)

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
                <label htmlFor="opt-prim" className="ml-2">Prim</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton 
                    inputId="opt-kruskal" 
                    name="algorithm" 
                    value="kruskal" 
                    onChange={(e) => setAlgorithm(e.value)} 
                    checked={algorithm === 'kruskal'}
                />
                <label htmlFor="opt-kruskal" className="ml-2">Kruskal</label>
            </div>  
            <div className={styles.inputSwitch}>
                <InputSwitch id='opt-cluster' checked={isCluster} onChange={(e) => setCluster(e.value)}/> 
                <label htmlFor='opt-cluster'>Cluster MST</label>
            </div>
            <InputNumber value={clusterCount} useGrouping={false} onValueChange={(e) => setClusterCount(e.value)} min={0} max={100} />
        </div>
    )
}

function GraphCustomization(props) {
    const [addNode, setAddNode] = useState(false)
    const [removeNode, setRemoveNode] = useState(false)
    return (
        <div>
            <div className={styles.inputSwitch}>
                <InputSwitch id="opt-add-node" checked={addNode} onChange={(e) => setAddNode(e.value)} />
                <label htmlFor='opt-add-node'>Add node</label>
            </div>
            <div className={styles.inputSwitch}>
                <InputSwitch id="opt-rmv-node" checked={removeNode} onChange={(e) => setRemoveNode(e.value)} />
                <label htmlFor='opt-rmv-node'>Remove node</label>
            </div>
        </div>
    )
}