export default function Suggestion({ target, initialState, onSelect }) {
  this.element = document.createElement("div");
  this.element.className = "Suggestion";
  this.state = initialState;

  target.appendChild(this.element);
  this.state = {
    selectedItemNumber: 0,
    items: initialState.items,
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    console.log(this.state.items);
    if (this.state.items.length > 0) {
      const { selectedItemNumber, items = [] } = this.state;
      this.element.style.display = "block";
      this.element.innerHTML = `
              <ul>
                  ${items
                    .map(
                      (v, index) =>
                        `<li class='${
                          index === selectedItemNumber
                            ? "Suggestion__item--selected"
                            : ""
                        }' data-index=${index} data-value = ${v}>${v}</li>`
                    )
                    .join("")}
              </ul>
          `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };

  window.addEventListener("keyup", (e) => {
    const { selectedItemNumber } = this.state;
    if (this.state.items.length > 0) {
      const includeKeyArray = ["ArrowDown", "ArrowUp"];
      const lastIndex = this.state.items.length - 1;
      let nextIndex = selectedItemNumber;
      if (includeKeyArray.includes(e.key)) {
        if (e.key === "ArrowDown") {
          nextIndex =
            selectedItemNumber === lastIndex ? 0 : selectedItemNumber + 1;
        } else {
          nextIndex =
            selectedItemNumber === 0 ? lastIndex : selectedItemNumber - 1;
        }
        this.setState({
          ...this.state,
          selectedItemNumber: nextIndex,
        });
      }
      if (e.key === "Enter") {
        alert(this.state.items[this.state.selectedItemNumber]);
        onSelect(this.state.items[this.state.selectedItemNumber]);
      }
    }
  });

  window.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) {
      const { index, value } = li.dataset;
      alert(value);
      onSelect(this.state.items[index]);
    }
  });

  this.render();
}
