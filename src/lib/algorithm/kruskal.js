const {initializeEdges} = require('./util.js')
module.exports = {kruskalMST}

function kruskalMST(adjMatrix) {
    // Gather all edges in an array sorted ascendingly by weight
    const edges = initializeEdges(adjMatrix)
    edges.sort((a, b) => a.weight - b.weight)
    console.table(edges)

    // Initialize root, rank, and paernts information
    const root = []
    const rank = []
    for (let i = 0; i < adjMatrix.length; i++) {
        root.push(i)
        rank.push(0)
    }

    // Traverse through all edges and check if we can add it to the tree
    const minimumSpanningTree = []
    let totalCost = 0
    for (const edge of edges) {
        const i = edge.vertex[0]
        const j = edge.vertex[1]
        const weight = edge.weight

        if (union(i, j, root, rank)) {
            minimumSpanningTree.push([i, j])
            totalCost += weight
        }
    }
    const mstMatrix = reconstructMstMatrix(minimumSpanningTree, adjMatrix)
    return mstMatrix
}

function findRoot(vertex, root) {
    // Using path compression
    if (vertex !== root[vertex]) {
        root[vertex] = findRoot(root[vertex], root)
    }
    return root[vertex]
}  

function union(i, j, root, rank) {
    const iRoot = findRoot(i, root)
    const jRoot = findRoot(j, root)

    // if i and j have the same root, they are already connected and we should not
    // union i and j since it will make a cycle
    if (iRoot === jRoot) return false

    if (rank[iRoot] < rank[jRoot]) {
        root[iRoot] = jRoot
    }
    else if (rank[iRoot] > rank[jRoot]) {
        root[jRoot] = iRoot
    }
    else {
        root[jRoot] = iRoot
        rank[iRoot]++
    }
    return true
}

function reconstructMstMatrix(minimumSpanningTree, initialGraph) {
    // Initialize VxV size array with all elements = 0 
    const mstMatrix = []
    for (let i = 0; i < initialGraph.length; i++) {
      const row = []
      for (let j = 0; j < initialGraph.length; j++) {
        row.push(0)
      }
      mstMatrix.push(row)
    }

    // Assign all weight of the minimum spanning tree into the matrix
    for (let edge of minimumSpanningTree) {
        const i = edge[0]
        const j = edge[1]
        mstMatrix[i][j] = initialGraph[i][j]
        mstMatrix[j][i] = initialGraph[i][j]
    }
    return mstMatrix
}

// const {getMatrixFromFile} = require('../file-processing/fileProcessing')

// let adjMatrix = getMatrixFromFile('../file-processing/example.txt')

// console.table(kruskalMST(adjMatrix))