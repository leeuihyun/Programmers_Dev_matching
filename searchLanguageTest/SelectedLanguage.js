export default function SelectedLanguage({ target, initialState }) {
  this.element = document.createElement("div");
  this.element.className = "SelectedLanguage";
  this.state = initialState;
  target.appendChild(this.element);

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    if (this.state.items.length > 5) {
      this.state.items = this.state.items.slice(
        this.state.items.length - 5,
        this.state.items.length
      );
    }
    this.render();
  };

  this.render = () => {
    console.log(this.state.items);
    if (this.state.items.length > 0) {
      this.element.style.display = "block";
      this.element.innerHTML = `
          <ul>
          ${this.state.items.map((v) => `<li>${v}</li>`).join("")}
          </ul>
          `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };

  this.render();
}
