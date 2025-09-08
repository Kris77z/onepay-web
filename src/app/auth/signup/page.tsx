"use client";

import Navbar from "@/components/sections/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md px-4 py-10 lg:px-6">
          <div className="flex items-center space-x-2">
            <Image src="/images/onepay.png" alt="OnePay" width={120} height={32} />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-foreground">Create your account</h3>

          <form action="#" method="post" className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <Input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
              <Input type="password" id="password" name="password" placeholder="********" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="confirm" className="text-sm font-medium text-foreground">Confirm password</Label>
              <Input type="password" id="confirm" name="confirm" placeholder="********" className="mt-2" />
            </div>
            <Button type="submit" className="mt-4 w-full py-2 font-medium">Sign up</Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account? <Link href="/auth" className="font-medium text-primary hover:text-primary/90">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

