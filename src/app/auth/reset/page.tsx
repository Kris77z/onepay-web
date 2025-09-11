"use client";

import Navbar from "@/components/sections/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md px-4 py-10 lg:px-6">
          <Image src="/images/onepay-light.png" alt="OnePay" width={32} height={32} />
          <h3 className="mt-6 text-lg font-semibold text-foreground">Reset your password</h3>

          <form action="#" method="post" className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <Input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-2" />
            </div>
            <Button type="submit" className="mt-4 w-full py-2 font-medium">Send reset link</Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Back to <Link href="/auth" className="font-medium text-primary hover:text-primary/90">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


