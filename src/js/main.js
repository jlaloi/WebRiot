require('file-loader?name=/public/[name].[ext]!../index.html');
import css from '../styles/styles.css';
window.$ = require('jquery');

require('../tag/app.tag');
riot.mount('app')