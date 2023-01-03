const baseUrl =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export default function Api() {
  this.getData = async (nodeId) => {
    try {
      const response = await fetch(`${baseUrl}${nodeId ? nodeId : ""}`);
      if (response.ok) {
        const json = await response.json();
        return json;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
