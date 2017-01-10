import React from 'react'
import Base from './Base.js'

export default class Select extends Base {
    static propTypes = {
        ...Base.propTypes,
        options: React.PropTypes.array,
        value: React.PropTypes.string,
    }

    renderInput() {
        return (
            <select
                className="form-field-input form-field-select"
                required={this.props.required}
                name={this.props.name}
                value={this.props.value}
                onChange={this.handleChange}
            >
                {this.props.placeholder && <option value={null}>{this.props.placeholder}</option>}
                {this.props.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        )
    }
}