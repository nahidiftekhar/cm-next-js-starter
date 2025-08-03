export function updateStateArray({ index, key, newValue, setItems, items }) {
  const updatedItems = [...items];
  updatedItems[index][key] = newValue;
  setItems(updatedItems);
}
