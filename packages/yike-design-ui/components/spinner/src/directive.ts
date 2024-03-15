import { App, type Directive, createApp } from 'vue';
import Loading from './loading.vue';

interface LoadingElement extends HTMLElement {
  instanceApp: App;
  hasLoading: boolean;
  vm: HTMLElement;
}

export const vLoading: Directive<LoadingElement, boolean> = {
  mounted(el, binding) {
    const instance = createApp(Loading);
    el.instanceApp = instance;
    el.vm = instance.mount(document.createElement('div')).$el;
    const loadingText = el.getAttribute('data-loading-text');
    if (loadingText) {
      const text = document.createElement('p');
      text.innerText = loadingText;
      el.vm.appendChild(text);
    }

    el.appendChild(el.vm);

    if (binding.value) {
      el.vm.style.display = 'flex';
    }
  },

  updated(el, binding) {
    if (binding.value === binding.oldValue) {
      return;
    } else if (binding.value) {
      el.vm.style.display = 'flex';
    } else {
      el.vm.style.display = 'none';
    }
  },
};
