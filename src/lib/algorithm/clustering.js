const { initializeEdges } = require('./util');
module.exports = { clusterMST };

function clusterMST(mstMatrix, numOfClusters) {
  const edges = initializeEdges(mstMatrix);

  // Copy mst matrix
  const clusteredMatrix = JSON.parse(JSON.stringify(mstMatrix));
  // Sort edges descendingly by weight
  edges.sort((a, b) => b.weight - a.weight);
  let clusterCount = 1;
  while (clusterCount < numOfClusters) {
    let [i, j] = edges[clusterCount - 1].vertex;
    clusteredMatrix[i][j] = 0;
    clusteredMatrix[j][i] = 0;
    clusterCount++;
  }
  return clusteredMatrix;
}

// const test = [
//   [0, 4, 0, 0, 0, 0, 0],
//   [4, 0, 1, 3, 0, 0, 0],
//   [0, 1, 0, 2, 0, 0, 0],
//   [0, 3, 2, 0, 1, 0, 0],
//   [0, 0, 0, 1, 0, 2, 0],
//   [0, 0, 0, 0, 2, 0, 3],
//   [0, 0, 0, 0, 0, 3, 0],
// ];

// const clustered = clusterMST(test, 2);
// console.log(clustered);
