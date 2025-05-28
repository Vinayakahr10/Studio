
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground">
            <p>
              This is a placeholder for the Terms of Service page of EletronicswithVK.
            </p>
            <p>
              In a real application, this page would outline the rules and regulations for the use of your website and services. It would typically include:
            </p>
            <ul>
              <li>Acceptance of terms.</li>
              <li>User responsibilities and conduct.</li>
              <li>Intellectual property rights.</li>
              <li>Disclaimers and limitations of liability.</li>
              <li>Termination of service.</li>
              <li>Governing law.</li>
              <li>Dispute resolution.</li>
              <li>Changes to the terms.</li>
              <li>Contact information.</li>
            </ul>
            <p>
              Please replace this placeholder content with your actual Terms of Service.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
