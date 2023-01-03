import Breadcrumb from "./Breadcrumb.js";
import Api from "./Api.js";
import Nodes from "./Nodes.js";
import ImgView from "./ImgView.js";

export default function App(target) {
  this.state = {
    isTop: true,
    currentDepth: [],
    nodes: [],
    selectFilePath: "",
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    bread.setState(this.state.currentDepth);
    nodes.setState({ nodes: this.state.nodes, isTop: this.state.isTop });
    imgview.setState(this.state.selectFilePath);
  };

  const bread = new Breadcrumb({
    target,
    initialState: this.state.currentDepth,
  });
  const imgview = new ImgView({
    target,
    initialState: "",
  });
  const api = new Api();
  const nodes = new Nodes({
    target,
    initialState: {
      nodes: this.state.nodes,
      isTop: this.state.isTop,
    },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        try {
          const currentNodes = await api.getData(node.id);
          this.setState({
            ...this.state,
            isTop: false,
            nodes: currentNodes,
            selectFilePath: "",
            currentDepth: [...this.state.currentDepth, node],
          });
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        this.setState({
          ...this.state,
          selectFilePath: node.filePath,
        });
      }
    },
    onBackClick: async () => {
      try {
        const tmp = { ...this.state };

        if (this.state.currentDepth.length === 1) {
          const rootNodes = await api.getData();
          this.setState({
            ...this.state,
            nodes: rootNodes,
            isTop: true,
            currentDepth: [],
            selectFilePath: "",
          });
        } else {
          tmp.currentDepth.pop();
          const prevNodes = await api.getData(
            tmp.currentDepth[tmp.currentDepth.length - 1].id
          );
          this.setState({
            ...this.state,
            nodes: prevNodes,
            isTop: false,
            currentDepth: tmp.currentDepth,
            selectFilePath: "",
          });
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const init = async () => {
    try {
      const currentNodes = await api.getData();
      this.setState({
        ...this.state,
        nodes: currentNodes,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  init();
}
