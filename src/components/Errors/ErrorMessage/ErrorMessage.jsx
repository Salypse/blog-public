function ErrorMessage({ onClick }) {
  return (
    <div data-testId="error-message">
      <p>Something went wrong. Please try again.</p>

      {/* Render retry button if onClick was provided */}
      {onClick && <button onClick={onClick}>Retry</button>}
    </div>
  );
}

export default ErrorMessage;
