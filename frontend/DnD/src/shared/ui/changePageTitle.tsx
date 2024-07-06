import { Outlet } from "react-router-dom";

interface ChangePageTitleProps {
    title: string
}

export default function ChangePageTitle({title}: ChangePageTitleProps) {
    document.title = title;

    return <Outlet/>
}