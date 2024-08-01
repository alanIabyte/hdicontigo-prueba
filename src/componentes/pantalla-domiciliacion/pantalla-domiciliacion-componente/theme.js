import { createTheme } from "@mui/material/styles";

// Crear un tema personalizado con el color verde
const themeStepper = createTheme({
  palette: {
    primary: {
      main: "#65A518", // Cambia esto al color verde que desees
    },
  },
});

const buttonStyle = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        // Estilos personalizados para los botones internos del Stepper
        containedPrimary: {
          backgroundColor: "#65A518", // Cambia el color de fondo
          color: "white", // Cambia el color del texto
          "&:hover": {
            backgroundColor: "#65A518", // Cambia el color de fondo en hover
          },
        },
      },
    },
  },
});

export { themeStepper, buttonStyle };
