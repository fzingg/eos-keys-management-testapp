import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Recoverpublickey from '../Recoverpublickey.vue'


describe('Recoverpublickey', () => {


  it('should contains recover public key button', () => {
    const wrapper = mount(Recoverpublickey);
    expect(wrapper.find('[data-buttonid="recover-publickey"]').exists()).toBe(true);
  })

})