import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Please add a message").max(1000),
});

export function InquiryForm({ label = "Send Inquiry" }: { label?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success("Thank you — we'll be in touch shortly.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-7">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" maxLength={100} placeholder="Your full name" />
        {errors['name'] && <p className="text-xs text-destructive">{errors['name']}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" maxLength={255} placeholder="you@company.com" />
        {errors['email'] && <p className="text-xs text-destructive">{errors['email']}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} maxLength={1000} placeholder="Tell us what you have in mind" />
        {errors['message'] && <p className="text-xs text-destructive">{errors['message']}</p>}
      </div>
      <button
        type="submit"
        className="w-full rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
      >
        {label}
      </button>
    </form>
  );
}