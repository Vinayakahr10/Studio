
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Lightbulb, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">About ElectroLearn</h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Empowering electronics enthusiasts of all levels with quality knowledge and practical skills.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Team working on electronics"
          data-ai-hint="team electronics collaboration"
          width={1200}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12 md:mb-16">
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To make learning electronics accessible, engaging, and fun for everyone, from hobbyists to aspiring engineers. We strive to provide clear, concise, and practical tutorials and resources.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the leading online platform for electronics education, fostering a vibrant community of learners, creators, and innovators who are passionate about technology.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are a dedicated group of electronics engineers, educators, and tech enthusiasts committed to sharing our knowledge and passion for electronics with the world.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section className="text-center py-8 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Connect with fellow learners, share your projects, and get help from experts. Follow us on social media and subscribe to our newsletter!
        </p>
        {/* Placeholder for social media links or newsletter signup */}
      </section>
    </div>
  );
}
