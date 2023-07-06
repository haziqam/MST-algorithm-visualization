export const showMessage = (ref, severity, summary, message) => {
  ref.current.show({
    severity: severity,
    summary: summary,
    detail: message,
    life: 4000,
  });
};
