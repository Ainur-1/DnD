import ReduxProvider from "./ReduxProvider";
import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import RouteProvider from "./RouteProvider";
import ThemeProvider from "./ThemeProvider";


export default function UseProviders({children}: ReactChildrenProps) {
    return ( 
    <ReduxProvider>
        <ThemeProvider>
            <RouteProvider>
                {children}
            </RouteProvider>
        </ThemeProvider>
    </ReduxProvider>
    )
}