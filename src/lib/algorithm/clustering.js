const {initializeEdges} = require('./util')
module.exports = {clusterMST}

function clusterMST(mstMatrix, numOfClusters) {
    const edges = initializeEdges(mstMatrix)

    // Copy mst matrix
    const clusteredMatrix = JSON.parse(JSON.stringify(mstMatrix)) 
    // Sort edges descendingly by weight
    edges.sort((a, b) => b.weight - a.weight)
    console.log("clustering")
    console.table(edges)
    let clusterCount = 1
    while (clusterCount < numOfClusters) {
        let [i, j] = edges[clusterCount - 1].vertex
        clusteredMatrix[i][j] = 0
        clusteredMatrix[j][i] = 0
        clusterCount++
    }
    return clusteredMatrix
}