import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import HomeView from '../HomeView.vue'




describe('HomeView', () => {

  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    vuetify = new Vuetify();
    wrapper = mount(HomeView, {
      localVue,
      vuetify,
      attachToDocument: true,
    });
  });


  it('should contains generate 5 keys pair button', () => {
    expect(wrapper.find('[data-buttonid="generatekeyspair"]').exists()).toBe(true);
  })


  // it('should format message on button click', () => {
  //   const wrapper = mount(HomeView);
  //   const { vm } = wrapper;
  //   wrapper.setData({
  //       name: 'Adam',
  //   });
  //   const button = wrapper.find('button');
  //   button.trigger('click');
  //   expect(vm.message).toBe('Hello Adam');
  // });
  // /* async keyword is needed because of updating the DOM.
  // We need to wait for button click to complete and call formatMsg function.
  // Otherwise the last assertion would fail */
  // it('should show message on button click', async () => {
  //   const wrapper = mount(HomeView);
  //   const { vm } = wrapper;
  //   wrapper.setData({
  //       name: 'Adam',
  //   });
  //   const button = wrapper.find('button');
  //   await button.trigger('click');
  //   const p = wrapper.find('p');
  //   expect(p.text()).toBe('Hello Adam');
  // });
})