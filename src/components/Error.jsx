import React, { Component } from "react";
class Error extends Component {
    state = {
        hasError: false, //falg as error 
        error: null, //what this error 
        errorInfo: null //error information 
    };
    static getDerivedStateFromError() {
        //update state so the next render will show full back error 
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        //call service like trackjs, sentry
        this.setState( {error, errorInfo});
    }


    render () {
        //render fullback ui in case of appear any error 
        if (this.state.hasError) {
            return (
                <div>
                    <h2>
                        someThing Went Wrong.;
                    </h2>
                    <p>{this.state.error && this.state.error.toString()}</p>
                </div>
            )
        }
        //render just render if we have not error 
        return this.props.children;
    }
}
export default Error;