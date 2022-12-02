import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/dashboard/SideMenu";
export default function Dashboard(){
    return (
        <div>
            <SideMenu />
            <Outlet/>
        </div>
    )
}