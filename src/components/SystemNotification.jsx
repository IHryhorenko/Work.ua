export default function SystemNotification({
  message,
  type,
  onClose,
}) {
  return (
    <div className={`system-notification ${type}`}>
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Закрити повідомлення"
      >
        ×
      </button>
    </div>
  );
}