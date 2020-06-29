import React from 'react';
import { shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import Form from '../components/form/form';

describe('<Form/>', ()=> {
    it('is alive at application start', () =>{
        let app = shallow(<Form />);
        expect(app.find('span').exists()).toBeTruthy();
    });

    it('changes state on click', ()=> {
        let app = mount(<Form />);
        let button = app.find('button');
        app.setState({'url':'hello','method':'localhost'});
        button.simulate('click');
        expect(app.state('url')).toBe("hello");
        expect(app.state('method')).toBe("localhost");
    });

    it('renders correctly', ()=> {
        const thing = renderer.create(<Form />).toJSON();
        expect(thing).toMatchSnapshot();
    });


});