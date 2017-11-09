import authReducer from "../../reducers/auth";

test("should set uid on logoin", () => {
  const action = {
    type: "LOGIN",
    uid: "myuid"
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe("myuid");
});

test("should set uid on logout", () => {
  const action = {
    type: "LOGOUT",
  };
  const state = authReducer({uid: "anything"}, action);
  expect(state).toEqual({});
});

