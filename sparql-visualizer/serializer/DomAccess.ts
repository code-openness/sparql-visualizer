export function createElement(markup: string): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.innerHTML = markup.trim();
    return wrapper.firstElementChild as HTMLElement;
}
