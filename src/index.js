import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import './index.css';

const schema = {
    name: {
        type: 'text',
        label: 'Name',
        description: 'description.....',
        placeholder: 'placeholder.....',
        required: true,
    },
    description: {
        type: 'textarea',
        label: 'Description',
        description: 'description.....',
        placeholder: 'placeholder.....',
        required: true,
    },
    type: {
        type: 'select',
        label: 'Select option',
        description: 'select description.....',
        placeholder: 'select value',
        options: [{
            label: 'A',
            value: 'A',
        }, {
            label: 'B',
            value: 'B',
        }],
        required: true,
    }
}

class ExampleForm extends React.Component {
    state = {
        data: {}
    }

    handleChange = (data) => {
        console.log(data)
        this.setState({ data })
    }

    handleSubmit = (data) => {
        console.log('Submit: ', data)
    }

    render () {
        return (
            <div style={{ padding: '10px' }}>
                <Form
                    data={this.state.data}
                    schema={schema}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <ExampleForm />,
    document.getElementById('root')
);
