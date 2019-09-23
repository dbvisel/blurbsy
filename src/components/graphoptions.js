const GraphOptions = {
	width: '100%',
	height: '100%',
	nodes: {
		size: 20,
		font: { size: 16, color: '#000000' }
	},
	layout: { hierarchical: false },
	groups: {
		author: { shape: 'box', size: 10, color: 'orange', imagePadding: 20 },
		book: { shape: 'box', size: 20, color: 'orange', imagePadding: 20 },
		blurber: { shape: 'box', size: 10, color: 'purple', font: { color: 'white' } },
		blurbedBook: { shape: 'box', size: 20, color: 'purple', font: { color: 'white' } }
	},
	physics: {
		barnesHut: {
			gravitationalConstant: -20000,
			avoidOverlap: 0
		},
		minVelocity: 0.75
	}
};

export default GraphOptions;
