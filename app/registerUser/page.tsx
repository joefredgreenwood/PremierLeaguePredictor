"use client";

import React, { FormEvent, useTransition } from "react";
import { useState } from "react";

import registerNewUser from "./action";
import { SubmitButton } from "@/components/SubmitButton";
import { toast } from "sonner";

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
    toast("Adding user", {
      description: "A user is currently being added",
    });
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await registerNewUser(formData);
        setErrorMessage("");
        toast("User has been added to the database", {
          description: "User has been added",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
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
