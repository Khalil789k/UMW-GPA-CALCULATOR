
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calculator, Gauge, Rocket, Scale, Github, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: "Semester GPA Calculator",
    description: "Easily calculate your semester GPA by entering your course marks and credit hours. Get instant, accurate results based on the UMW grading scale.",
  },
  {
    icon: <Gauge className="h-8 w-8 text-primary" />,
    title: "CGPA Calculator",
    description: "Track your overall academic progress by calculating your Cumulative GPA across multiple semesters. Plan ahead to meet your academic goals.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Real-Time Updates",
    description: "Your GPA is updated instantly as you input your data, providing immediate feedback with a dynamic visual chart.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">About UMW GPA Calculator</CardTitle>
          <CardDescription className="text-lg">
            Empowering University of Mianwali students to achieve academic excellence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="max-w-2xl mx-auto text-muted-foreground text-left">
            This GPA Calculator is a dedicated tool designed to help students at the University of Mianwali (UMW) easily calculate and track their Grade Point Average. Our goal is to provide a simple, intuitive, and accurate application that helps you stay on top of your academic performance.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="transition-all hover:shadow-md">
                <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>Everything you need to manage your grades.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center text-center p-4 rounded-lg border animate-fade-in transition-transform duration-300 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
                    >
                        {feature.icon}
                        <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
                </CardContent>
            </Card>
        </div>
        <Card className="transition-all hover:shadow-md">
            <CardHeader>
            <CardTitle>About the Developer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
                 <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://github.com/Khalil789k.png" alt="Khalil Ahmad" />
                    <AvatarFallback>KA</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Khalil Ahmad</h3>
                <p className="text-sm text-muted-foreground">Fullstack Web Developer</p>
                <p className="text-xs text-muted-foreground mt-1">University of Mianwali Student | 2022-26</p>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="icon" asChild>
                        <a href="https://github.com/Khalil789k/" target="_blank" aria-label="GitHub">
                            <Github className="h-4 w-4" />
                        </a>
                    </Button>
                     <Button variant="outline" size="icon" asChild>
                        <a href="mailto:Khalil_Ahmad001@hotmail.com" aria-label="Email">
                            <Mail className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>


      <div className="grid md:grid-cols-2 gap-8">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to provide every UMW student with a free, reliable, and easy-to-use tool to demystify the GPA calculation process. We believe that by providing clear insights into your academic standing, you can make better decisions, set achievable goals, and reduce stress.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                This application is built using Next.js, React, and Tailwind CSS to ensure a fast, responsive, and excellent user experience on any device. All calculations are performed securely in your browser, and no personal data is ever stored.
            </p>
          </CardContent>
        </Card>
      </div>

       <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="flex items-start gap-4">
            <Scale className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <p className="text-muted-foreground">
            This is an unofficial tool and is not affiliated with the University of Mianwali. While we strive for accuracy, always confirm your official GPA with the university administration.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
