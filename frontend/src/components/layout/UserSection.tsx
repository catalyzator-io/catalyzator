import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { EditProfileDialog } from "../profile/EditProfileDialog";
import { fetchUserProfile } from "../../firebase/profile_api";
import { signOutUser } from "../../utils/firebase/auth";
import { useState, useEffect } from "react";
import type { UserProfile as UserProfileType } from "../../types/profile";

export function UserSection() {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const loadProfile = async () => {
    if (!currentUser?.uid) return;
    try {
      const data = await fetchUserProfile(currentUser.uid);
      setProfileData(data.profile);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  useEffect(() => {
    loadProfile();
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
    <>
      <div className="p-4 border-b bg-pale-pink rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser?.photoURL || ""} />
              <AvatarFallback>{currentUser?.displayName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-cool-purple">{currentUser?.displayName || "User"}</h3>
              <span
                onClick={() => setIsProfileDialogOpen(true)}
                className="text-sm text-purple-600 hover:text-purple-800 cursor-pointer inline-block hover:bg-purple-50 rounded px-1 -ml-1 transition-colors"
              >
                {profileData?.description || "Click to add description"}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsProfileDialogOpen(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {profileData && (
        <EditProfileDialog
          open={isProfileDialogOpen}
          onOpenChange={setIsProfileDialogOpen}
          profile={profileData}
          onSuccess={() => {
            loadProfile();
            setIsProfileDialogOpen(false);
          }}
        />
      )}
    </>
  );
} 