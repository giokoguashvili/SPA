export function inputValueChanged(inputValue) {
  return { action: arguments.callee.name, payload: inputValue };
}
export function addButtonClicked() {
  return { action: arguments.callee.name };
}
