
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Rss, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Join the EletronicswithVK Community
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Connect with fellow electronics enthusiasts, share your projects, ask questions, and learn together!
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Community of learners"
          data-ai-hint="community collaboration learning"
          width={1200}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12 md:mb-16">
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Forums</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Discuss topics, ask questions, and share your knowledge with our active community members.
            </p>
            <Button asChild>
              <Link href="#">Visit Forums</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Join or create groups based on specific interests like Arduino, Raspberry Pi, or IoT.
            </p>
            <Button asChild>
              <Link href="#">Find Groups</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Rss className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Participate in online workshops, webinars, and Q&A sessions with experts.
            </p>
            <Button asChild>
              <Link href="#">Upcoming Events</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-8 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Get Involved!</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Whether you're a beginner or a seasoned pro, there's a place for you in the EletronicswithVK community.
        </p>
        <Button size="lg" className="transition-transform hover:scale-105">
          Sign Up & Join the Discussion
        </Button>
      </section>
    </div>
  );
}
