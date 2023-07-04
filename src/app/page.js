'use client';
// import Image from 'next/image'
// import styles from './page.module.css'
// import Graph from './Graph';

import React, { useEffect, useRef, useState } from 'react';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { FileHandler } from '@/components/FileHandler';
import { UserConfig } from '@/components/UserConfig';
import { GraphImg } from '@/components/GraphImg';

export default function Home() {
  const [matrix, setMatrix] = useState([]);
  useEffect(() => {
    console.log('Matrix has been changed');
    console.table(matrix);
    console.log(matrix);
  }, [matrix]);
  return (
    <main>
      <FileHandler setMatrix={setMatrix} />
      <UserConfig matrix={matrix} setMatrix={setMatrix} />
      <GraphImg matrix={matrix} />
    </main>
  );
}
