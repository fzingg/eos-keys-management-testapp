import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
//import flushPromises from 'flush-promises'

import HomeView from '../HomeView.vue'



describe('HomeView', () => {

  it('should contains generate 5 keys pair button', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find('[data-buttonid="generatekeyspair"]').exists()).toBe(true);
  })

  it('should have v-list', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find('v-list').exists()).toBe(true);
  })

  it('should have v-list-item-title', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find('v-list-item-title').exists()).toBe(true);
  })

  it('should have 5 v-list-item-title', () => {
    const wrapper = mount(HomeView);
    const items = wrapper.findAll('v-list-item-title');
    expect(items).toHaveLength(5);
  })

  it('should fill the first list item with the new generated public key', async () => {
    const wrapper = mount(HomeView);
    const items = wrapper.findAll('v-list-item-title');
    //await flushPromises();
    await wrapper.vm.afterFormSubmitGenerateKeysPair("pincode") 
    
    const generatedpublickeys = wrapper.vm.generatedpublickeys
    const firstgeneratedpublickey = generatedpublickeys[0]['publickey']

    const first_item_content = items.at(0).text() 

    expect(first_item_content).toEqual(firstgeneratedpublickey)
  });

})