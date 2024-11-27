import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EditProfileDialog } from "./EditProfileDialog";
import { Building2, Edit, Lightbulb, Rocket } from "lucide-react";
import { UserProfile as UserProfileType, EntityType } from "../../utils/dal/profile_api";
import { useState } from "react";

interface UserProfileProps {
  profile: UserProfileType | null;
  entities: EntityType[];
  onEntityClick?: (entityId: string) => void;
}

export function UserProfile({ profile, entities, onEntityClick }: UserProfileProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEntityClick = (entityId: string) => {
    if (onEntityClick) {
      onEntityClick(entityId);
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm w-full">
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.photoURL || ""} />
            <AvatarFallback>
              {profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{profile.full_name}</h1>
            <p className="text-muted-foreground mt-1">
              {profile.description || "No description provided"}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {entities.map((entity) => (
                <Badge
                  key={entity.id}
                  variant="outline"
                  className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleEntityClick(entity.id)}
                >
                  {entity.type?.toLowerCase() === 'venture' ? (
                    <Rocket className="w-3.5 h-3.5" />
                  ) : entity.type?.toLowerCase() === 'catalyzator' ? (
                    <Lightbulb className="w-3.5 h-3.5" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5" />
                  )}
                  {entity.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        profile={profile}
      />
    </Card>
  );
}