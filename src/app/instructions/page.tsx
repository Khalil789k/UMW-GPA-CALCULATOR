
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks, Plus, Trash2, BarChart, Palette, SunMoon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const instructions = [
  {
    icon: <ListChecks className="h-8 w-8 text-primary" />,
    title: "1. Enter Your Course Details",
    description: "In the 'Your Courses' section on the homepage, you'll find rows to input your course information. For each course, fill in the 'Credit Hours' (a number from 1 to 4) and your percentage 'Marks' (from 0 to 100). The 'Course Name' is optional but helpful for keeping track.",
  },
  {
    icon: <Plus className="h-8 w-8 text-green-500" />,
    title: "2. Add More Courses",
    description: "If you have more courses than the initial rows provided, simply click the '+ Add Course' button at the bottom of the course list to add a new, empty row.",
  },
  {
    icon: <Trash2 className="h-8 w-8 text-destructive" />,
    title: "3. Remove a Course",
    description: "To remove a course you no longer need, click the trash can icon located at the end of the corresponding course row. The row will be instantly deleted.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "4. See Your GPA in Real-Time",
    description: "As you add or update your course details, the 'GPA Visualization' chart on the right side of the screen will automatically update to reflect your current Semester GPA. No need to click a 'calculate' button!",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "5. Calculate Your CGPA",
    description: "Navigate to the 'CGPA Calculator' page using the sidebar. There, you can enter the final GPA from each of your previous semesters to calculate your overall Cumulative GPA.",
  },
  {
    icon: <Palette className="h-8 w-8 text-orange-500" />,
    title: "6. Customize Your Theme",
    description: "Personalize your experience by using the icons in the bottom-left corner of the sidebar. Click the paintbrush icon to change the app's accent color, and click the sun/moon icon to switch between light and dark modes.",
  },
];


export default function InstructionsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">How to Use the Calculator</CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto">
            A step-by-step guide to calculating your GPA and CGPA.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructions.map((instruction, index) => (
          <Card 
            key={index} 
            className="animate-fade-in transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {instruction.icon}
              <CardTitle>{instruction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{instruction.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
