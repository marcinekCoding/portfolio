"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "telefon" | "usluga" | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Dozwolone: cyfry, +, spacje, myślniki, nawiasy
const PHONE_ALLOWED_REGEX = /^[+()\d\s-]+$/;

function validateField(name: FieldName, rawValue: string): string | undefined {
  const value = rawValue.trim();

  switch (name) {
    case "name":
      if (!value) return "Podaj swoje imię.";
      if (value.length < 2) return "Imię jest za krótkie.";
      return undefined;
    case "email":
      if (!value) return "Podaj adres e-mail.";
      if (!EMAIL_REGEX.test(value)) return "Podaj poprawny adres e-mail.";
      return undefined;
    case "telefon": {
      if (!value) return "Podaj numer telefonu.";
      const digits = value.replace(/\D/g, "");
      if (!PHONE_ALLOWED_REGEX.test(value) || digits.length < 9) {
        return "Podaj poprawny numer telefonu.";
      }
      return undefined;
    }
    case "usluga":
      if (!value) return "Wybierz rodzaj usługi.";
      return undefined;
    case "message":
      if (!value) return "Napisz wiadomość.";
      if (value.length < 10) return "Wiadomość jest za krótka.";
      return undefined;
    default:
      return undefined;
  }
}

const FIELD_ORDER: FieldName[] = [
  "name",
  "email",
  "telefon",
  "usluga",
  "message",
];

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validateForm(formData: FormData): FieldErrors {
    const errors: FieldErrors = {};
    for (const field of FIELD_ORDER) {
      const value = (formData.get(field) as string | null) ?? "";
      const error = validateField(field, value);
      if (error) errors[field] = error;
    }
    return errors;
  }

  function focusFirstInvalid(errors: FieldErrors) {
    const first = FIELD_ORDER.find((field) => errors[field]);
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(
      `[name="${first}"]`,
    );
    el?.focus();
  }

  function handleFieldValidate(name: FieldName, value: string) {
    // Waliduj na blur/change dopiero po pierwszej próbie wysłania
    if (!submitted) return;
    setFieldErrors((prev) => {
      const next = { ...prev };
      const error = validateField(name, value);
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_honey")) {
      return;
    }

    setSubmitted(true);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      setErrorMessage("");
      focusFirstInvalid(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            telefon: formData.get("telefon"),
            usluga: formData.get("usluga"),
            message: formData.get("message"),
            _subject: "Nowa wiadomość z portfolio — kontakt",
            _captcha: "false",
          }),
        },
      );

      const data = (await response.json()) as { success?: string };

      if (response.ok && data.success) {
        setStatus("success");
        form.reset();
        setSubmitted(false);
        setFieldErrors({});
        return;
      }

      setStatus("error");
      setErrorMessage(
        "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.",
      );
    } catch {
      setStatus("error");
      setErrorMessage(
        "Błąd połączenia. Sprawdź internet i spróbuj ponownie.",
      );
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form"
      aria-label="Formularz kontaktowy"
      noValidate
    >
      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">
          Imię
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className={`form-input${fieldErrors.name ? " is-invalid" : ""}`}
          autoComplete="name"
          required
          disabled={status === "submitting"}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          onBlur={(e) => handleFieldValidate("name", e.target.value)}
          onChange={(e) => handleFieldValidate("name", e.target.value)}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="form-error" role="alert">
            <AlertCircle size={14} strokeWidth={1.5} aria-hidden="true" />
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className={`form-input${fieldErrors.email ? " is-invalid" : ""}`}
          autoComplete="email"
          required
          disabled={status === "submitting"}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={
            fieldErrors.email ? "contact-email-error" : undefined
          }
          onBlur={(e) => handleFieldValidate("email", e.target.value)}
          onChange={(e) => handleFieldValidate("email", e.target.value)}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="form-error" role="alert">
            <AlertCircle size={14} strokeWidth={1.5} aria-hidden="true" />
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-phone" className="form-label">
          Numer telefonu
        </label>
        <input
          id="contact-phone"
          name="telefon"
          type="tel"
          className={`form-input${fieldErrors.telefon ? " is-invalid" : ""}`}
          autoComplete="tel"
          inputMode="tel"
          placeholder="np. +48 600 000 000"
          required
          disabled={status === "submitting"}
          aria-invalid={fieldErrors.telefon ? true : undefined}
          aria-describedby={
            fieldErrors.telefon ? "contact-phone-error" : undefined
          }
          onBlur={(e) => handleFieldValidate("telefon", e.target.value)}
          onChange={(e) => handleFieldValidate("telefon", e.target.value)}
        />
        {fieldErrors.telefon && (
          <p id="contact-phone-error" className="form-error" role="alert">
            <AlertCircle size={14} strokeWidth={1.5} aria-hidden="true" />
            {fieldErrors.telefon}
          </p>
        )}
      </div>

      <fieldset
        className="form-group form-fieldset"
        disabled={status === "submitting"}
        aria-invalid={fieldErrors.usluga ? true : undefined}
        aria-describedby={
          fieldErrors.usluga ? "contact-usluga-error" : undefined
        }
      >
        <legend className="form-label">Rodzaj usługi</legend>
        <div className="form-radio-group">
          <label className="form-radio">
            <input
              type="radio"
              name="usluga"
              value="Montaż wideo"
              defaultChecked
              onChange={(e) => handleFieldValidate("usluga", e.target.value)}
            />
            <span className="form-radio-label">Montaż wideo</span>
          </label>
          <label className="form-radio">
            <input
              type="radio"
              name="usluga"
              value="Projekt programistyczny"
              onChange={(e) => handleFieldValidate("usluga", e.target.value)}
            />
            <span className="form-radio-label">Projekt programistyczny</span>
          </label>
        </div>
        {fieldErrors.usluga && (
          <p id="contact-usluga-error" className="form-error" role="alert">
            <AlertCircle size={14} strokeWidth={1.5} aria-hidden="true" />
            {fieldErrors.usluga}
          </p>
        )}
      </fieldset>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Wiadomość
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={`form-textarea${fieldErrors.message ? " is-invalid" : ""}`}
          rows={5}
          required
          disabled={status === "submitting"}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          onBlur={(e) => handleFieldValidate("message", e.target.value)}
          onChange={(e) => handleFieldValidate("message", e.target.value)}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="form-error" role="alert">
            <AlertCircle size={14} strokeWidth={1.5} aria-hidden="true" />
            {fieldErrors.message}
          </p>
        )}
      </div>

      <label htmlFor="contact-honey" className="sr-only">
        Nie wypełniaj tego pola
      </label>
      <input
        id="contact-honey"
        name="_honey"
        type="text"
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "success" && (
        <p className="form-feedback form-feedback--success" role="status">
          <CheckCircle2 size={16} strokeWidth={1.5} aria-hidden="true" />
          Dziękujemy! Wiadomość została wysłana — odezwę się wkrótce.
        </p>
      )}

      {status === "error" && (
        <p className="form-feedback form-feedback--error" role="alert">
          <AlertCircle size={16} strokeWidth={1.5} aria-hidden="true" />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn-pill self-start"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2
              size={16}
              strokeWidth={1.5}
              className="animate-spin"
              aria-hidden="true"
            />
            Wysyłanie…
          </>
        ) : (
          <>
            <Send size={16} strokeWidth={1.5} aria-hidden="true" />
            Wyślij wiadomość
          </>
        )}
      </button>
    </form>
  );
}
