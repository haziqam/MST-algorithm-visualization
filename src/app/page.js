'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import { FileHandler } from '@/components/FileHandler';
import { UserConfig } from '@/components/UserConfig';
import { GraphImg } from '@/components/GraphImg';
import styles from './page.module.css';

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
        <div className="">
          <div>{renderInitialGraph ? <GraphImg matrix={matrix} /> : null}</div>
          <div>{renderMST ? <GraphImg matrix={MST} /> : null}</div>
        </div>
      </main>
    </>
  );
}

export const renderElement = (componentStateSetter) => {
  componentStateSetter(false);
  setTimeout(() => {
    componentStateSetter(true);
  }, 100);
};
