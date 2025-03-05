"use client";

import React, { FormEvent, useTransition } from "react";
import { useState } from "react";

import registerNewUser from "./action";
import { SubmitButton } from "@/components/SubmitButton";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  email: HTMLInputElement;
  height: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  elements: FormElements;
}

export default function UserRegistrationForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<FormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await registerNewUser(formData);
        setErrorMessage("");
        // Potentially rest the form if it has been successful
      } catch (error: unknown) {
        setErrorMessage(
          error !== null &&
            typeof error === "object" &&
            "message" in error &&
            typeof error.message === "string"
            ? error?.message
            : "Registration failed. Please try again."
        );
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="vertical-form">
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="height" placeholder="Height" />
        <SubmitButton isPending={isPending} />
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
