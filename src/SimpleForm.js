import * as React from 'react';
import { Form, Field } from 'react-final-form'
import { string, object } from 'yup';

const schema = object().shape({
    name: string().required().matches(/^[a-z]*$/i, "Can only contain letters")
});

const validate = (value) => {
    try {
        schema.validateSync({ name: value });
    } catch (e) {
        return e.errors;
    }
}

export class SimpleForm extends React.Component{
    handleSubmit = () => {
        if (this.props.onSubmit) this.props.onSubmit();
        console.log("Form submitted successfully");
    }

    render() {
        return (
            <div className="SimpleForm">
                <Form
                    onSubmit={ this.handleSubmit }
                    render={({ handleSubmit }) => (
                        <form id="form" onSubmit={ handleSubmit }>
                            <Field name="firstName" validate={validate}>
                                {({ input, meta }) => (
                                    <>
                                        <label htmlFor="Name">Name</label>
                                        <div className="input-group mb-3">
                                            <input id="Name" 
                                                type="text"
                                                placeholder="Name" 
                                                className="form-control"
                                                {...input} />
                                        </div>
                                        {meta.error && meta.touched && <p id="error-msg" className="alert alert-danger">{meta.error}</p>}
                                    </>
                                )}
                            </Field>
                            <button type="submit" className="btn btn-primary" id="btn-submit">
                                Ok
                            </button>                             
                        </form>                       
                    )}
                    />
            </div>
        )
    }
}