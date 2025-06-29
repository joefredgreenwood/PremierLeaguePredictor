"use client";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import registerNewLeague, { validateLeagueName } from "./actions";
import { SubmitButton } from "@/components/SubmitButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Invitee = { id: string };

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

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function RegisterUserTanstack() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [invitees, setInvitees] = useState<Invitee[]>([{ id: generateId() }]);

  const session = useSession();
  const user = session.data?.user?.email;

  if (!user) {
    throw new Error("");
  }

  const tanForm = useForm({
    defaultValues: {
      leagueName: "",
      peopleToInvite: [""],
    },

    onSubmit: async ({ value }) => {
      toast("Adding user", {
        description: "A user is currently being added",
      });

      try {
        await registerNewLeague(value, user);
      } catch (error) {
        setErrorMessage(
          error !== null &&
            typeof error === "object" &&
            "message" in error &&
            typeof error.message === "string"
            ? error?.message
            : "Registration failed. Please try again."
        );
        return;
      }

      toast("League has been created, click here to view your leagues", {
        description: "User has been added",
        action: {
          label: "My Leagues",
          onClick: () => console.log("Redirect to my leagues page"),
        },
      });

      tanForm.reset();
      setInvitees([{ id: generateId() }]); // Reset invitees

      redirect("/leagues");
    },
  });

  const { Field, Subscribe } = tanForm;

  return (
    <div>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tanForm.handleSubmit();
        }}
        className="vertical-form"
      >
        <div>
          <Field
            name="leagueName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "League Name must be provided"
                  : value.length < 3
                  ? "League Name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                return await validateLeagueName(value);
              },
            }}
          >
            {(field) =>
              generateStringInput({ field, displayText: "League Name" })
            }
          </Field>
        </div>
        <label>People to Invite:</label>
        <div>
          {invitees.map((invitee, index) => (
            <div key={invitee.id} className="flex gap-2 mb-2">
              <Field name={`peopleToInvite[${index}]`}>
                {(field) => (
                  <input
                    className="border p-1 rounded"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </Field>

              <button
                type="button"
                onClick={() => {
                  setInvitees((prev) =>
                    prev.filter((p) => p.id !== invitee.id)
                  );
                  tanForm.setFieldValue("peopleToInvite", (prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
                className="text-red-500"
                disabled={invitees.length <= 1}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setInvitees((prev) => [...prev, { id: generateId() }]);
              tanForm.setFieldValue("peopleToInvite", (prev) => [...prev, ""]);
            }}
            className="text-blue-600 mt-2 mb-4"
          >
            + Add Person
          </button>
        </div>

        <Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <div className="flex gap-4 mt-4">
              <SubmitButton canSubmit={canSubmit} isSubmitting={isSubmitting} />

              <button
                type="button"
                onClick={() => {
                  tanForm.reset();
                  setErrorMessage("");
                }}
                className={`
                px-4 py-2 rounded-lg
                bg-gray-200 text-gray-800 font-medium
                hover:bg-gray-300 hover:shadow-sm
                cursor-pointer
                transition duration-150 ease-in-out
              `}
              >
                Reset
              </button>
            </div>
          )}
        </Subscribe>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}
