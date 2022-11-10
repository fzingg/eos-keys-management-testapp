import { describe, it, expect, beforeEach } from 'vitest'

import { 
  generateUniqueKeysPair,
  generateMessageSignature
   } from '@/mixins/crypto-utils';

import { mount } from '@vue/test-utils'
import Recoverpublickey from '../Recoverpublickey.vue'


describe('Recoverpublickey', () => {


  it('should contains recover public key button', () => {
    const wrapper = mount(Recoverpublickey);
    expect(wrapper.find('[data-buttonid="recover-publickey"]').exists()).toBe(true);
  })

  it('should contain a DIV for displaying recovered public key', () => {
    const wrapper = mount(Recoverpublickey);
    expect(wrapper.find('#recovered-publickey').exists()).toBe(true);
  });

  it('should display the checksum error when signature is wrong', async () => {
    const wrapper = mount(Recoverpublickey);
    const recoveredKey = await wrapper.vm.recover("wrong_signature", "message")
    expect(wrapper.find('#recovered-publickey').text()).toEqual("Signature checksum doesn't match");
  });

  it('should display the correct public key', async () => {
    const wrapper = mount(Recoverpublickey);

    // We generate a new Keys Pair and Sign a message
    const pincode = "1234"
    const inputmessage = "inputmessage"

    const newKeysPair = await generateUniqueKeysPair(pincode)
    const publicKey = newKeysPair[0];
    const encPrivateKey = newKeysPair[1];
    const newSignature = generateMessageSignature(inputmessage, encPrivateKey, pincode)

    const recoveredKey = await wrapper.vm.recover(newSignature, inputmessage)
    expect(wrapper.find('#recovered-publickey').text()).toEqual(publicKey);
  });

})