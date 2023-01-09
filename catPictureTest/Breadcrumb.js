export default function Breadcrumb({
  target,
  initialState,
  onClick,
  onRootClick,
}) {
  this.element = document.createElement("nav");
  this.element.className = "Breadcrumb";
  this.state = initialState;
  target.appendChild(this.element);
  this.onClick = onClick;
  this.onRootClick = onRootClick;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.element.innerHTML = `
          <div class = 'Path' data-node-id = '-1'>root</div>
          ${this.state
            .map(
              (v, index) =>
                `<div data-node-id = "${index}" class = 'Path'>${v.name}</div>`
            )
            .join("")}
      `;
    this.element.querySelectorAll(".Path").forEach((v, index) => {
      v.addEventListener("click", (e) => {
        const { nodeId } = e.target.dataset;
        const number = Number(nodeId) + 1;
        if (nodeId) {
          if (number === 0) {
            console.log("root");
            this.onRootClick();
          } else if (number === this.state.length) {
            console.log("현재 페이지입니다.");
          } else {
            console.log(this.state[nodeId]);
            this.onClick(this.state[nodeId]);
          }
        }
      });
    });
  };
}
