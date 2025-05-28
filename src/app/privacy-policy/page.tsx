
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground">
            <p>
              This is a placeholder for the Privacy Policy page of EletronicswithVK.
            </p>
            <p>
              In a real application, this page would detail how user data is collected, used, stored, and protected. It would cover aspects like:
            </p>
            <ul>
              <li>What personal information is collected (e.g., name, email, IP address).</li>
              <li>How this information is used (e.g., for account management, communication, analytics).</li>
              <li>Information sharing practices (e.g., with third-party services).</li>
              <li>Use of cookies and tracking technologies.</li>
              <li>Data security measures.</li>
              <li>User rights regarding their data (e.g., access, correction, deletion).</li>
              <li>Policy updates and contact information for privacy concerns.</li>
            </ul>
            <p>
              Please replace this placeholder content with your actual Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
