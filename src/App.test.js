import React from 'react';
import ReactDOM from 'react-dom'
import ConvaliaJSApp from './App';


it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConvaliaJSApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
