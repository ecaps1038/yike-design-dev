import { Ref, onMounted } from 'vue';

export const useInputTooltip = (
  inputRef: Ref<HTMLInputElement | undefined>,
) => {
  let inputParnet: HTMLElement | null | undefined;

  onMounted(() => {
    inputParnet = inputRef.value?.parentElement;

    if (!inputParnet) return;
  });

  const set = (text: string) => {
    inputParnet?.setAttribute('data-tooltip', text);
  };

  const unset = () => {
    inputParnet!.removeAttribute('data-tooltip');
  };

  return { set, unset };
};
