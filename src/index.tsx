import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/pt-mono";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  fonts: {
    body: "PT Mono",
  },
  components: {
    Text: {
      baseStyle: (props: any) => ({
        color: mode("gray.900", "whiteAlpha.900")(props),
      }),
    },
  },
  shadows: {
    insetLight: "1px -1px 6px 2px rgba(0, 0, 0, 0.08)",
    outsetLight: "-2px 2px 8px 2px rgba(0, 0, 0, 0.08)",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
