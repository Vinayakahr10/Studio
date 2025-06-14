
import { Zap, BookOpen, UserCheck, Settings, Sigma, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface TopicCardData {
  id: string;
  title: string;
  description: string;
  href: string; // Placeholder for now
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  Icon?: LucideIcon; // Optional icon for topics
}

const dcCircuitTopics: TopicCardData[] = [
  { id: 'topic1', title: "1. DC Circuit Theory", description: "Introduction to direct current, circuit elements, and basic electrical principles.", href: "#", difficulty: "Beginner", Icon: BookOpen },
  { id: 'topic2', title: "2. Electrical Units", description: "Understanding voltage, current, resistance, and power units.", href: "#", difficulty: "Beginner", Icon: Settings },
  { id: 'topic3', title: "3. Ohm's Law & Power", description: "Fundamental V-I-R relationship and power calculations.", href: "#", difficulty: "Beginner", Icon: Sigma },
  { id: 'topic4', title: "4. Electrical Energy", description: "Concepts of energy, consumption, efficiency, and conversion.", href: "#", difficulty: "Beginner", Icon: FileText },
  { id: 'topic5', title: "5. Voltage Sources", description: "Ideal and real voltage sources, internal resistance, models.", href: "#", difficulty: "Beginner", Icon: Zap },
  { id: 'topic6', title: "6. Current Sources", description: "Ideal and real current sources, internal resistance, models.", href: "#", difficulty: "Beginner", Icon: Zap },
  { id: 'topic7', title: "7. Kirchhoff's Laws", description: "General introduction to Kirchhoff's fundamental circuit laws.", href: "#", difficulty: "Intermediate", Icon: UserCheck },
  { id: 'topic8', title: "8. KCL", description: "In-depth exploration of KCL, node analysis, and current conservation.", href: "#", difficulty: "Intermediate", Icon: UserCheck },
  { id: 'topic9', title: "9. KVL", description: "Detailed explanation of KVL, loop analysis, and voltage conservation.", href: "#", difficulty: "Intermediate", Icon: UserCheck },
  { id: 'topic10', title: "10. Voltage Divider", description: "Voltage division in series circuits and practical applications.", href: "#", difficulty: "Intermediate", Icon: Settings },
  { id: 'topic11', title: "11. Current Divider", description: "Current division in parallel circuits and practical applications.", href: "#", difficulty: "Intermediate", Icon: Settings },
  { id: 'topic12', title: "12. DC Series Circuit", description: "Analysis of series-connected components, equivalent R, voltage distribution.", href: "#", difficulty: "Intermediate", Icon: BookOpen },
  { id: 'topic13', title: "13. DC Parallel Circuit", description: "Analysis of parallel-connected components, equivalent R, current distribution.", href: "#", difficulty: "Intermediate", Icon: BookOpen },
  { id: 'topic14', title: "14. Combination Circuits", description: "Analysis techniques for circuits with series and parallel connections.", href: "#", difficulty: "Intermediate", Icon: BookOpen },
  { id: 'topic15', title: "15. Star-Delta Transform", description: "Convert between star (Y) and delta (Δ) to simplify analysis.", href: "#", difficulty: "Advanced", Icon: Settings },
  { id: 'topic16', title: "16. Mesh Current Analysis", description: "Systematic approach to solve circuits by analyzing mesh currents (KVL).", href: "#", difficulty: "Advanced", Icon: Sigma },
  { id: 'topic17', title: "17. Nodal Voltage Analysis", description: "Systematic approach to solve circuits by analyzing node voltages (KCL).", href: "#", difficulty: "Advanced", Icon: Sigma },
  { id: 'topic18', title: "18. Thevenin's Theorem", description: "Simplifying circuits into an equivalent voltage source and series R.", href: "#", difficulty: "Advanced", Icon: FileText },
  { id: 'topic19', title: "19. Norton's Theorem", description: "Simplifying circuits into an equivalent current source and parallel R.", href: "#", difficulty: "Advanced", Icon: FileText },
  { id: 'topic20', title: "20. Superposition", description: "Analyzing circuits with multiple sources by considering one at a time.", href: "#", difficulty: "Advanced", Icon: CheckCircle2 },
  { id: 'topic21', title: "21. Max Power Transfer", description: "Conditions for transferring maximum power from a source to a load.", href: "#", difficulty: "Advanced", Icon: Zap },
];

const learningPathSteps = [
  { number: 1, title: "Foundation", description: "Start with DC Circuit Theory, Electrical Units, and Ohm's Law to build a solid foundation." },
  { number: 2, title: "Sources and Laws", description: "Learn about Voltage Sources, Current Sources, and Kirchhoff's Laws." },
  { number: 3, title: "Circuit Configurations", description: "Study Series, Parallel, and Combination Circuits along with Voltage and Current Dividers." },
  { number: 4, title: "Analysis Techniques", description: "Master Mesh Current and Nodal Voltage Analysis techniques." },
  { number: 5, title: "Theorems & Transformations", description: "Apply Thevenin's, Norton's, and Superposition Theorems, along with Star-Delta Transformations." },
];

export default function DCCircuitsTutorialPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 selection:bg-primary/20">
      {/* Header Section */}
      <section className="text-center pt-10 pb-12 md:pt-16 md:pb-20 mb-12 rounded-xl bg-gradient-to-br from-primary/10 via-background to-background shadow-lg">
        <div className="inline-block bg-primary/10 p-3 md:p-4 rounded-full mb-4 md:mb-6">
          <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Master DC Circuit Theory
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          A comprehensive guide to understanding and analyzing DC circuits, from fundamentals to advanced techniques.
        </p>
      </section>

      {/* Main Content Wrapper */}
      <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
        {/* Introduction Section */}
        <section id="introduction">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-primary">Introduction to DC Circuits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg">
              <p>Welcome to the DC Circuit Theory tutorial! This comprehensive guide covers everything from basic electrical concepts to advanced circuit analysis techniques. Whether you're a student, hobbyist, or professional, you'll find detailed explanations, interactive examples, and practical problems to enhance your understanding.</p>
              <p>Direct Current (DC) circuits form the foundation of electrical engineering and are essential to understand before moving on to more complex topics. In these tutorials, we'll explore the fundamental laws, components, and analysis methods that govern DC circuit behavior.</p>
              <p>Each topic includes detailed explanations, circuit diagrams, example problems with step-by-step solutions, and interactive elements to help reinforce your learning.</p>
            </CardContent>
          </Card>
        </section>

        {/* Learning Path Section */}
        <section id="learning-path">
           <h2 className="text-3xl font-bold text-center mb-10 text-primary">Recommended Learning Path</h2>
           <div className="relative pl-6 md:pl-8">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary/20 rounded-full md:left-2.5"></div>
            
            {learningPathSteps.map((step, index) => (
              <div key={step.number} className="relative mb-8 md:mb-10 pl-8 md:pl-10 group">
                {/* Dot on the line */}
                <div className="absolute -left-3 top-1.5 md:-left-[1.05rem] h-7 w-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <Card className="shadow-md hover:shadow-lg transition-shadow bg-card group-hover:border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl text-primary/90">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Topics Section */}
        <section id="topics" className="pt-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">DC Circuit Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {dcCircuitTopics.map((topic) => (
              <Card key={topic.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-primary/30 transform hover:-translate-y-1">
                <CardHeader>
                  {topic.Icon && (
                    <div className="mb-3 w-10 h-10 bg-primary/10 p-2 rounded-full flex items-center justify-center">
                      <topic.Icon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{topic.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4">
                  <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                    <Link href={topic.href}>Learn More &rarr;</Link>
                  </Button>
                  <Badge 
                    variant={
                      topic.difficulty === 'Beginner' ? 'default' : 
                      topic.difficulty === 'Intermediate' ? 'secondary' : 
                      'destructive'
                    }
                    className={
                      topic.difficulty === 'Beginner' ? 'bg-green-500/80 hover:bg-green-600/80 text-white' :
                      topic.difficulty === 'Intermediate' ? 'bg-yellow-500/80 hover:bg-yellow-600/80 text-black' :
                      'bg-red-500/80 hover:bg-red-600/80 text-white' 
                    }
                  >
                    {topic.difficulty}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
