'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './components.module.css';
import vis from 'vis-network/standalone/umd/vis-network.min.js';
const { getVisGraph } = require('@/lib/algorithm/util');

export function GraphImg(props) {
  const visNetworkRef = useRef(null);
  const { matrix } = props;
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    setGraphData(getVisGraph(matrix));
  }, []);

  useEffect(() => {
    if (graphData) {
      const container = visNetworkRef.current;
      const { nodes, edges } = graphData;
      const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
      };
      const options = {};
      const network = new vis.Network(container, data, options);

      //   Clean up the network instance when the component is unmounted
      return () => {
        network.destroy();
      };
    }
  }, [graphData]);

  return <div ref={visNetworkRef} className={styles.GraphImg} />;
}

// const example = [
//   [0, 4, 0, 0, 0, 0, 0],
//   [4, 0, 1, 3, 0, 0, 0],
//   [0, 1, 0, 2, 0, 0, 0],
//   [0, 3, 2, 0, 1, 0, 0],
//   [0, 0, 0, 1, 0, 2, 0],
//   [0, 0, 0, 0, 2, 0, 3],
//   [0, 0, 0, 0, 0, 3, 0],
// ];
