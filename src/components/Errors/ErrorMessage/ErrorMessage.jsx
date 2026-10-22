function ErrorMessage({ onClick }) {
  return (
    <>
      <p>Something went wrong. Please try again.</p>

      {/* Render retry button if onClick was provided */}
      {onClick && <button onClick={onClick}>Retry</button>}
    </>
  );
}

export default ErrorMessage;
