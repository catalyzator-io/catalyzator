import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown, LogOut, Settings, FileText, ChevronRight, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, signOutUser } from "../../auth";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";

interface GrantApplication {
  id: number;
  name: string;
  status: "draft" | "in_progress" | "completed" | "rejected" | "approved";
  entityId: string;
  providerId: string;
  lastMessage: {
    content: string;
    timestamp: string;
    isAssistant: boolean;
  };
}

const grantApplications: GrantApplication[] = [
  {
    id: 1,
    name: "Tech Innovation Grant",
    status: "in_progress",
    entityId: "entity1",
    providerId: "provider1",
    lastMessage: {
      content: "I've reviewed your project overview. Shall we move on to the team background?",
      timestamp: "2 hours ago",
      isAssistant: true
    }
  },
  // ... other applications
];

const applicationSteps = [
  { id: 1, name: "Project Overview", status: "completed" },
  { id: 2, name: "Team Background", status: "in-progress" },
  { id: 3, name: "Budget Breakdown", status: "pending" },
  { id: 4, name: "Impact Assessment", status: "pending" },
  { id: 5, name: "Final Review", status: "pending" },
];

const getStatusColor = (status: GrantApplication['status']) => {
  switch (status) {
    case 'draft':
      return 'bg-gray-300';
    case 'in_progress':
      return 'bg-yellow-500';
    case 'completed':
      return 'bg-green-500';
    case 'rejected':
      return 'bg-red-500';
    case 'approved':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
};

const formatStatus = (status: GrantApplication['status']) => {
  return status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1);
};

export function SideBar() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(true);
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser?.photoURL || "https://github.com/shadcn.png"} />
              <AvatarFallback>{currentUser?.displayName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{currentUser?.displayName || "User"}</h3>
              <p className="text-sm text-muted-foreground">Startup Founder</p>
            </div>
          </div>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/terms-of-service">
                  <FileText className="mr-2 h-4 w-4" />
                  Terms of Service
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/privacy-policy">
                  <FileText className="mr-2 h-4 w-4" />
                  Privacy Policy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/customer-agreement">
                  <FileText className="mr-2 h-4 w-4" />
                  Customer Agreement
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-4">
          <div className="space-y-2">
            {grantApplications.map((app) => (
              <div key={app.id} className="border rounded-lg hover:bg-gray-50">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3"
                >
                  <div className="w-full">
                    <div className="font-medium truncate">{app.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(app.status)}`} />
                      <span className="truncate">
                        {formatStatus(app.status)} • {app.lastMessage.content}
                      </span>
                    </div>
                  </div>
                </Button>

                {app.id === 1 && (
                  <Collapsible
                    open={isTrackerOpen}
                    onOpenChange={setIsTrackerOpen}
                    className="p-2 mx-2 mb-2 border rounded-md bg-white"
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between">
                        Application Status Outline
                        <ChevronRight
                          className={`h-4 w-4 transition-transform flex-shrink-0 ${
                            isTrackerOpen ? "rotate-90" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {applicationSteps.map((step) => (
                        <div
                          key={step.id}
                          className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              step.status === "completed"
                                ? "bg-green-500"
                                : step.status === "in-progress"
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={
                              step.status === "completed" ? "line-through text-muted-foreground" : ""
                            }
                          >
                            {step.name}
                          </span>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600">
                <Compass className="mr-2 h-4 w-4" />
                Explore New Grants
              </Button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-purple-600 text-white p-2 rounded shadow-lg border"
              sideOffset={5}
            >
              <p>Coming soon! Explore grants in our Navigator app</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}