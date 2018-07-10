import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.style = {
      base: {
        width: '100%',
        background: '#187DB1',
        border: 0
      }
    }

    this.getHead = this.getHead.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    this.didMountOrUpdate()
  }

  componentDidUpdate() {
    this.didMountOrUpdate()
  }

  didMountOrUpdate() {
    const document = this.node.contentDocument.defaultView.document
    if (!document || this.state.document === document) return

    const { initialContent } = this.props
    document.open('text/html', 'replace')
    document.write(initialContent)
    document.close()

    this.setState({ document })
  }

  getHead() {
    return <style />
  }

  handleRef(node) {
    const { innerRef } = this.props
    this.node = node
    innerRef(this.node.contentDocument)
  }

  render() {
    const { children, expanded, theme } = this.props
    const { document } = this.state

    return (
      <iframe style={this.style.base} ref={this.handleRef}>
        {document && createPortal(this.getHead(), document.head)}
        {document && createPortal(children, document.body)}
      </iframe>
    )
  }
}

Portal.propTypes = {
  initialContent: PropTypes.string,
  innerRef: PropTypes.func,
  children: PropTypes.node
}

Portal.defaultProps = {
  initialContent: '<!doctype html><html><head></head><body></body></html>',
  innerRef: () => {}
}

export default Portal
