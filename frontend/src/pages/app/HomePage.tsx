import React from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { getProductById } from '../../constants/products';
import { ProductCard } from '../../components/products/ProductCard';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { ActiveProject } from '../../components/dashboard/ActiveProject';
import { useAuth } from '../../hooks/useAuth';
import { ProfileDAL, ProfileData } from '../../utils/dal/profile';
import { useState, useEffect } from 'react';

export const HomePage: React.FC = () => {
  const userData = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileDAL.fetchUserProfile(userData.currentUser?.uid || '');
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userData.currentUser?.uid]);

  return (
    <AppLayout>
      <div className="space-y-8 max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Active Projects"
            value="5"
            change="+2 this month"
            trend="up"
          />
          <StatsCard
            title="Success Rate"
            value="78%"
            change="+8% from last month"
            trend="up"
          />
          <StatsCard
            title="Total Grants"
            value="$2.5M"
            change="$500K this quarter"
            trend="up"
          />
        </div>

        {/* Active Project */}
        <ActiveProject
          title="Community Development Grant"
          progress={60}
        />

        {/* Products Section */}
        <section>
          <h2 className="text-2xl font-bold text-purple-900">Available Tools</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            Object.entries(profileData?.profile.access?.products || {}).map(([key, product_data]) => {
              const product = getProductById(key);
              return (!product || !product_data.is_active) ? null : <ProductCard key={key} product={product} />;
            })
          )}
        </section>
      </div>
    </AppLayout>
  );
}; 