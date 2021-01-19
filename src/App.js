// importaciones de tereceros
import { Provider } from "react-redux";

//importaciones propias
import { store } from "./store/store";
import { AppRouter } from "./router/AppRouter";
import { theme } from "./style";
import { ThemeProvider } from "@material-ui/core";


export const App = () => {
  return (

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>

  )
}
