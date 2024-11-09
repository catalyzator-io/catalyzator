import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Upload } from "lucide-react";
import { ProfileDAL } from "../../utils/dal/profile";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { UserProfile } from "../../types/profile";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile;
  onSuccess?: () => void;
}

export function EditProfileDialog({ 
  open, 
  onOpenChange, 
  profile,
  onSuccess 
}: EditProfileDialogProps) {
  const { currentUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    description: profile.description || "",
    photoURL: profile.photoURL || ""
  });

  useEffect(() => {
    setFormData({
      full_name: profile.full_name || "",
      description: profile.description || "",
      photoURL: profile.photoURL || ""
    });
  }, [profile]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.uid) return;

    setIsUploading(true);
    try {
      const photoURL = await ProfileDAL.uploadProfilePhoto(currentUser.uid, file);
      setFormData(prev => ({ ...prev, photoURL }));
      toast.success('Profile picture updated');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.uid) return;

    setIsSaving(true);
    try {
      await ProfileDAL.updateProfile(currentUser.uid, formData);
      onSuccess?.();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6 bg-white">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={formData.photoURL} />
                <AvatarFallback>
                  {formData.full_name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('picture-upload')?.click()}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4" />
                {isUploading ? 'Uploading...' : 'Upload New Picture'}
              </Button>
              <Input
                id="picture-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">Name</Label>
            <Input
              id="name"
              value={formData.full_name}
              onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="h-10 bg-gray-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="resize-none bg-gray-50"
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-4"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="px-4 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}