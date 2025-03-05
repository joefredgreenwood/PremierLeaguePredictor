interface SubmitButtonProps {
  isPending: boolean;
}

export function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <button disabled={isPending} type="submit">
      {isPending ? "Submitting..." : "Submit"}
    </button>
  );
}
