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
import { SubmitButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ContactForm({
  className,
  layout = "default",
}: {
  className?: string;
  layout?: "default" | "wide";
}) {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setFeedback(null);
    const result = await submitContactForm(data);

    if ("success" in result && result.success) {
      setFeedback({ type: "success", message: result.message });
      reset();
      return;
    }

    if ("error" in result) {
      if (result.fields) {
        for (const [field, messages] of Object.entries(result.fields)) {
          if (messages?.[0]) {
            setError(field as keyof ContactFormData, { message: messages[0] });
          }
        }
      }

      setFeedback({
        type: "error",
        message: result.error ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)} noValidate>
      {layout === "wide" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" error={errors.name?.message} required>
            <input {...register("name")} className={inputClass} autoComplete="name" />
          </Field>
          <Field label="Your email" error={errors.email?.message} required>
            <input type="email" {...register("email")} className={inputClass} autoComplete="email" />
          </Field>
        </div>
      ) : (
        <>
          <Field label="Your name" error={errors.name?.message} required>
            <input {...register("name")} className={inputClass} autoComplete="name" />
          </Field>
          <Field label="Your email" error={errors.email?.message} required>
            <input type="email" {...register("email")} className={inputClass} autoComplete="email" />
          </Field>
        </>
      )}
      <Field label="Subject" error={errors.subject?.message} required>
        <input {...register("subject")} className={inputClass} />
      </Field>
      <Field label="Your message" error={errors.message?.message} required>
        <textarea rows={5} {...register("message")} className={inputClass} />
      </Field>
      <SubmitButton disabled={isSubmitting} className={layout === "wide" ? "!w-auto" : undefined}>
        {isSubmitting ? "Sending..." : "Send message"}
      </SubmitButton>
      {feedback && <FeedbackBanner type={feedback.type} message={feedback.message} />}
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
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productSlug,
      subject: productTitle ? `Enquiry: ${productTitle}` : "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setFeedback(null);
    const result = await submitEnquiryForm(data);

    if ("success" in result && result.success) {
      setFeedback({ type: "success", message: result.message });
      reset({ productSlug, subject: productTitle ? `Enquiry: ${productTitle}` : "" });
      return;
    }

    if ("error" in result) {
      if (result.fields) {
        for (const [field, messages] of Object.entries(result.fields)) {
          if (messages?.[0]) {
            setError(field as keyof EnquiryFormData, { message: messages[0] });
          }
        }
      }

      setFeedback({
        type: "error",
        message: result.error ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)} noValidate>
      <input type="hidden" {...register("productSlug")} />
      <Field label="Name" error={errors.name?.message} required>
        <input {...register("name")} className={inputClass} autoComplete="name" />
      </Field>
      <Field label="Email" error={errors.email?.message} required>
        <input type="email" {...register("email")} className={inputClass} autoComplete="email" />
      </Field>
      <Field label="Phone No" error={errors.phone?.message} required>
        <input type="tel" {...register("phone")} className={inputClass} autoComplete="tel" />
      </Field>
      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} className={inputClass} readOnly={!!productTitle} />
      </Field>
      <Field label="Enquiry" error={errors.enquiry?.message} required>
        <textarea rows={5} {...register("enquiry")} className={inputClass} placeholder="Tell us about quantities, destination, and timeline..." />
      </Field>
      <SubmitButton disabled={isSubmitting} className="!w-auto">
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </SubmitButton>
      {feedback && <FeedbackBanner type={feedback.type} message={feedback.message} />}
    </form>
  );
}

function FeedbackBanner({ type, message }: { type: "success" | "error"; message: string }) {
  const isSuccess = type === "success";
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm leading-relaxed",
        isSuccess
          ? "border-brand-green/30 bg-brand-green/5 text-brand-green-dark"
          : "border-red-200 bg-red-50 text-red-700",
      )}
    >
      {message}
    </div>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-brand-green"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

const inputClass = "input-field placeholder:text-slate-400";
