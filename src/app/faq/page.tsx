
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function FaqPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about the UMW GPA Calculator.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">Is this an official University of Mianwali tool?</AccordionTrigger>
              <AccordionContent>
                No, this is an unofficial tool developed independently to help students at the University of Mianwali. While it is designed to be accurate based on the UMW grading policy, you should always confirm your official GPA with the university's academic administration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">How is the Semester GPA calculated?</AccordionTrigger>
              <AccordionContent>
                The Semester GPA is calculated by converting your percentage marks for each course into the corresponding Grade Point on the 4.0 scale. Each grade point is then multiplied by the course's credit hours to determine the quality points. The total quality points are divided by the total credit hours for the semester to get your GPA.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">How does the CGPA Calculator work?</AccordionTrigger>
              <AccordionContent>
                The CGPA Calculator averages the GPAs from all your previous semesters. You simply need to enter the final GPA you achieved in each semester, and the tool will calculate your cumulative average. This is useful for tracking your overall academic progress.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Is my data private and secure?</AccordionTrigger>
              <AccordionContent>
                Yes, your privacy is a top priority. The application does not save, store, or transmit any of your personal data. All calculations are performed directly in your browser. Once you close the browser tab, all the entered information is permanently gone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">What if my course is Pass/Fail?</AccordionTrigger>
              <AccordionContent>
                This calculator is designed for courses with percentage-based grading that maps to the standard 4.0 GPA scale. Pass/Fail courses typically do not factor into your GPA calculation, so they should not be included when you are calculating your GPA.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">How can I change the app's appearance?</AccordionTrigger>
              <AccordionContent>
                You can customize the app's theme using the controls in the bottom-left of the sidebar. Click the paintbrush icon to cycle through different accent colors, and use the sun/moon icon to toggle between light and dark modes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
