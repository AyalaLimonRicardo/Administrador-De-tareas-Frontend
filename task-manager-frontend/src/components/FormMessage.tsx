interface FormMessageProps {
  message: string | null;
  tone?: 'error' | 'info';
}

export function FormMessage({ message, tone = 'error' }: FormMessageProps) {
  if (!message) return null;
  return (
    <p className={`alert alert--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      {message}
    </p>
  );
}
