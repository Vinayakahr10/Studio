
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
            <p className="text-sm">Last Updated: {currentDate}</p>

            <p>
              Welcome to ElectronicswithVK! By using this website, you agree to the following terms:
            </p>

            <h4>1. Use of Website</h4>
            <p>
              This site is for informational and educational purposes related to electronics. You agree to use it lawfully and not misuse the content.
            </p>

            <h4>2. Intellectual Property</h4>
            <p>
              All tutorials, projects, images, and other materials on this site are owned by ElectronicswithVK, unless otherwise stated. You may not copy, reproduce, or distribute content without permission.
            </p>

            <h4>3. Accuracy of Information</h4>
            <p>
              We aim to provide accurate and up-to-date information, but we do not guarantee completeness or reliability. Use the content at your own risk.
            </p>

            <h4>4. Third-Party Links</h4>
            <p>
              Our website may contain links to third-party websites (such as GitHub or component suppliers). These links are provided for your convenience. We do not control or take responsibility for the content, accuracy, or privacy practices of these websites.
            </p>

            <h4>5. Limitation of Liability</h4>
            <p>
              ElectronicswithVK will not be liable for any losses, damages, or issues arising from the use of our site or its content.
            </p>

            <h4>6. Changes to Terms</h4>
            <p>
              We may update these terms at any time. Continued use of the site means you accept the updated terms.
            </p>
            
            <p>
                For any questions, contact us at electronicswithvk@gmail.com.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
