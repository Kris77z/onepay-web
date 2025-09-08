import { Contact2 } from "@/components/ui/contact-2";
import Navbar from "@/components/sections/navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <Contact2 
          title="Contact Us"
          description="We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!"
        />
      </div>
    </div>
  );
}
