import React, { Component } from 'react'
import Print from 'TheDependency/print'
import Portal from './portal'

class App extends Component {
  constructor() {
    super()
    this.state = { DynamicPrint: null, document: null }

    this.onSetDocument = this.onSetDocument.bind(this)
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

  onSetDocument(document) {
    console.log('Document is ready...')
    this.setState({ document })
  }

  render() {
    const { DynamicPrint, document } = this.state
    return (
      <div>
        <p>You should see the Print component below:</p>
        <p>Statically built in:</p>
        <Portal onSetDocument={this.onSetDocument}>
          <div style={{ backgroundColor: 'lightpink', padding: 10, borderRadius: 5 }}>
            {document && <Print document={document} />}
          </div>
        </Portal>
      </div>
    )
  }
}

export default App
