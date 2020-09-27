import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import mongo from '../mongoInterface.js';


export class GoogleBooks extends Component {
	
	constructor(props, context) {
		super(props, context);
	

		this.GOOGinstance = axios.create({
			baseURL: 'https://www.googleapis.com/books/v1/volumes',
			timeout: 2000,
			params: {key: this.props.googleKey}
		});

	}

	getBookSearch = async () => {
		// let bookSearchRequest = await this.GOOGinstance.get(`?q={Agatha}`);	
		// console.log(bookSearchRequest);

		let collections = await mongo.getCollections();
		console.log(collections);
	}


	render() {
		
		
		return (
			<div className='bookMain__areaGoogle'>
				<AppBar 
					position="static"
					>
					<Toolbar>
						<Button 
							color="inherit"
							onClick={(event) => {
								this.getBookSearch();
							}}
							>
							Load API
						</Button>
					</Toolbar>
				</AppBar>
    		</div>
		)
	}
}