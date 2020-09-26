import React from 'react';
import ReactDom from 'react-dom';

import {App} from './layout/app.js';
import styles from './desktopEntry.css';


// render left hand side
ReactDom.render(
	<App/>, 
document.getElementById('App'));