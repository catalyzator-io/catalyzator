import { useState } from 'react';
import { Users, DollarSign, PlayCircle, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ProfileSection = ({ title, icon, children }: ProfileSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-purple-50 hover:bg-purple-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-lg font-semibold text-purple-900">{title}</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isExpanded && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  // This would come from your Firebase auth/data
  const mockData = {
    basicInfo: {
      fullName: "John Doe",
      nationalId: "123456789",
      companyName: "Tech Innovators",
      companyNameEn: "Tech Innovators Ltd",
      companyUrl: "https://techinnovators.com",
      foundingYear: "2022",
      address: "123 Innovation Street",
      phone: "+1234567890",
      email: "john@techinnovators.com"
    },
    founders: {
      founders: [
        {
          founderName: "John Doe",
          shareholding: 60,
          nationalId: "123456789",
          cv: "john_doe_cv.pdf",
          email: "john@techinnovators.com",
          phone: "+1234567890"
        },
        {
          founderName: "Jane Smith",
          shareholding: 40,
          nationalId: "987654321",
          cv: "jane_smith_cv.pdf",
          email: "jane@techinnovators.com",
          phone: "+9876543210"
        }
      ]
    },
    budget: {
      amount: 200000,
      desiredDate: "2023-12-31"
    },
    team: {
      teamMembers: [
        {
          memberName: "Alice Johnson",
          linkedin: "https://linkedin.com/in/alicejohnson"
        },
        {
          memberName: "Bob Williams",
          linkedin: "https://linkedin.com/in/bobwilliams"
        }
      ]
    },
    // ... other data would be populated from Firebase
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-purple-900 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">
                {mockData.basicInfo.fullName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{mockData.basicInfo.fullName}</h1>
              <p className="text-purple-200">{mockData.basicInfo.companyName}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-purple-100">
            <div>
              <p className="text-sm">Email</p>
              <p className="font-medium">{mockData.basicInfo.email}</p>
            </div>
            <div>
              <p className="text-sm">Phone</p>
              <p className="font-medium">{mockData.basicInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm">Founded</p>
              <p className="font-medium">{mockData.basicInfo.foundingYear}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ProfileSection title="Company Information" icon={<Building2 className="w-6 h-6 text-purple-900" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Company Name (EN)" value={mockData.basicInfo.companyNameEn} />
              <InfoItem label="Website" value={mockData.basicInfo.companyUrl} />
              <InfoItem label="Address" value={mockData.basicInfo.address} />
              <InfoItem label="National ID" value={mockData.basicInfo.nationalId} />
            </div>
          </ProfileSection>

          <ProfileSection title="Founders" icon={<Users className="w-6 h-6 text-purple-900" />}>
            {mockData.founders?.founders.map((founder, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="font-semibold">{founder.founderName}</h4>
                <p>Shareholding: {founder.shareholding}%</p>
                <p>Email: {founder.email}</p>
                <p>Phone: {founder.phone}</p>
              </div>
            ))}
          </ProfileSection>

          <ProfileSection title="Budget & Timeline" icon={<DollarSign className="w-6 h-6 text-purple-900" />}>
            {mockData.budget && (
              <>
                <p>Amount: ${mockData.budget.amount.toLocaleString()}</p>
                <p>Desired Date: {new Date(mockData.budget.desiredDate).toLocaleDateString()}</p>
              </>
            )}
          </ProfileSection>

          <ProfileSection title="Team Members" icon={<Users className="w-6 h-6 text-purple-900" />}>
            {mockData.team?.teamMembers.map((member, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <p>{member.memberName} - <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></p>
              </div>
            ))}
          </ProfileSection>

          <ProfileSection title="Pitch & Presentation" icon={<PlayCircle className="w-6 h-6 text-purple-900" />}>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Problem & Solution</h4>
                <p className="text-gray-600">Information about the problem and solution would be displayed here</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Market Analysis</h4>
                <p className="text-gray-600">TAM/SAM/SOM information would be displayed here</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Competitive Advantage</h4>
                <p className="text-gray-600">Information about competitive landscape would be displayed here</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Traction & Metrics</h4>
                <p className="text-gray-600">Current traction, LOIs, customers, and revenue information would be displayed here</p>
              </div>
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

export default Profile;

/*
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Users,
  Trophy,
  Briefcase,
  GraduationCap,
  Edit,
  Plus,
  Download
} from "lucide-react";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">Startup Founder & Tech Innovator</p>
              <div className="flex gap-4 mt-4">
                <Badge variant="outline" className="flex gap-1">
                  <Building2 className="w-3 h-3" /> TechVision Inc.
                </Badge>
                <Badge variant="outline" className="flex gap-1">
                  <MapPin className="w-3 h-3" /> San Francisco, CA
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CV
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500">
              View Applications
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 p-6 bg-white/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                {isEditing ? (
                  <Textarea
                    defaultValue="Passionate entrepreneur with 10+ years of experience in technology innovation. Founded TechVision Inc., focusing on sustainable tech solutions. Previously led R&D at major tech companies and contributed to multiple patents in AI and renewable energy."
                    className="min-h-[150px]"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    Passionate entrepreneur with 10+ years of experience in technology innovation. Founded TechVision Inc., focusing on sustainable tech solutions. Previously led R&D at major tech companies and contributed to multiple patents in AI and renewable energy.
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>john.doe@techvision.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>www.techvision.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>CEO & Founder</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Grant Success Rate</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[85%] bg-gradient-to-r from-purple-600 to-orange-500 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Applications</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">$2.5M</div>
                      <div className="text-sm text-muted-foreground">Funded</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="col-span-2 p-6 bg-white/50 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Experience</h2>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">CEO & Founder</h3>
                      <p className="text-sm text-muted-foreground">TechVision Inc. • 2018 - Present</p>
                      <p className="mt-2">Leading innovative sustainable technology solutions and managing a team of 50+ professionals.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">R&D Director</h3>
                      <p className="text-sm text-muted-foreground">Tech Giants Corp • 2014 - 2018</p>
                      <p className="mt-2">Led research initiatives in AI and renewable energy, resulting in 5 patents.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">PhD in Computer Science</h3>
                      <p className="text-sm text-muted-foreground">Stanford University • 2014</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">MSc in AI</h3>
                      <p className="text-sm text-muted-foreground">MIT • 2010</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="p-6 bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Applications</h2>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-white/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Tech Innovation Grant {i}</h3>
                        <p className="text-sm text-muted-foreground">Applied on March {i}, 2024</p>
                      </div>
                    </div>
                    <Badge variant={i === 1 ? "default" : i === 2 ? "secondary" : "outline"}>
                      {i === 1 ? "In Review" : i === 2 ? "Draft" : "Completed"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="p-6 bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 rounded-lg border bg-white/30">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>TM</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Team Member {i}</h3>
                        <p className="text-sm text-muted-foreground">Role Title</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="p-6 bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Documents</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-white/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Document {i}.pdf</h3>
                        <p className="text-sm text-muted-foreground">Uploaded on March {i}, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
*/