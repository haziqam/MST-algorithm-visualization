export const renderElement = (componentStateSetter) => {
  componentStateSetter(false);
  setTimeout(() => {
    componentStateSetter(true);
  }, 100);
};
