export const handleClickOutside = (ref, action) => e => {
  if (ref.current && !ref.current.contains(event.target)) {
    action();
  }
};
