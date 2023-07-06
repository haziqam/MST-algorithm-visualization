module.exports = { primMST };

function primMST(adjMatrix) {
  let numOfVertices = adjMatrix.length;
  // Array to store constructed MST, parent[i] = parent of vertex i.
  // parent[i] = -1 means it has no parent
  let parent = [];
  // Key[i] = nearest neighbor of vertex i that hasn't been visited
  let key = [];
  // visitedSet[i] = false means vertex i hasn't been visited
  let visitedSet = [];

  // Initialize all keys as INFINITE
  for (let i = 0; i < numOfVertices; i++) {
    key[i] = Infinity;
    visitedSet[i] = false;
  }

  // Start from the first vertex (index 0)
  key[0] = 0;
  parent[0] = -1;

  for (let count = 0; count < numOfVertices; count++) {
    let u = minKey(key, visitedSet, numOfVertices);
    if (u === -1) {
      throw new Error("Graph isn't connected. Can't use Prim's algorithm");
    }
    visitedSet[u] = true;

    // Update key value and parent index of
    // the adjacent vertices of the picked vertex.
    for (let v = 0; v < numOfVertices; v++)
      if (adjMatrix[u][v] > 0 && !visitedSet[v] && adjMatrix[u][v] < key[v]) {
        parent[v] = u;
        key[v] = adjMatrix[u][v];
      }
  }

  const mstMatrix = reconstructMstMatrix(parent, adjMatrix);
  return mstMatrix;
}

function minKey(key, visitedSet, numOfVertices) {
  let min = Infinity;
  let min_index = -1;

  for (let v = 0; v < numOfVertices; v++) {
    if (!visitedSet[v] && key[v] < min) {
      min = key[v];
      min_index = v;
    }
  }

  return min_index;
}

function reconstructMstMatrix(parentList, initialAdjMatrix) {
  // Initialize VxV size array with all elements = 0
  const mstMatrix = [];
  for (let i = 0; i < initialAdjMatrix.length; i++) {
    const row = [];
    for (let j = 0; j < initialAdjMatrix.length; j++) {
      row.push(0);
    }
    mstMatrix.push(row);
  }

  // Fill up the weight
  for (let i = 0; i < parentList.length; i++) {
    if (parentList[i] === -1) continue;
    mstMatrix[i][parentList[i]] = initialAdjMatrix[i][parentList[i]];
    mstMatrix[parentList[i]][i] = initialAdjMatrix[i][parentList[i]];
  }
  return mstMatrix;
}

// const {getMatrixFromFile} = require('../file-processing/fileProcessing')

// let adjMatrix = getMatrixFromFile('../file-processing/example.txt')
// console.table(adjMatrix)
// console.table(primMST(adjMatrix))
