
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GpaChart from '@/components/gpa-chart';
import { cn } from '@/lib/utils';

const semesterSchema = z.object({
  gpa: z.coerce.number().min(0, "GPA must be between 0 and 4.").max(4, "GPA must be between 0 and 4."),
});

const cgpaSchema = z.object({
  semesters: z.array(semesterSchema),
});

type CgpaFormValues = z.infer<typeof cgpaSchema>;

export default function CgpaCalculator() {
  const [cgpa, setCgpa] = useState(0);
  const { toast } = useToast();

  const form = useForm<CgpaFormValues>({
    resolver: zodResolver(cgpaSchema),
    defaultValues: {
      semesters: [{ gpa: '' as any }, { gpa: '' as any }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'semesters',
  });

  const calculateCgpa = (semesters: { gpa: number | string }[]) => {
    let totalGpa = 0;
    let semesterCount = 0;

    semesters.forEach(semester => {
      const gpa = parseFloat(semester.gpa as string);
      if (!isNaN(gpa) && gpa >= 0 && gpa <= 4) {
        totalGpa += gpa;
        semesterCount++;
      }
    });

    if (semesterCount > 0) {
      setCgpa(totalGpa / semesterCount);
    } else {
      setCgpa(0);
    }
  };

  useEffect(() => {
    const subscription = form.watch(values => {
      calculateCgpa(values.semesters || []);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  useEffect(() => {
    calculateCgpa(form.getValues().semesters);
  }, [fields]);


  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;
    if (value === '') {
      field.onChange('');
      return;
    }

    const numericValue = Number(value);
    if (!isNaN(numericValue) && value.match(/^\d*\.?\d*$/)) {
      if (numericValue >= 0 && numericValue <= 4) {
        field.onChange(value);
      } else {
        toast({
          title: 'Invalid Input',
          description: 'GPA must be between 0 and 4.',
          variant: 'destructive',
          duration: 2000,
        });
      }
    } else if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
      toast({
        title: 'Invalid Input',
        description: 'Only numbers are allowed.',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in">
      <div className="lg:col-span-3">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>CGPA Calculator</CardTitle>
            <CardDescription>Enter the GPA for each of your previous semesters.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-2 px-2 pb-2 font-semibold text-muted-foreground text-sm">
              <div className="col-span-11">Semester GPA</div>
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
                      name={`semesters.${index}.gpa`}
                      render={({ field }) => (
                        <FormItem className="col-span-11">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder={`Semester ${index + 1} GPA`}
                              {...field}
                              aria-label={`Semester ${index + 1} GPA`}
                              onChange={(e) => handleNumericInput(e, field)}
                            />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant="ghost" size="icon" onClick={() => remove(index)} className="col-span-1 text-muted-foreground hover:text-destructive" aria-label="Remove Semester">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button onClick={() => append({ gpa: '' as any })}>
              <Plus className="mr-2 h-4 w-4" /> Add Semester
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <GpaChart gpa={cgpa} title="CGPA Visualization" label="Current CGPA" />
      </div>
    </div>
  );
}
