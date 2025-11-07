
"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateGrade } from "@/lib/utils";
import GpaChart from "@/components/gpa-chart";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const courseSchema = z.object({
  name: z.string().optional(),
  creditHours: z.coerce.number().min(1, "Credit hours must be between 1 and 4.").max(4, "Credit hours must be between 1 and 4."),
  currentMarks: z.coerce.number().min(0, "Marks must be between 0 and 100.").max(100, "Marks must be between 0 and 100."),
});

const gpaFormSchema = z.object({
  courses: z.array(courseSchema),
});

type GpaFormValues = z.infer<typeof gpaFormSchema>;

const initialCourses = [
    { name: '', creditHours: '' as any, currentMarks: '' as any },
    { name: '', creditHours: '' as any, currentMarks: '' as any },
    { name: '', creditHours: '' as any, currentMarks: '' as any },
];

const placeholders = [
    { name: 'Intro to Programming', creditHours: '3', currentMarks: '88' },
    { name: 'Calculus I', creditHours: '4', currentMarks: '92' },
    { name: 'Data Mining', creditHours: '3', currentMarks: '78' },
    { name: 'Linear Algebra', creditHours: '4', currentMarks: '95' },
    { name: 'English Literature', creditHours: '3', currentMarks: '82' },
]

export default function GpaCalculatorPage() {
  const [gpa, setGpa] = useState(0);
  const { toast } = useToast();
  
  const form = useForm<GpaFormValues>({
    resolver: zodResolver(gpaFormSchema),
    defaultValues: {
      courses: initialCourses,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  });

  const calculateAndSetGpa = (courses: any[]) => {
    let totalCreditHours = 0;
    let totalGradePoints = 0;

    courses.forEach(course => {
      const creditHours = parseFloat(course.creditHours as any);
      const marks = parseFloat(course.currentMarks as any);

      if (!isNaN(creditHours) && creditHours > 0 && !isNaN(marks) && marks >= 0 && marks <= 100) {
        const grade = calculateGrade(marks);
        totalCreditHours += creditHours;
        totalGradePoints += creditHours * grade;
      }
    });

    if (totalCreditHours > 0) {
      setGpa(totalGradePoints / totalCreditHours);
    } else {
      setGpa(0);
    }
  }

  // This effect handles updates when typing in fields
  useEffect(() => {
    const subscription = form.watch((values) => {
      calculateAndSetGpa(values.courses || []);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // This effect handles updates when fields are added or removed
  useEffect(() => {
    calculateAndSetGpa(form.getValues().courses);
  }, [fields]);
  
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, field: any, min: number, max: number, errorMsg: string) => {
    const value = e.target.value;
    if (value === '') {
        field.onChange('');
        return;
    }

    const numericValue = Number(value);
    if (!isNaN(numericValue) && value.match(/^\d*\.?\d*$/)) {
      if (numericValue >= min && numericValue <= max) {
          field.onChange(value);
      } else {
          toast({
              title: "Invalid Input",
              description: errorMsg,
              variant: "destructive",
              duration: 2000,
          });
      }
    } else if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
        toast({
            title: "Invalid Input",
            description: "Only numbers are allowed.",
            variant: "destructive",
            duration: 2000,
        });
    }
  };

  const handleCourseNameInput = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
        field.onChange(e);
    } else {
        toast({
            title: "Invalid Input",
            description: "Course name can only contain letters and spaces.",
            variant: "destructive",
            duration: 2000,
        });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in">
        <div className="lg:col-span-3">
            <Card className="transition-all hover:shadow-md">
                <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>Add, remove, and edit your course details here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-2 px-2 pb-2 font-semibold text-muted-foreground text-sm">
                        <div className="col-span-5">Course Name</div>
                        <div className="col-span-3">Credit Hours</div>
                        <div className="col-span-3">Marks</div>
                    </div>
                    <Form {...form}>
                      <form className="space-y-4">
                        {fields.map((field, index) => (
                            <div 
                                key={field.id} 
                                className="grid grid-cols-12 gap-2 items-start animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                            >
                                <FormField
                                    control={form.control}
                                    name={`courses.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-5">
                                            <FormControl>
                                                <Input 
                                                    placeholder={placeholders[index % placeholders.length].name} 
                                                    {...field}
                                                    aria-label="Course Name"
                                                    onChange={(e) => handleCourseNameInput(e, field)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`courses.${index}.creditHours`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <Input 
                                                    type="text" 
                                                    placeholder={placeholders[index % placeholders.length].creditHours} 
                                                    {...field}
                                                    aria-label="Credit Hours"
                                                    onChange={(e) => handleNumericInput(e, field, 1, 4, "Credit hours must be between 1 and 4.")}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`courses.${index}.currentMarks`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <Input 
                                                    type="text"
                                                    placeholder={placeholders[index % placeholders.length].currentMarks}
                                                    {...field}
                                                    aria-label="Marks"
                                                    onChange={(e) => handleNumericInput(e, field, 0, 100, "Marks must be between 0 and 100.")}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button variant="ghost" size="icon" onClick={() => remove(index)} className="col-span-1 text-muted-foreground hover:text-destructive" aria-label="Remove Course">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                      </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => append({ name: '', creditHours: '' as any, currentMarks: '' as any })}>
                        <Plus className="mr-2 h-4 w-4" /> Add Course
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <GpaChart gpa={gpa} />
        </div>
    </div>
  );
}
