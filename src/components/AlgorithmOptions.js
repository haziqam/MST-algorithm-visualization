import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import styles from './components.module.css';

export function AlgorithmOptions(props) {
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
