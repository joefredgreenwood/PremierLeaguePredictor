interface SubmitButtonProps {
  canSubmit: boolean;
  isSubmitting: boolean;
}

export function SubmitButton({ canSubmit, isSubmitting }: SubmitButtonProps) {
  return (
    <button
      disabled={!canSubmit}
      type="submit"
      className="px-4 py-2 rounded-lg
                bg-blue-600 text-white font-semibold
                hover:bg-blue-700 hover:shadow-md
                disabled:bg-gray-400 disabled:text-gray-100 disabled:cursor-not-allowed
                cursor-pointer
                transition duration-150 ease-in-out text-center"
    >
      {isSubmitting ? "..." : "Submit"}
    </button>
  );
}
