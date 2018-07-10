import React, { Component } from 'react'
import Print from 'TheDependency/print'
import Portal from './portal'

class App extends Component {
  constructor() {
    super()
    this.state = { DynamicPrint: null }
  }

  componentDidMount() {
    setTimeout(() => {
      import(/*webpackPrefetch: true*/ 'TheDependency/print').then(Print => {
        console.log('Got the print library!')
        this.setState({
          DynamicPrint: Print.default
        })
      })
    }, 1000)
  }

  render() {
    const { DynamicPrint } = this.state
    return (
      <div>
        <p>You should see the Print component below:</p>
        <p>Staticlly built in:</p>
        <Portal>
          <div style={{ backgroundColor: 'lightpink', padding: 10, borderRadius: 5 }}>
            <Print />
          </div>
        </Portal>
        <p>Dynamically loaded after the fact</p>
        <Portal>
          <div style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 5 }}>
            {DynamicPrint && <DynamicPrint />}
          </div>
        </Portal>
      </div>
    )
  }
}

export default App
