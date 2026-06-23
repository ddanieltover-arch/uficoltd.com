"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  enquirySchema,
  type ContactFormData,
  type EnquiryFormData,
} from "@/lib/validations/contact";
import { submitContactForm, submitEnquiryForm } from "@/actions/contact";
import { cn } from "@/lib/utils";

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    const result = await submitContactForm(data);
    if ("success" in result && result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <Field label="Your name" error={errors.name?.message}>
        <input {...register("name")} className={inputClass} />
      </Field>
      <Field label="Your email" error={errors.email?.message}>
        <input type="email" {...register("email")} className={inputClass} />
      </Field>
      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} className={inputClass} />
      </Field>
      <Field label="Your message" error={errors.message?.message}>
        <textarea rows={5} {...register("message")} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-brand-green py-3 font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
      {status === "success" && (
        <p className="text-center text-sm text-brand-green">Message sent successfully.</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export function EnquiryForm({
  productSlug,
  productTitle,
  className,
}: {
  productSlug?: string;
  productTitle?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productSlug,
      subject: productTitle ? `Enquiry: ${productTitle}` : "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("idle");
    const result = await submitEnquiryForm(data);
    if ("success" in result && result.success) {
      setStatus("success");
      reset({ productSlug, subject: productTitle ? `Enquiry: ${productTitle}` : "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <input type="hidden" {...register("productSlug")} />
      <Field label="Name *" error={errors.name?.message as string | undefined}>
        <input {...register("name")} className={inputClass} />
      </Field>
      <Field label="Email *" error={errors.email?.message as string | undefined}>
        <input type="email" {...register("email")} className={inputClass} />
      </Field>
      <Field label="Phone No *" error={errors.phone?.message as string | undefined}>
        <input {...register("phone")} className={inputClass} />
      </Field>
      <Field label="Subject" error={errors.subject?.message as string | undefined}>
        <input {...register("subject")} className={inputClass} />
      </Field>
      <Field label="Enquiry *" error={errors.enquiry?.message as string | undefined}>
        <textarea rows={5} {...register("enquiry")} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>
      {status === "success" && (
        <p className="text-sm text-brand-green">Enquiry sent. Our sales team will contact you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";
