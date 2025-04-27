"use client";

import { Toolbar } from "./toolbar";

interface WorkspaceIdlayoputProps {
    children: React.ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceIdlayoputProps) => {
    return (
        <div className="h-full">
            <Toolbar/>
            {children}
        </div>
    );
}

export default WorkspaceLayout;