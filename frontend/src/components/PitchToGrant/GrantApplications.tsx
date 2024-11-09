import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useAuth } from "../../hooks/useAuth";
import { fetchUserProfile } from "../../firebase/profile_api";

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

export function GrantApplications() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(true);
  const [grantApplications, setGrantApplications] = useState<GrantApplication[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadGrantApplications = async () => {
      if (!currentUser?.uid) return;
      
      try {
        const data = await fetchUserProfile(currentUser.uid);
        
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
        console.error("Error loading grant applications:", error);
      }
    };

    loadGrantApplications();
  }, [currentUser?.uid]);

  return (
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
  );
} 