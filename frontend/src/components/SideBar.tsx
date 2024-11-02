import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";
import { ChevronDown, LogOut, Settings, FileText, ChevronRight, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, signOutUser } from "../auth";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip";
import { EditProfileDialog } from "./Profile/EditProfileDialog";
import { fetchUserProfile, UserProfile as UserProfileType } from "../firebase/profile_api";

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
      return 'bg-gray-400';
    case 'in_progress':
      return 'bg-crazy-orange';
    case 'completed':
      return 'bg-cool-purple';
    case 'rejected':
      return 'bg-red-500';
    case 'approved':
      return 'bg-cool-purple';
    default:
      return 'bg-gray-400';
  }
};

const formatStatus = (status: GrantApplication['status']) => {
  return status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1);
};

export function SideBar() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(true);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [grantApplications, setGrantApplications] = useState<GrantApplication[]>([]);
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const loadProfileAndGrants = async () => {
      if (!currentUser?.uid) return;
      
      try {
        const data = await fetchUserProfile(currentUser.uid);
        setProfileData(data.profile);
        
        // Transform entities' grant applications into the format we need
        const applications: GrantApplication[] = [];
        data.entities.forEach(entity => {
          if (entity.products?.grants) {
            Object.entries(entity.products.grants).forEach(([_, grant]) => {
              applications.push({
                id: parseInt(grant.id),
                name: grant.name,
                status: grant.status as GrantApplication['status'],
                entityId: entity.id,
                providerId: grant.providerId || '',
                // FIXME: Add last message
                lastMessage: {
                  content: "No messages yet",
                  timestamp: new Date().toISOString(),
                  isAssistant: false
                }
              });
            });
          }
        });
        setGrantApplications(applications);
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    loadProfileAndGrants();
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-80 border-r bg-white shadow-sm flex flex-col pt-16">
      <div className="p-4 border-b bg-pale-pink rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser?.photoURL || "https://github.com/shadcn.png"} />
              <AvatarFallback>{currentUser?.displayName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-cool-purple">{currentUser?.displayName || "User"}</h3>
              <p className="text-sm text-purple-600">Startup Founder</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
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

      {profileData && (
        <EditProfileDialog
          open={isProfileDialogOpen}
          onOpenChange={setIsProfileDialogOpen}
          profile={profileData}
        />
      )}

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
              <Button className="w-full bg-pale-pink hover:bg-opacity-90 text-cool-purple">
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