import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Signmessage from '../Signmessage.vue'


describe('Signmessage', () => {


  it('should contains sign message button', () => {
    const wrapper = mount(Signmessage);
    expect(wrapper.find('[data-buttonid="encrypt-message"]').exists()).toBe(true);
  })

})