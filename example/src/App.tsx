import React from 'react'
import ReactScrollableComponent from 'react-scrollable-component'


const App = () => {
  return <div style={{margin: "40px auto", width: "320px"}}>
    <ReactScrollableComponent maxHeight={90}>
      <ul>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
      </ul>
    </ReactScrollableComponent>
  </div>
}

export default App
