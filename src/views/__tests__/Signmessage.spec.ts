import { describe, it, expect, beforeEach } from 'vitest'
import { 
  generateUniqueKeysPair,
  generateMessageSignature
   } from '@/mixins/crypto-utils';

import { mount } from '@vue/test-utils'
import Signmessage from '../Signmessage.vue'


describe('Signmessage', () => {


  it('should contains sign message button', () => {
    const wrapper = mount(Signmessage);
    expect(wrapper.find('[data-buttonid="encrypt-message"]').exists()).toBe(true);
  })

  it('should contain a select input element', () => {
    const wrapper = mount(Signmessage);
    expect(wrapper.find('[selectid="keys-pair-select"]').exists()).toBe(true);
  });


  it('should contain a DIV for displaying signature', () => {
    const wrapper = mount(Signmessage);
    expect(wrapper.find('#messageencrypted-signature').exists()).toBe(true);
  });

  it('should contain a default initial signature text',  () => {
    const wrapper = mount(Signmessage);
    expect(wrapper.find('#messageencrypted-signature').text()).toEqual("The signature of the encrypted message will be displayed here");
  });

  it('should display the signature properly', async () => {
    const wrapper = mount(Signmessage);

    // We generate a new Keys Pair and Sign a message
    const pincode = "1234"
    const inputmessage = "inputmessage"

    const newKeysPair = await generateUniqueKeysPair(pincode)
    const encPrivateKey = newKeysPair[1];
    const newSignature = generateMessageSignature(inputmessage, encPrivateKey, pincode)

    await wrapper.vm.displaySignature("inputmessage", encPrivateKey, pincode)
    expect(wrapper.find('#messageencrypted-signature').text()).toEqual(newSignature);
  });

  
  


})