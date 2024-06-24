import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

interface IThemeProps{
    children:any;
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF7000"
        },
        secondary: {
            main: "#FFAC35"
        },
        error: {
            main: "#F52300"
        },
        success: {
            main: "#008600",

        }
    },
    typography: {
        fontFamily: "WenKai TC, Open Sans, sans-serif",
    }
    
});



export default function ThemeProvider(props: IThemeProps) {

    return <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        {props.children}
    </MuiThemeProvider>
}