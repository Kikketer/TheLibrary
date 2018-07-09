import React, { Component } from 'react'
import Print from 'the-dep/print'

class App extends Component {
  constructor() {
    super()
    this.state = { DynamicPrint: null }
  }

  componentDidMount() {
    setTimeout(() => {
      import(/*webpackPrefetch: true*/ 'the-dep/print').then(Print => {
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
        <div style={{ backgroundColor: 'lightpink', padding: 10, borderRadius: 5 }}>
          <Print />
        </div>
        <p>Dynamically loaded after the fact</p>
        <div style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 5 }}>{DynamicPrint && <DynamicPrint />}</div>
      </div>
    )
  }
}

export default App
