class Header extends HTMLElement {
  constructor() {
    super();

    (async () => {
      const parser = new DOMParser();

      const doc = parser.parseFromString(await this.build(), 'text/html');
      const template = doc.querySelector('template');
      console.log(template.content);
      this.appendChild(template.content);
    })();
  }

  async build() {
    const response = await fetch('./components/header/index.html');
    const data = await response.text();

    return data;
  }

  async styles() {
    const style = document.createElement('style');

    const response = await fetch(`./components/header/index.css`);
    const data = await response.text();

    style.textContent = data;

    return style;
  }
}

customElements.define('header-component', Header);
