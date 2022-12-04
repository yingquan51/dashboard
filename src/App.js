import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import IndexRouter from "router/indexRouter";
import "./App.css"
export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IndexRouter></IndexRouter>
    </ThemeProvider>
  )
}