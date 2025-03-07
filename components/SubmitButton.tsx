interface SubmitButtonProps {
  canSubmit: boolean;
  isSubmitting: boolean;
}

export function SubmitButton({ canSubmit, isSubmitting }: SubmitButtonProps) {
  return (
    <button disabled={!canSubmit} type="submit">
      {isSubmitting ? "..." : "Submit"}
    </button>
  );
}
