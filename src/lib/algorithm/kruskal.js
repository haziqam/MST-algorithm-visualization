function kruskalMST(graph) {
    // Gather all edges in an array
    const edges = []
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < i + 1; j++) {
            if (graph[i][j] === 0) continue

            edges.push({
                vertex: [i, j],
                weight: graph[i][j]
            })
        }
    }

    // Sort edges ascendingly based on weight
    edges.sort((a, b) => a.weight - b.weight)
    console.table(edges)

    // Initialize parent and rank information
    const root = []
    const rank = []
    for (let i = 0; i < graph.length; i++) {
        root.push(i)
        rank.push(0)
    }

    const minimumSpanningTree = []

    let totalCost = 0
    // Traverse through all edges and see if we can add it to the tree
    for (const edge of edges) {
        const i = edge.vertex[0]
        const j = edge.vertex[1]
        const weight = edge.weight

        if (union(i, j, root, rank)) {
            minimumSpanningTree.push([i, j])
            totalCost += weight
        }
    }
    return minimumSpanningTree
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

const {getMatrixFromFile} = require('../file-processing/fileProcessing')

let graph = getMatrixFromFile(__dirname + '/example.txt')

console.log(kruskalMST(graph))