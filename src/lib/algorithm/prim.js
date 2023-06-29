// function test() {
//     return 10;
// }

// module.exports = {test}


// A utility function to find the vertex with
// minimum key value, from the set of vertices
// not yet included in MST
function minKey(key, visitedSet)
{
	// Initialize min value
	let min = Number.MAX_VALUE, min_index;

	for (let v = 0; v < V; v++)
		if (visitedSet[v] == false && key[v] < min)
			min = key[v], min_index = v;

	return min_index;
}

// A utility function to print the
// constructed MST stored in parent[]
function printMST(parent, graph)
{
	console.log("Edge 	 Weight");
	for (let i = 1; i < V; i++)
		console.log(parent[i] + " - " + i + "  " + graph[i][parent[i]]);
}

// Function to construct and print MST for
// a graph represented using adjacency
// matrix representation
function primMST(graph)
{
    let V = graph.length
	// Array to store constructed MST
	let parent = [];
	
	// Key values used to pick minimum weight edge in cut
	let key = [];
	
	// To represent set of vertices included in MST
	let visitedSet = [];

	// Initialize all keys as INFINITE
	for (let i = 0; i < V; i++)
		key[i] = Number.MAX_VALUE, visitedSet[i] = false;

	// Always include first 1st vertex in MST.
	// Make key 0 so that this vertex is picked as first vertex.
	key[0] = 0;
	parent[0] = -1; // First node is always root of MST

	// The MST will have V vertices
	for (let count = 0; count < V - 1; count++)
	{
		// Pick the minimum key vertex from the
		// set of vertices not yet included in MST
		let u = minKey(key, visitedSet);

		// Add the picked vertex to the MST Set
		visitedSet[u] = true;

		// Update key value and parent index of
		// the adjacent vertices of the picked vertex.
		// Consider only those vertices which are not
		// yet included in MST
		for (let v = 0; v < V; v++)

			// graph[u][v] is non zero only for adjacent vertices of m
			// visitedSet[v] is false for vertices not yet included in MST
			// Update the key only if graph[u][v] is smaller than key[v]
			if (graph[u][v] > 0 && !visitedSet[v] && graph[u][v] < key[v])
				parent[v] = u, key[v] = graph[u][v];
	}

	// print the constructed MST
	printMST(parent, graph);
}

// Driver code
	
let graph = [
    [0, 1, 2, 5],
    [1, 0, 0, 3],
    [2, 0, 0, 6],
    [5, 3, 6, 0]
]

// Print the solution
primMST(graph);





