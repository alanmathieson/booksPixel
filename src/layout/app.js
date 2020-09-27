import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import {GoogleBooks} from './googleBooks.js';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

import styles from './app.css';

export class App extends Component {
	
	constructor(props, context) {
		super(props, context);
		
		this.googleKey;

		ipcRenderer.send('get-keys-object', 'send');
		ipcRenderer.on('get-keys-object', (event, oKeys) => {
			this.googleKey = oKeys.googleKey;
		});
	}


	render() {
		
		
		return (
			<div className='container'>
				<Grid container spacing={3}>
					<Grid
						className='bookMain__Area'
						item
						>
						<GoogleBooks
							googleKey={this.googleKey}
						/>
					</Grid>
				</Grid>
    	</div>
		)
	}
}