import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { UserProfile } from '../../components/profile/UserProfile';
import { EntityCard } from '../../components/profile/EntityCard';
import { EditProfileDialog } from '../../components/profile/EditProfileDialog';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Plus } from 'lucide-react';
import { ProfileDAL, ProfileData } from '../../utils/dal/profile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [highlightedEntityId, setHighlightedEntityId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const loadProfileData = async () => {
    if (!currentUser?.uid) return;
    
    try {
      setIsLoading(true);
      const data = await ProfileDAL.fetchUserProfile(currentUser.uid);
      setProfileData(data);
    } catch (error) {
      console.error("Error loading profile data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [currentUser?.uid]);

  const handleEntityClick = (entityId: string) => {
    setHighlightedEntityId(entityId);
    document.getElementById(entityId)?.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      setHighlightedEntityId(null);
    }, 2000);
  };

  const handleProfileUpdate = async () => {
    setIsEditDialogOpen(false);
    await loadProfileData(); // Reload profile data after update
    toast.success('Profile updated successfully');
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto space-y-8 pt-4 px-4">
        <div className="flex justify-center items-start w-full">
          <UserProfile 
            profile={profileData?.profile || null}
            entities={profileData?.entities || []}
            onEntityClick={handleEntityClick}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-900">Your Entities</h2>
          <Button 
            className="bg-purple-50 border-purple-200 hover:bg-purple-100"
            // FIXME: fix this as this foes not exist yet
            onClick={() => navigate('/entity-onboarding')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Onboard New Entity
          </Button>
        </div>

        <ScrollArea className="h-full">
          <div className="space-y-6">
            {profileData?.entities.map((entity) => (
              <EntityCard 
                key={entity.id} 
                entity={entity} 
                isHighlighted={highlightedEntityId === entity.id}
              />
            ))}
            {profileData?.entities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No entities found. Create your first entity to get started!
              </div>
            )}
          </div>
        </ScrollArea>

        {profileData?.profile && (
          <EditProfileDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            profile={profileData.profile}
            onSuccess={handleProfileUpdate}
          />
        )}
      </div>
    </AppLayout>
  );
}; 