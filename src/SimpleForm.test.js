import React from 'react';
import { SimpleForm } from './SimpleForm';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Basic Form test', () => {
    it ('shows an error message when no name is entered and submit is pressed', () => {
        const submitFn = jest.fn();
        const wrapper = mount(<SimpleForm onSubmit={submitFn}/>);        

        wrapper.find('form').simulate('submit');
        expect(submitFn).not.toBeCalled();
        expect(wrapper.contains(<p id="error-msg" className="alert alert-danger">name is a required field</p>)).toEqual(true);
    }) 

    it ('shows an error message when a nonalphabetic name is entered and submit is pressed', () => {
        const submitFn = jest.fn();
        const wrapper = mount(<SimpleForm onSubmit={submitFn}/>);        

        wrapper.find('input#Name').simulate('change', { target: { value: 'Jack23' }});
        wrapper.find('form').simulate('submit');
        expect(submitFn).not.toBeCalled();
        expect(wrapper.contains(<p id="error-msg" className="alert alert-danger">Can only contain letters</p>)).toEqual(true);
    })

    it ('submits successfully when a name is entered', () => {
        const submitFn = jest.fn();
        const wrapper = mount(<SimpleForm onSubmit={submitFn}/>);   
        
        wrapper.find('input#Name').simulate('change', { target: { value: 'Jack' }});
        wrapper.find('form').simulate('submit');
        expect(submitFn).toBeCalled();
        expect(wrapper.contains(<p id="error-msg" className="alert alert-danger">name is a required field</p>)).toEqual(false);
    })
})