const { isMatrixValid } = require('@/lib/input-processing/inputProcessing');
module.exports = { initializeEdges, getVisGraph, removeVertex, addVertex };

function initializeEdges(adjMatrix) {
  const edges = [];
  for (let i = 0; i < adjMatrix.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      if (adjMatrix[i][j] === 0) continue;

      edges.push({
        vertex: [i, j],
        weight: adjMatrix[i][j],
      });
    }
  }
  return edges;
}

function getVisGraph(adjMatrix) {
  const nodes = [];
  for (let i = 0; i < adjMatrix.length; i++) {
    nodes.push({
      id: i,
      label: `${i}`,
    });
  }

  const edges = [];
  for (let i = 0; i < adjMatrix.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      if (adjMatrix[i][j] === 0) continue;
      edges.push({
        from: i,
        to: j,
        label: `${adjMatrix[i][j]}`,
      });
    }
  }

  const data = { nodes, edges };

  return data;
}

function removeVertex(adjMatrix, vertexIdx) {
  const newMatrix = JSON.parse(JSON.stringify(adjMatrix));
  newMatrix.splice(vertexIdx, 1);
  newMatrix.forEach((row) => row.splice(vertexIdx, 1));
  return newMatrix;
}

function addVertex(adjMatrix, weightDict) {
  const newMatrix = JSON.parse(JSON.stringify(adjMatrix));
  const newVertexIdx = newMatrix.length;
  newMatrix.forEach((row) => row.push(0));
  newMatrix.push(Array(newVertexIdx + 1).fill(0));

  for (const key in weightDict) {
    const i = newVertexIdx;
    const j = key;
    newMatrix[i][j] = weightDict[key];
    newMatrix[j][i] = weightDict[key];
  }

  if (!isMatrixValid(newMatrix)) {
    throw new Error('Invalid value');
  }
  return newMatrix;
}

// const example = [
//     [
//       0, 4, 0, 0,
//       0, 0, 0
//     ],
//     [
//       4, 0, 1, 3,
//       0, 0, 0
//     ],
//     [
//       0, 1, 0, 2,
//       0, 0, 0
//     ],
//     [
//       0, 3, 2, 0,
//       1, 0, 0
//     ],
//     [
//       0, 0, 0, 1,
//       0, 2, 0
//     ],
//     [
//       0, 0, 0, 0,
//       2, 0, 3
//     ],
//     [
//       0, 0, 0, 0,
//       0, 3, 0
//     ]
//   ]
