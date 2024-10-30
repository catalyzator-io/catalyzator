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
import { ChevronDown, LogOut, Settings, FileText, ChevronRight } from "lucide-react";

// FIXME: This is a temporary mock data for the chats.
const chats = [
  { id: 1, name: "Tech Innovation Grant", status: "In Progress", lastMessage: "2 hours ago" },
  { id: 2, name: "Sustainability Fund", status: "Draft", lastMessage: "Yesterday" },
  { id: 3, name: "Research Grant 2024", status: "Completed", lastMessage: "2 days ago" },
];

// FIXME: This is a temporary mock data for the application steps.
const applicationSteps = [
  { id: 1, name: "Project Overview", status: "completed" },
  { id: 2, name: "Team Background", status: "in-progress" },
  { id: 3, name: "Budget Breakdown", status: "pending" },
  { id: 4, name: "Impact Assessment", status: "pending" },
  { id: 5, name: "Final Review", status: "pending" },
];

// FIXME: The sidebar component without the correct reference logic, application tracking etc.
// TODO: Add the correct reference logic
// TODO: Fetch the correct tracking and information from the firebase.
export function SideBar() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(true);

  return (
    <div className="w-80 border-r bg-white/50 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* FIXME: This is a temporary avatar for the user. */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Startup Founder</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Terms of Service
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Privacy Policy
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
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
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start text-left h-auto py-3"
              >
                <div>
                  <div className="font-medium">{chat.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        chat.status === "In Progress"
                          ? "bg-green-500"
                          : chat.status === "Draft"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    {chat.status} • {chat.lastMessage}
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <Collapsible
            open={isTrackerOpen}
            onOpenChange={setIsTrackerOpen}
            className="border rounded-lg p-2"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                Application Progress
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isTrackerOpen ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {applicationSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-white/50"
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
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500">
          New Application
        </Button>
      </div>
    </div>
  );
}