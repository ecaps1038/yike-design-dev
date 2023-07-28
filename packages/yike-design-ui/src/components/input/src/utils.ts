import { Ref, onMounted, ref } from 'vue';

export const useInputTooltip = (
  inputRef: Ref<HTMLInputElement | undefined>,
) => {
  let inputParnet: HTMLElement | null | undefined;
  const isShowing = ref(false);

  onMounted(() => {
    inputParnet = inputRef.value?.parentElement;

    if (!inputParnet) return;
  });

  const set = (text: string) => {
    inputParnet?.setAttribute('data-tooltip', text);
    isShowing.value = true;
    console.log(isShowing.value);
  };

  const unset = () => {
    if (!isShowing.value) return;
    inputParnet!.removeAttribute('data-tooltip');
    isShowing.value = false;
  };

  return { set, unset };
};
