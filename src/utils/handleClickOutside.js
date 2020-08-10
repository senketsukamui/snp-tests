export const handleClickOutside = (ref, action) => event => {
  if (ref.current && !ref.current.contains(event.target)) {
    action();
  }
};
