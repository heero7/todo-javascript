import React from "react";
import { 
    IoMdAdd,
    IoIosSave, 
    IoMdList, 
    IoMdLogIn } from "react-icons/io";

function Sidebar() {
    return (
        <div className="fixed top-0 h-screen w-16
                        flex flex-col
                        bg-gray-900 text-white shadow-lg">
            <SidebarIcon icon={<IoMdAdd size="20" />} tooltipText="Add a todo." />
            <SidebarIcon icon={<IoMdList size="20" />} tooltipText="View all todos."/>
            <SidebarIcon icon={<IoIosSave size="20" />} tooltipText="Save todos to file."/>
            <SidebarIcon icon={<IoMdLogIn size="20" />} tooltipText="Login"/>
        </div>
    );
};

// todo: practice using JSDocs?
function SidebarIcon(props) {
    const { icon, tooltipText } = props;
    return (
        <div className="sidebar-icon group">
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {tooltipText}
            </span>
        </div>
    );
};

export default Sidebar;