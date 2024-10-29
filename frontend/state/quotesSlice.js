import { createSlice } from "@reduxjs/toolkit";

// ✨ create your `quotesSlice` in this module

let id = 1;
const getNextId = () => id++;
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    deleteQuote(state, action) {
      state.quotes = state.quotes.filter(qt => qt.id != action.payload)
    },
    setHightlightQuote(state, action) {
      state.highlightedQuote = action.payload;
    },
    markFakeQuote(state, action) {
      state.quotes = state.quotes.map((qt) => {
        return qt.id === action.payload ? { ...qt, apocryphal: !qt.apocryphal } : qt;
      });
    },
    toggleFakeQuotesDisplay(state) {
      state.displayAllQuotes = !state.displayAllQuotes
    },
    createNewQuote: {
      prepareNewQuote(quote) {
        const newQuote = {
          id: getNextId(),
          quoteText: quote.quoteText,
          authorName: quote.authorName,
          apocryphal: false
        }
      return {payload: newQuote}
      },
      reducer(state, action) {
        state.quotes.push(action.payload)
      }
    }
  },
});

export const {
  deleteQuote,
  setHightlightQuote,
  markFakeQuote,
  toggleFakeQuotesDisplay,
  createNewQuote,
} = quotesSlice.actions;

export default quotesSlice.reducer;
