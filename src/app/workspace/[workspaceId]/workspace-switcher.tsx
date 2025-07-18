import { Button } from "@/components/ui/button";
import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";

export const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspaceModal();

    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceID });
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

    const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceID);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                    {workspaceLoading ? (
                        <Loader className="size-5 animate-spin shrink-0"/>
                    ) : (
                        workspace?.name.charAt(0).toUpperCase()    
                    )
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
                    <DropdownMenuItem
                        onClick={() => router.push(`/workspace/${workspaceId}`)} 
                        className="cursor-pointer flex-col justify-start items-start capitalize">
                        {workspace?.name}
                        <span className="text-xs text-muted-foreground">
                            Active Workspace
                        </span>
                    </DropdownMenuItem>
                    {filteredWorkspaces?.map((workspace) => (
                        <DropdownMenuItem
                            key={workspace._id}
                            className="cursor-pointer capitalize"
                            onClick={() => router.push(`/workspace/$(workspace._id}`)}
                        >
                            
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};