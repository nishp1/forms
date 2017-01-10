import React from 'react'
import Base from './Base.js'

export default class TextArea extends Base {
    static propTypes = {
        ...Base.propTypes,
        value: React.PropTypes.string,
    }

    renderInput() {
        return (
            <textarea
                className="form-field-input form-field-textarea"
                required={this.props.required}
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.props.value || ''}
                onChange={this.handleChange}
            />
        )
    }
}
