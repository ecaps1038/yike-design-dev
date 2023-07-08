// 节流
export const throttle = (fn: () => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null;

    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                fn();
                timer = null;
            }, delay);
        }
    };
};
// 防抖
export const debounce = (fn: () => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null;

    return () => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn();
        }, delay);
    };
};

