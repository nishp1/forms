import React from 'react'
import Base from './Base.js'

export default class Text extends Base {
    static propTypes = {
        ...Base.propTypes,
        value: React.PropTypes.string,
    }

    renderInput() {
        return (
            <input
                type="text"
                className="form-field-input"
                required={this.props.required}
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.props.value || ''}
                onChange={this.handleChange}
            />
        )
    }
}
