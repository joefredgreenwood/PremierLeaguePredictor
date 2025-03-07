"use client";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import registerNewUser, { validateUsername } from "./action";
import { SubmitButton } from "@/components/SubmitButton";

function AddValidationDataToField({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>
          <br />
          {field.state.meta.errors.join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating && !field.form.state.isSubmitting
        ? "Validating..."
        : null}
    </>
  );
}

function generateStringInput({
  field,
  displayText,
}: {
  field: AnyFieldApi;
  displayText: string;
}) {
  return (
    <>
      <label htmlFor={field.name}>{displayText}:</label>
      <br />
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={field.form.state.isSubmitting}
      />
      <AddValidationDataToField field={field} />
    </>
  );
}

export default function registerUserTanstack() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      height: "",
    },

    // When submitted, call through to a server side action
    onSubmit: async ({ value }) => {
      toast("Adding user", {
        description: "A user is currently being added",
      });

      try {
        await registerNewUser(value);
      } catch (error) {
        setErrorMessage(
          error !== null &&
            typeof error === "object" &&
            "message" in error &&
            typeof error.message === "string"
            ? error?.message
            : "Registration failed. Please try again."
        );
      }

      toast("User has been added to the database", {
        description: "User has been added",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      form.reset();
    },
  });

  return (
    <div>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="vertical-form"
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                // synchronous validation
                !value
                  ? "A first name is required"
                  : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              // async validation which only runs once the synchronous criteria has been met
              onChangeAsync: async ({ value }) => {
                // Wait for 1 second to see how form reacts
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return await validateUsername(value);
              },
            }}
            children={(field) => {
              return generateStringInput({ field, displayText: "First name" });
            }}
          />
        </div>
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                value.includes("@") ? undefined : "Please enter a valid email",
            }}
            children={(field) =>
              generateStringInput({ field, displayText: "Email" })
            }
          />
        </div>
        <div>
          <form.Field
            name="height"
            children={(field) =>
              generateStringInput({ field, displayText: "Height" })
            }
          />
        </div>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit, // Computed submission state
            isSubmitting: state.isSubmitting,
          })}
          children={({ canSubmit, isSubmitting }) => {
            console.log({ canSubmit, isSubmitting });
            return (
              <>
                <SubmitButton
                  canSubmit={canSubmit}
                  isSubmitting={isSubmitting}
                />
                <button type="reset" onClick={() => form.reset()}>
                  Reset
                </button>
              </>
            );
          }}
        />
        {errorMessage && errorMessage}
      </form>
    </div>
  );
}
