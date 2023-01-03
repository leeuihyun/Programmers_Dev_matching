export default function ImgView({ target, initialState }) {
  const img_url = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public`;
  this.state = initialState;
  this.element = document.createElement("div");
  this.element.className = "Modal ImageViewer";
  target.appendChild(this.element);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.onClick = (e) => {
    const img = this.element.querySelector("img");
    if (!img.contains(e.target)) this.setState();
  };
  this.render = () => {
    this.element.innerHTML = this.state
      ? `<div class="content"><img src="${img_url}${this.state}"></div>`
      : "";
    if (this.state) {
      this.element.addEventListener("click", this.onClick);
    } else {
      this.element.removeEventListener("click", this.onClick);
    }
    this.element.style.display = this.state ? "block" : "none";
  };
}
