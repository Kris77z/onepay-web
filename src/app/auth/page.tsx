"use client";

import Navbar from "@/components/sections/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md px-4 py-10 lg:px-6">
          <div className="flex items-center space-x-2">
            <Image src="/images/onepay.png" alt="OnePay" width={120} height={32} />
          </div>

          <h3 className="mt-6 text-lg font-semibold text-foreground">Sign in to your account</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/90">Sign up</Link>
          </p>

          <div className="mt-8 flex flex-col items-stretch space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button variant="outline" className="flex-1 items-center justify-center space-x-2 py-2" asChild>
              <a href="#"><span className="text-sm font-medium">Login with GitHub</span></a>
            </Button>
            <Button variant="outline" className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0" asChild>
              <a href="#"><span className="text-sm font-medium">Login with Google</span></a>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form action="#" method="post" className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <Input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
              <Input type="password" id="password" name="password" placeholder="********" className="mt-2" />
            </div>
            <Button type="submit" className="mt-4 w-full py-2 font-medium">Sign in</Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Forgot your password? <Link href="/auth/reset" className="font-medium text-primary hover:text-primary/90">Reset password</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


