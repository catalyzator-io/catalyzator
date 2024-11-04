import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { SideBar } from "../components/SideBar";
import { UserProfile } from "../components/Profile/UserProfile";
import { EntityCard } from "../components/Profile/EntityCard";
import { Plus } from "lucide-react";
import NavBar from "../components/NavBar";
import { fetchUserProfile } from "../firebase/profile_api";
import { useAuth } from "../auth";
import { Entity } from "../types/entity";
import { PROTECTED_ROUTES } from "../data/constants";
import { UserProfile as UserProfileType } from "../firebase/profile_api";

export default function Profile() {
  const [profileData, setProfileData] = useState<{
    profile: UserProfileType | null;
    entities: Entity[];
  }>({
    profile: null,
    entities: []
  });
  const [highlightedEntityId, setHighlightedEntityId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadProfileData = async () => {
      if (!currentUser?.uid) return;
      
      try {
        const data = await fetchUserProfile(currentUser.uid);
        setProfileData(data);
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    loadProfileData();
  }, [currentUser?.uid]);

  const handleEntityClick = (entityId: string) => {
    setHighlightedEntityId(entityId);
    document.getElementById(entityId)?.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      setHighlightedEntityId(null);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <NavBar />
      <SideBar />
      <div className="flex-1 pt-24 pb-8 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
          <UserProfile 
            profile={profileData.profile}
            entities={profileData.entities}
            onEntityClick={handleEntityClick} 
          />
          
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Entities</h2>
            <Button 
              className="bg-purple-50 border-purple-200"
              onClick={() => window.location.href = PROTECTED_ROUTES[1]}
            >
              <Plus className="w-4 h-4 mr-2" />
              Onboard New Entity
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-6 pr-4">
              {profileData.entities.map((entity) => (
                <EntityCard 
                  key={entity.id} 
                  entity={entity} 
                  isHighlighted={highlightedEntityId === entity.id}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}