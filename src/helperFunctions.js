export const removePunctuation = (str) => {
  return (str.replace(/[^a-zA-Z0-9]/g,''));
}
