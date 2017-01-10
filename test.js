// @flow

import React, { Component } from 'react'

// type BaseProps = {
//     name: string
// }

// type BaseState<T> = {
//     error: string,
//     value: ?T,
// }

// class Base<Props, V> extends Component<any, BaseProps & Props, BaseState<V>> {
//     state = {
//         error: '',
//         value: null,
//     }
//     render() {
//         return <div>this.props.name</div>
//     }
// }


// type ExtendedProps = {
//     foo: string,
// }

// class ExtendedBase extends Base<ExtendedProps, string> {
//     render () {
//         return <div>this.props.name</div>
//     }
// }






type BaseState = {
    error: string,
};

class Base<T> extends Component {
    props: {
      name: string
    }
    state: {
      error: ?string,
      value: ?T
    }
    state = {
      error: null,
	    value: null
    }
    doSomething () {
      this.setState({ error: null })
    }
    render() {
        return <div>this.props.name</div>
    }
}


// type ExtendedProps = {
//     foo: string,
// }

class ExtendedBase extends Base<string> {
    render () {
        return <div>this.props</div>
    }
}