import React from 'react'

export default (options, WrappedComponent) => class extends React.Component {
  constructor (props) {
    super(props)
    this.validate = options.validate

    this.state = options.fields.reduce((result, field) => {
      result.fields.push(field)
      result.errors[field] = ''
      result.values[field] = ''
      result.touched[field] = false
      return result
    }, { fields: [], errors: {}, values: {}, touched: {} })

    this.mapStateToProps.bind(this)
  }

  onBlur (field, e) {
    var touched = this.state.touched
    touched[field] = true
    this.setState({ touched: touched })
  }

  onChange (field, e) {
    var values = this.state.values
    values[field] = e.target.value
    this.setState(this.validate(values))
  }

  mapStateToProps (state) {
    var reducer = (result, field) => {
      result[field] = {
        value: state.values[field],
        error: state.errors[field],
        touched: state.touched[field],
        onChange: this.onChange.bind(this, field),
        onBlur: this.onBlur.bind(this, field)
      }
      return result
    }

    return state.fields.reduce(reducer, {})
  }

  render () {
    return <WrappedComponent {...this.mapStateToProps(this.state)} />
  }
}
