const Testimonials = () => {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Success Stories from Our Catalyzed Ventures
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Catalyzator.io transformed our grant application process. We secured funding in weeks instead of months!"
              author="Sarah Chen"
              role="Startup Founder"
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
            />
            <TestimonialCard
              quote="The AI-driven approach is revolutionary. It's like having a grant expert by your side 24/7."
              author="Michael Rodriguez"
              role="Non-profit Director"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
            />
            <TestimonialCard
              quote="We've tripled our success rate in grant applications since using Catalyzator.io."
              author="Emily Thompson"
              role="Research Lead"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
            />
          </div>
        </div>
      </div>
    );
  };
  
  const TestimonialCard = ({ quote, author, role, image }: { quote: string; author: string; role: string; image: string }) => (
    <div className="bg-white rounded-lg p-6 shadow-xl border border-purple-100">
      <div className="flex items-center mb-4">
        <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-bold text-purple-900">{author}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">&ldquo;{quote}&rdquo;</p>
    </div>
  );
  
  export default Testimonials;