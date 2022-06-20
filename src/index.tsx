import { Router } from '@reach/router'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'

import './index.css'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import { NotFound } from './NotFound'
import * as serviceWorker from './serviceWorkerRegistration'

// Once you have a Snapshot,
// you can use methods such as getLoadable(), getPromise(), and getInfo_UNSTABLE() 
// to inspect the state and use getNodes_UNSTABLE() to iterate over the set of known atoms.
function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <ErrorBoundary>
    <RecoilRoot>
    <DebugObserver/>
      <Router>
        <App path="/" />
        <App path="/active" />
        <App path="/completed" />
        <NotFound default />
      </Router>
    </RecoilRoot>
  </ErrorBoundary>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
