export default function Loading({ target, initialState }) {
  this.element = document.createElement("div");
  this.element.className = "Modal Loading";
  this.state = initialState;
  target.appendChild(this.element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.element.innerHTML = `<div class="content"><img src="./assets/nyan-cat.gif"></div>`;
    this.element.style.display = this.state ? "block" : "none";
  };

  this.render();
}
