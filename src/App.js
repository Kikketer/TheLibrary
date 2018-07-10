import React, { Component } from 'react'
import Print from 'TheDependency/print'
import Portal from './portal'

class App extends Component {
  constructor() {
    super()
    this.state = { DynamicPrint: null, DynamicDocument: null, StaticDocument: null }

    this.onSetDynamicDocument = this.onSetDynamicDocument.bind(this)
    this.onSetStaticDocument = this.onSetStaticDocument.bind(this)
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

  onSetDynamicDocument(DynamicDocument) {
    console.log('Dynamic Document is ready...')
    this.setState({ DynamicDocument })
  }

  onSetStaticDocument(StaticDocument) {
    console.log('Static Document is ready...')
    this.setState({ StaticDocument })
  }

  render() {
    const { DynamicPrint, DynamicDocument, StaticDocument } = this.state
    return (
      <div>
        <p>You should see the Print component below:</p>
        <p>Statically built in:</p>
        <Portal onSetDocument={this.onSetStaticDocument}>
          <div style={{ backgroundColor: 'lightpink', padding: 10, borderRadius: 5 }}>
            {StaticDocument && <Print document={StaticDocument} />}
          </div>
        </Portal>
        <p>Dynamically added on the fly:</p>
        <Portal onSetDocument={this.onSetDynamicDocument}>
          <div style={{ backgroundColor: 'lightpink', padding: 10, borderRadius: 5 }}>
            {!!DynamicPrint && !!DynamicDocument && <DynamicPrint document={DynamicDocument} />}
          </div>
        </Portal>
      </div>
    )
  }
}

export default App
