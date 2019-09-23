import React from 'react';
import styled from 'styled-components';
import Graph from 'react-graph-vis';
import GraphOptions from '../components/graphoptions';
import { navigate } from 'gatsby';

const VisualizationWrapper = styled.div`
	background-color: var(--textColor);
	box-sizing: border-box;
	padding: 16px;
	border-radius: 10px;
	margin-bottom: 16px;
	width: 100%;
	max-width: 400px;
	box-sizing: border-box;
	min-height: 400px;
	flex: 1;
	max-height: calc(100vh - 100px);
`;

const GraphHolder = styled.div`
	box-sizing: border-box;
	height: calc(100% - 40px);
	overflow-y: hidden;
	& canvas {
		min-height: 100% !important;
	}
`;

const checkIfExists = function(data, id) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id === id) {
			return true;
		}
	}
};

const cleanLabel = (text) => text.replace(/ /gi, '\n').replace(/\.\n/gi, '. ');

const Visualization = ({ graphData }) => {
	//const [networkInstance, setNetworkInstance] = React.useState();

	let data = { nodes: [], edges: [] };
	if (graphData.type === 'authorPage') {
		// set up author page
		console.log(graphData);
		data.nodes[0] = { id: graphData.author.link, label: cleanLabel(graphData.author.name), group: 'author' };
		if (graphData.books) {
			for (let i = 0; i < graphData.books.length; i++) {
				data.nodes.push({ id: graphData.books[i].link, label: graphData.books[i].name, group: 'book' });
				data.edges.push({ from: graphData.author.link, to: graphData.books[i].link, width: 5 });
				if (graphData.books[i].blurbers) {
					for (let j = 0; j < graphData.books[i].blurbers.length; j++) {
						if (!checkIfExists(data.nodes, graphData.books[i].blurbers[j].blurberLink)) {
							data.nodes.push({
								id: graphData.books[i].blurbers[j].blurberLink,
								label: cleanLabel(graphData.books[i].blurbers[j].blurber),
								group: 'blurber'
							});
						}
						data.edges.push({
							from: graphData.books[i].blurbers[j].blurberLink,
							to: graphData.books[i].link,
							width: 1,
							dashes: true
						});
					}
				}
			}
		}
		if (graphData.blurbsBy) {
			for (let i = 0; i < graphData.blurbsBy.length; i++) {
				data.nodes.push({
					id: graphData.blurbsBy[i].titleLink,
					label: graphData.blurbsBy[i].title,
					group: 'blurbedBook'
				});
				data.edges.push({ from: graphData.author.link, to: graphData.blurbsBy[i].titleLink, width: 1, dashes: true });
				data.nodes.push({
					id: graphData.blurbsBy[i].authorLink,
					label: cleanLabel(graphData.blurbsBy[i].author),
					group: 'blurber'
				});
				data.edges.push({ from: graphData.blurbsBy[i].authorLink, to: graphData.blurbsBy[i].titleLink, width: 5 });
			}
		}
	} else {
		if ((graphData.type = 'bookPage')) {
			console.log(graphData);
			data.nodes[0] = {
				id: graphData.book.link,
				label: graphData.book.name,
				group: 'book'
			};
			if (graphData.book.image && 0) {
				data.nodes[0].image = graphData.book.image;
				data.nodes[0].shape = 'image';
			}
			data.nodes[1] = { id: graphData.author.link, label: cleanLabel(graphData.author.name), group: 'author' };
			data.edges[0] = { from: graphData.author.link, to: graphData.book.link, width: 5 };
			if (graphData.blurbsOf) {
				for (let i = 0; i < graphData.blurbsOf.length; i++) {
					data.nodes.push({
						id: graphData.blurbsOf[i].blurberLink,
						label: cleanLabel(graphData.blurbsOf[i].blurber),
						group: 'blurber'
					});
					data.edges.push({ from: graphData.blurbsOf[i].blurberLink, to: graphData.book.link, width: 1, dashes: true });
				}
			}
		} else {
			data = {
				nodes: [{ id: 1, label: '1' }, { id: 2, label: '2' }, { id: 3, label: '3' }],
				edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 1 }]
			};
		}
	}

	const events = {
		select: function(event) {
			var { nodes, edges } = event;
			console.log(`Nodes: ${nodes}`);
			console.log(`Edges: ${edges}`);
			if (nodes.length) {
				navigate(nodes);
			}
		}
	};
	return (
		<VisualizationWrapper>
			<h1>Graph:</h1>
			<GraphHolder>
				<Graph graph={data} options={GraphOptions} events={events} />
			</GraphHolder>
		</VisualizationWrapper>
	);
};

export default Visualization;
