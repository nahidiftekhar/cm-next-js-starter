import Select from "react-select";
import { useEffect, useState } from "react";

export const CustomSelect = (props) => {
  const { options, value, onChange, isDisabled, ...restProps } = props;
  const [internalValue, setInternalValue] = useState(value);
  const [autoSelected, setAutoSelected] = useState(false);

  useEffect(() => {
    if (options?.length === 1 && !autoSelected) {
      const selectedOption = {
        ...options[0],
        isSelected: true,
        isDisabled: true,
      };
      setInternalValue(selectedOption);
      if (onChange) {
        onChange(selectedOption, {
          action: "select-option",
          option: selectedOption,
          name: restProps.name, // Include name if provided
        });
      }
      setAutoSelected(true);
    } else if (options?.length !== 1) {
      setInternalValue(value);
      setAutoSelected(false);
    }
  }, [options, value, onChange, restProps.name, autoSelected]);

  const shouldDisable = isDisabled || options?.length === 1;

  return (
    <>
      <Select
        classNames={{
          control: ({ isFocused }) =>
            shouldDisable
              ? "bg-gray-100 dark:bg-gray-900 pl-5 border border-gray-200 dark:border-gray-700 rounded-md cursor-not-allowed opacity-80"
              : `bg-white dark:bg-black pl-5 border-gray-300 dark:border-gray-700 rounded-md ${
                  isFocused
                    ? "ring-1 ring-blue-500 dark:ring-blue-600 border-blue-500 dark:border-blue-600"
                    : "border dark:border-slate-800 hover:border-gray-400 dark:hover:border-gray-600"
                }`,
          input: () =>
            shouldDisable
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-900 dark:text-white",
          menu: () =>
            "bg-white dark:bg-black border border-gray-300 dark:border-gray-700 mt-1 rounded-md",
          option: ({ isFocused, isSelected }) =>
            shouldDisable && options?.length === 1
              ? "pl-5 text-gray-500 dark:text-gray-400 cursor-not-allowed bg-gray-200 dark:bg-gray-800"
              : `pl-5 ${
                  isSelected
                    ? "bg-blue-500 dark:bg-blue-600 text-white"
                    : isFocused
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-white"
                }`,
          singleValue: () =>
            shouldDisable
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-900 dark:text-white",
          placeholder: () =>
            shouldDisable
              ? "text-gray-400 dark:text-gray-500"
              : "text-gray-400 dark:text-gray-500",
          dropdownIndicator: () =>
            shouldDisable
              ? "text-gray-100 dark:text-gray-900 px-2"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 px-2",
          clearIndicator: () =>
            shouldDisable
              ? "text-gray-300 dark:text-gray-600"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
          indicatorSeparator: () =>
            shouldDisable
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-gray-300 dark:bg-gray-600",
          multiValue: () =>
            shouldDisable
              ? "bg-gray-100 dark:bg-gray-800"
              : "bg-gray-200 dark:bg-gray-700",
          multiValueLabel: () =>
            shouldDisable
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-900 dark:text-white",
          multiValueRemove: () =>
            shouldDisable
              ? "text-gray-300 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-600"
              : "text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400",
        }}
        unstyled
        options={options}
        value={internalValue}
        onChange={onChange}
        isDisabled={shouldDisable}
        {...restProps}
      />

      <input
        type="hidden"
        name={restProps.name}
        value={internalValue?.value || ""}
      />
    </>
  );
};
