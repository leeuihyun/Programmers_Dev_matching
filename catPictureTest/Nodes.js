export default function Nodes({ target, initialState, onClick, onBackClick }) {
  this.element = document.createElement("div");
  this.element.className = "Nodes";
  target.appendChild(this.element);
  this.state = initialState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const template = this.state.nodes
        .map((node, index) => {
          return `<div class = 'Node' data-node-id = "${node.id}">
                  <img src=${
                    node.type === "DIRECTORY"
                      ? "./assets/directory.png"
                      : "./assets/file.png"
                  } data-node-id = "${node.id}">
                  <div data-node-id = "${node.id}">${node.name}</div>
              </div>`;
        })
        .join("");
      this.element.innerHTML =
        this.state.isTop === false
          ? `<div class="Node"><img src="./assets/prev.png"></div>${template}`
          : template;
      this.element.querySelectorAll(".Node").forEach((v) => {
        v.addEventListener("click", (e) => {
          const { nodeId } = e.target.dataset;
          if (!nodeId) this.onBackClick();
          else {
            console.log(nodeId);
            const selectedNode = this.state.nodes.find(
              (node) => node.id === nodeId
            );
            console.log("selectedNode", selectedNode);
            if (selectedNode) this.onClick(selectedNode);
          }
        });
      });
    }
  };

  this.render();
}
