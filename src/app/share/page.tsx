
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, Twitter, Facebook, Linkedin, MessageCircle } from "lucide-react";

export default function SharePage() {
    const { toast } = useToast();
    const [pageUrl, setPageUrl] = useState('');
    const [displayUrl, setDisplayUrl] = useState('Loading...');

    useEffect(() => {
        // This runs only on the client, so window is available.
        const origin = window.location.origin;
        setPageUrl(origin);

        // Truncate for display
        const truncated = origin.length > 30 ? origin.substring(0, 30) + '...' : origin;
        setDisplayUrl(truncated);
    }, []);

    const shareText = "Check out this awesome GPA calculator for University of Mianwali students!";
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareOptions = [
        {
            name: "WhatsApp",
            icon: <MessageCircle className="h-5 w-5" />,
            url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
        },
        {
            name: "Twitter",
            icon: <Twitter className="h-5 w-5" />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        },
        {
            name: "Facebook",
            icon: <Facebook className="h-5 w-5" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-5 w-5" />,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
        },
    ];

    const copyLink = () => {
        if (pageUrl) {
            navigator.clipboard.writeText(pageUrl);
            toast({
                title: "Link Copied!",
                description: "You can now share the calculator with others.",
            });
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-4xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center mb-4">
                        <Share2 className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight">Share with Friends</CardTitle>
                    <CardDescription className="text-lg">
                        Help your classmates succeed by sharing this useful tool.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-center max-w-md mx-auto">
                        Found this GPA calculator helpful? Spread the word and help other University of Mianwali students stay on top of their grades!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
                        <div className="flex-1 p-2 border rounded-md bg-muted/50 text-sm text-center sm:text-left truncate">
                            {displayUrl}
                        </div>
                        <Button onClick={copyLink} disabled={!pageUrl}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Link
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        {shareOptions.map((option) => (
                            <Button
                                key={option.name}
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto"
                                asChild
                                disabled={!pageUrl}
                            >
                                <a href={option.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${option.name}`}>
                                    {option.icon}
                                    <span className="ml-2">{option.name}</span>
                                </a>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
