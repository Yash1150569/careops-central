'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = () => {
        // In a real app, you'd do a proper authentication flow.
        // For this demo, we'll simulate it as requested.
        if (typeof window !== 'undefined') {
            localStorage.setItem("token", "abc");
        }
        toast({ title: "Logged In", description: "You have been successfully logged in." });
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="admin@careops.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required defaultValue="password" />
                    </div>
                    <Button onClick={handleLogin} className="w-full">Sign in</Button>
                </CardContent>
            </Card>
        </div>
    );
}
