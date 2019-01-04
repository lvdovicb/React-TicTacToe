import React, { Component } from "react"
import EventsManager from './EventsManager'

const DefaultTime = 5000;

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeLeft: DefaultTime,
		};
		this.timer = null
		EventsManager.addListener('player_move', (player) => {
			this.reset();
			this.start();
		});
		EventsManager.addListener('timer', (action) => {
			if (action === 'stop') {
				this.stop();
			}
			else if (action === 'start') {
				this.start();
			}
			else if (action === 'reset') {
				this.reset();
			}
		});
	}
	start = () => {
		this.timer = setInterval(() => {
			this.setState({ timeLeft: this.state.timeLeft - 500 })
			if (this.state.timeLeft <= 0) {
				this.reset()
				EventsManager.emit('timer', 'reset');
				EventsManager.emit('next_player', 'next');
			};

		}, 500);
	}
	stop = () => {
		clearInterval(this.timer)
		console.log((this.timer));
	}
	reset = () => {
		this.stop()
		this.setState({ timeLeft: DefaultTime })
	}
	render() {
		return (
			<div>
				<p>Time left : {`${this.state.timeLeft}   ms`}</p>
				<button onClick={() => this.start()}>Start</button>
				<button onClick={() => this.stop()}>Stop</button>
				<button onClick={() => this.reset()}>Reset</button>
			</div>
		)
	}
}
export default Timer;