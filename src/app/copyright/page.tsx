
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copyright as CopyrightIcon } from "lucide-react";

export default function CopyrightPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <CopyrightIcon className="h-8 w-8" />
            </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Copyright & Legal Information</CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto">
            Please read the following terms carefully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Ownership of Content</h3>
                <p className="text-muted-foreground">
                © {new Date().getFullYear()} UMW GPA Calculator. All Rights Reserved. The content, design, source code, and functionality of this application are the exclusive property of the developer and are protected by international copyright laws.
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">No Affiliation</h3>
                <p className="text-muted-foreground">
                This application is an independent project and is not officially affiliated with, endorsed, or sponsored by the University of Mianwali (UMW) in any way. Any references to the University of Mianwali are for descriptive purposes only.
                </p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg">Use of Application</h3>
                <p className="text-muted-foreground">
                This tool is provided free of charge for personal, non-commercial use by students. You may not modify, distribute, or reverse-engineer this application without prior written consent from the developer.
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Trademarks</h3>
                <p className="text-muted-foreground">
                All trademarks, service marks, and trade names mentioned in this application are the property of their respective owners.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
