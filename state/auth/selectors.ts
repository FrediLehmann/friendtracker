export const loggedInSelector = (state: any) => {
  return state?.matches("authenticated");
};