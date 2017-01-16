import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, Piotr</h2>
  </div>
);

export default CSSModules(App, styles);