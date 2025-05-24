
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection';
import { TutorialCategoriesSection } from '@/components/sections/TutorialCategoriesSection';
import { BlogLayoutSection } from '@/components/sections/BlogLayoutSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProjectsSection />
      <TutorialCategoriesSection />
      <BlogLayoutSection />
    </div>
  );
}
