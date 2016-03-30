import React from 'react'

export default (options, WrappedComponent) => class FormValidation extends React.Component {
  constructor () {
    super()
    this.validate = options.validate

    this.state = options.fields.reduce((result, field) => {
      result.fields.push(field)
      result.errors[field] = ''
      result.values[field] = ''
      result.touched[field] = false
      return result
    }, { fields: [], errors: {}, values: {}, touched: {} })

    this.mapStateToProps.bind(this)
    this.runValidate.bind(this)
  }

  onBlur (field, e) {
    var touched = this.state.touched
    touched[field] = true
    this.setState({ touched: touched })
    this.runValidate(field, e.target.value)
  }

  onChange (field, e) {
    this.runValidate(field, e.target.value)
  }

  runValidate (field, value) {
    var values = this.state.values
    values[field] = value
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
    return <WrappedComponent {...this.props} {...this.mapStateToProps(this.state)} />
  }

  getFormData () {
    return this.state.values
  }
}
