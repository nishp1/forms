import React, { Component } from 'react'

export default class Base extends Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        required: React.PropTypes.bool,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,

        /**
         * Optinoally customize rendering for field
         */
        renderer: React.PropTypes.func,
    }

    handleChange = (event) => {
        const value = event.target.value

        this.setState({ isPristine: false, value: value }, () => {
            this.props.onChange(this.props.name, value)
        })
    }

    /**
     * Retruns true if field is valid, false otherwise.
     */
    validate = (props) => {
        props = props || this.props

        if (props.required && !props.value) {
            this.setState({ error: 'This field is required' })
            return false
        }

        this.setState({ error: null })
        return true
    }

    value() {
        return this.state.value
    }

    renderErrors() {
        if (!this.state.error) {
            return null
        }
        return <div style={{ color: 'red' }}>{this.state.error}</div>
    }

    renderLabel() {
        return this.props.label && <label className="form-field-label" htmlFor={this.props.name}>{this.props.label}</label>
    }

    renderDescription() {
        return this.props.description && <div className="form-field-description">{this.props.description}</div>
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            if (this.state.error) {
                this.validate(nextProps)
            }
            this.setState({ value: nextProps.value })
        }
    }

    renderInput() {
        throw new Error('renderInput() must be implemented by subclass extending Base')
    }

    render() {
        if (this.props.renderer) {
            return this.props.renderer.call(this)
        }

        return (
            <div className="form-field">
                {this.renderLabel()}
                {this.renderDescription()}
                {this.renderInput()}
                {this.renderErrors()}
            </div>
        )
    }
}
