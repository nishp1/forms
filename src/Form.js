import React, { PureComponent } from 'react'
import Text from './fields/Text.js'
import TextArea from './fields/TextArea.js'
import Select from './fields/Select.js'

let FieldTypes = {
    text: Text,
    textarea: TextArea,
    select: Select,
}

export default class Form extends PureComponent {
    static propTypes = {
        data: React.PropTypes.object,
        schema: React.PropTypes.object,
        onChange: React.PropTypes.func,
        onSubmit: React.PropTypes.func.isRequired,
    }

    state = {
        disableActions: false,
    }

    handleFieldChange = (fieldKey, value) => {
        this.props.onChange({
            ...this.props.data,
            [fieldKey]: value,
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()
        let isValid = true

        // disable action buttons while we validate and get value
        this.setState({ disableActions: true })

        let data = {}

        for (let fieldKey in this.refs) {
            if (this.refs.hasOwnProperty(fieldKey)) {
                isValid = isValid && (await this.refs[fieldKey].validate())
                data[fieldKey] = await this.refs[fieldKey].value()
            }
        }

        if (isValid) {
            await this.props.onSubmit(data)
        }
        // enable actions
        this.setState({ disableActions: false })
    }

    renderSchema() {
        let components = []

        for (let fieldKey in this.props.schema) {
            if (this.props.schema.hasOwnProperty(fieldKey)) {
                const fieldOptions = this.props.schema[fieldKey]
                const Component = fieldOptions.component || FieldTypes[fieldOptions.type]

                if (!Component) {
                    throw new Error(`No component found for field ${fieldOptions.type}`)
                }

                components.push(
                    <Component
                        {...fieldOptions}
                        ref={fieldKey}
                        key={fieldKey}
                        name={fieldKey}
                        value={(this.props.data || {})[fieldKey]}
                        onChange={this.handleFieldChange}
                    />
                )
            }
        }

        return components
    }

    render() {
        return (
            <form className="Form" noValidate onSubmit={this.handleSubmit}>
                {this.renderSchema()}
                <div className="FormFooter" style={{ marginTop: 10 }}>
                    <button type="submit" disabled={this.state.disableActions}>Save</button>
                    <button disabled={this.state.disableActions}>Cancel</button>
                </div>
            </form>
        );
    }
}
