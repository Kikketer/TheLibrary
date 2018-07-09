import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export function init () {
  // First create the element because we inject
  let element = document.createElement('div')
  element.id = 'dep-test-root'
  document.getElementsByTagName('body')[0].appendChild(element)

  ReactDOM.render(<App />, document.getElementById('dep-test-root'));
}