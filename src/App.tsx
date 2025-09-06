import "./App.css";
import { Root } from "./popup/Root";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const isDarkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

const darkTheme = createTheme({
  palette: {
    mode: isDarkMode ? "dark" : "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Root />
    </ThemeProvider>
  );
}

export default App;
