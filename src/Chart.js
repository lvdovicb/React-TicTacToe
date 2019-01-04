import React, { Component } from 'react';
import './App.css';
import EventsManager from './EventsManager';
import Api from './Api';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			XWins: 0,
			OWins: 0,
			results: 0
		}
		Api.getHistory().then(value => {
			this.setState({ results: value })
			console.log(this.results);
		})
	}
	render() {
		const data = {
			labels: [
				'X',
				'0'
			],
			datasets: [
				{
					data: [300, 50, 100],
					backgroundColor: [
						'#FF6384',
						'#36A2EB'
					],
					hoverBackgroundColor: [
						'#FF6384',
						'#36A2EB'
					]
				}]
		};

		return (
			<Doughnut data={data}
					  width={500}>
			</Doughnut>
		)
	}
}
export default Chart;

