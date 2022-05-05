import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'


configure({ adapter: new Adapter() });




import RecipeCreate, {validate} from './components/RecipeCreate/RecipeCreate';



describe('<RecipeCreate /> Mounted', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<RecipeCreate />);
    });

it('El form debe tener un input con name "title" y type "text"', () => {
    const { container } = render(<RecipeCreate />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('title');
  });

  xit('El input de username tiene que tener la clase danger si tiene un error',  () => {
      wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'My new value'}});
      const ele = wrapper.find('input[name="username"]');
      expect(ele.hasClass('danger')).toBeTruthy();
   });
  xit('El input de username NO tiene que tener la clase danger si tiene un usuario correcto',  () => {
      wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'toni@soyhenry.com'}});
      const ele = wrapper.find('input[name="username"]');

      expect(ele.hasClass('danger')).toBeFalsy();
    });
  xit('El input de password tiene que tener la clase danger si tiene un error',  () => {
      wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'My new value'}});
      const ele = wrapper.find('input[name="username"]');
      expect(ele.hasClass('danger')).toBeTruthy();
    });
  xit('El input de password NO tiene que tener la clase danger si tiene un password correcto',  () => {
      wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hola123'}});
      const ele = wrapper.find('input[name="password"]');
      expect(ele.hasClass('danger')).toBeFalsy();
    });
});
