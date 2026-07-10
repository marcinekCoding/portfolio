"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_honey")) {
      return;
    }

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
          className="form-input"
          autoComplete="name"
          required
          disabled={status === "submitting"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="form-input"
          autoComplete="email"
          required
          disabled={status === "submitting"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Wiadomość
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          rows={5}
          required
          disabled={status === "submitting"}
        />
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
