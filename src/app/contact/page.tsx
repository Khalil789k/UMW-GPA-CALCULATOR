import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Have questions, feedback, or need support? We'd love to hear from you.
            </p>
            <p>
              You can reach out to our team via email at <a href="mailto:support@umw-gpa.com" className="text-primary hover:underline">support@umw-gpa.com</a>. We do our best to respond to all inquiries within 24-48 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
