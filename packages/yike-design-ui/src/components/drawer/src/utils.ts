type DrawerOperator = {
  target: HTMLElement | Element;
  drawer_id: number;
};

let count = 0;

export const drawer = (selector: string): DrawerOperator => {
  const drawer_id = (count += 1);
  const target = document.querySelector(selector) ?? document.body;

  return { target: target, drawer_id: drawer_id };
};
