import { useState } from 'react';
import { Users, DollarSign, Shield, PlayCircle, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

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

          <ProfileSection title="IP & Legal" icon={<Shield className="w-6 h-6 text-purple-900" />}>
            {/* IP Rights information would be populated from Firebase data */}
            <p className="text-gray-500 italic">No IP rights information available</p>
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