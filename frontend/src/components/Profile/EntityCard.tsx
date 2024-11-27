import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Building2,
  Globe,
  MessageSquare,
  AlertCircle,
  Rocket,
  Lightbulb
} from "lucide-react";
import { Entity } from "../../types/entity";

interface EntityCardProps {
  entity: Entity;
  isHighlighted?: boolean;
}

export function EntityCard({ entity, isHighlighted }: EntityCardProps) {
  console.log(entity, "entity")
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'draft':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getEntityIcon = (type: string = 'default') => {
    switch (type.toLowerCase()) {
      case 'venture':
        return <Rocket className="w-3 h-3 mr-1" />;
      case 'catalyzator':
        return <Lightbulb className="w-3 h-3 mr-1" />;
      default:
        return <Building2 className="w-3 h-3 mr-1" />;
    }
  };

  const applications = entity.products?.grants ? 
    Object.entries(entity.products.grants).map(([_, grant]) => ({
      ...grant
    })) : [];

  return (
    <Card
      id={entity.id}
      className={`p-6 backdrop-blur-sm transition-colors duration-500 ${
        isHighlighted 
          ? 'bg-purple-100/50' 
          : 'bg-white/50'
      }`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">
                {entity.name}
              </h3>
              <Badge variant="outline" className="flex items-center">
                {getEntityIcon(entity.type)}
                {entity.type || 'Entity'}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{entity.description || "No description available"}</p>
          </div>
          <div className="flex gap-2">
            {entity.basicInfo?.companyUrl && (
              <Button variant="outline" size="icon" asChild>
                <a href={entity.basicInfo.companyUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {applications.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Grant Applications</h4>
            <div className="space-y-2">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    app.hasUpdates ? 'bg-purple-50 border-purple-200' : 'bg-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {app.hasUpdates && (
                      <AlertCircle className="w-4 h-4 text-purple-600" />
                    )}
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`w-2 h-2 rounded-full ${getStatusColor(app.status)}`}
                        />
                        <span className="text-sm text-muted-foreground">
                          {formatStatus(app.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      window.location.href = `/pitch-to-grant`;
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {app.hasUpdates ? 'View Updates' : 'Continue Chat'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}