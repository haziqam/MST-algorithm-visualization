'use client';
import React, { useEffect, useRef, useState } from 'react';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import { Panel } from 'primereact/panel';
import { FileHandler } from '@/components/FileHandler';
import { UserConfig } from '@/components/UserConfig';
import { GraphImg } from '@/components/GraphImg';
import styles from './page.module.css';
import componentStyles from '../components/components.module.css';

export default function Home() {
  const [matrix, setMatrix] = useState([]);
  const [MST, setMST] = useState([]);
  const [renderInitialGraph, setRenderInitialGraph] = useState(false);
  const [renderMST, setRenderMST] = useState(false);
  useEffect(() => {
    console.log('Matrix has been changed');
    console.table(matrix);
    console.log(matrix);
  }, [matrix]);

  useEffect(() => {
    console.log('MST has been changed');
    console.log('current mst');
    console.table(MST);
  }, [MST]);

  return (
    <>
      <header>
        <h1>Minimum Spanning Tree Finder</h1>
      </header>
      <main>
        <div className={styles.inputContainer}>
          <UserConfig
            matrix={matrix}
            setMatrix={setMatrix}
            setMST={setMST}
            setRenderInitialGraph={setRenderInitialGraph}
            setRenderMST={setRenderMST}
          />
          <FileHandler setMatrix={setMatrix} />
        </div>
        <Panel
          header="Initial Graph"
          pt={{
            root: {
              className: `${componentStyles.Panel} ${styles.visualizationContainer}`,
            },
            header: { className: componentStyles.PanelHeader },
            toggleableContent: { className: styles.visualizationContent },
          }}
        >
          {renderInitialGraph ? <GraphImg matrix={matrix} /> : null}
        </Panel>
        <Panel
          header="Minimum Spanning Tree"
          pt={{
            root: {
              className: `${componentStyles.Panel} ${styles.visualizationContainer}`,
            },
            header: { className: componentStyles.PanelHeader },
            toggleableContent: { className: styles.visualizationContent },
          }}
        >
          {renderMST ? <GraphImg matrix={MST} /> : null}
        </Panel>
      </main>
    </>
  );
}
