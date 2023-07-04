module.exports = {initializeEdges, getVisGraph}

function initializeEdges(adjMatrix) {
    const edges = []
    for (let i = 0; i < adjMatrix.length; i++) {
        for (let j = 0; j < i + 1; j++) {
            if (adjMatrix[i][j] === 0) continue

            edges.push({
                vertex: [i, j],
                weight: adjMatrix[i][j]
            })
        }
    }
    return edges
}

function getVisGraph(adjMatrix) {
    const nodes = []
    for (let i = 0; i < adjMatrix.length; i++) {
        nodes.push({
            id: i,
            label: `${i}`
        })
    }

    const edges = []
    for (let i = 0; i < adjMatrix.length; i++) {
        for (let j = 0; j < i + 1; j++) {
            if (adjMatrix[i][j] === 0) continue
            edges.push({
                from: i,
                to: j,
                label: `${adjMatrix[i][j]}`
            })
        }
    }
  
    const data = {nodes, edges}
    
    return data
}

function removeVertex(adjMatrix, vertexIdx) {
    adjMatrix.splice(vertexIdx, 1)
    adjMatrix.forEach(row => row.splice(vertexIdx, 1))
    return adjMatrix
}

function addVertex(adjMatrix, weightDict) {
    const newVertexIdx = adjMatrix.length
    adjMatrix.forEach(row => row.push(0))
    adjMatrix.push(Array(newVertexIdx + 1).fill(0))

    for (key in weightDict) {
        const i = newVertexIdx
        const j = key
        adjMatrix[i][j] = weightDict[key]
        adjMatrix[j][i] = weightDict[key]
    }
    return adjMatrix
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