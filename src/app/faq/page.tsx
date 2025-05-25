
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: "what-is-site",
    question: "What is EletronicswithVK?",
    answer: "EletronicswithVK is an online platform dedicated to helping enthusiasts learn electronics through tutorials, projects, and articles covering topics like Arduino, Raspberry Pi, IoT, and more.",
  },
  {
    id: "who-is-it-for",
    question: "Who is EletronicswithVK for?",
    answer: "EletronicswithVK is for everyone, from absolute beginners curious about electronics to experienced makers and aspiring engineers looking to expand their knowledge and skills.",
  },
  {
    id: "how-to-start",
    question: "How can I get started?",
    answer: "The best way to start is by exploring our 'Tutorials' section for foundational knowledge, or dive into 'Projects' if you're looking for hands-on experience. Don't forget to check out our 'Blog' for the latest articles!",
  },
  {
    id: "are-resources-free",
    question: "Are the resources free?",
    answer: "Yes, all our current articles, tutorials, and project guides are free to access. We are committed to making electronics education accessible.",
  },
  {
    id: "how-to-contribute",
    question: "How can I contribute or get involved?",
    answer: "We're thrilled you're interested! You can join our 'Community' forums to share your projects, help others, or provide feedback. For content contributions, please reach out to us via the 'Contact' page.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Find answers to common questions about EletronicswithVK and our platform.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className="text-lg text-left hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pt-2 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
