export const joinCssClasses = (...classes: (string | boolean)[]) =>
  classes.filter(Boolean).join(" ")
