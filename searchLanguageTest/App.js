import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import SelectedLanguage from "./SelectedLanguage.js";
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

  const suggestion = new Suggestion({
    target,
    initialState: {
      selectedItemNumber: 0,
      items: [],
    },
    onSelect: (value) => {
      if (!this.state.selectedLangaugeArray.includes(value)) {
        this.setState({
          selectedLangaugeArray: [...this.state.selectedLangaugeArray, value],
        });
      }
    },
  });

  const selectedLanguage = new SelectedLanguage({
    target,
    initialState: {
      items: [],
    },
  });
}
