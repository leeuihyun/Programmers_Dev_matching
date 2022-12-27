import SearchInput from "./SearchInput.js";
import { fetchLanguage } from "./Api.js";

export default function App(target) {
  this.state = {
    fetchLanguageArray: [],
    selectedLanguageArray: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
  };

  const searchInput = new SearchInput({
    target,
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          fetchLanguageArray: [],
        });
      } else {
        const fetchData = await fetchLanguage(keyword);
        this.setState({
          fetchLanguageArray: fetchData,
        });
      }
    },
  });
}
