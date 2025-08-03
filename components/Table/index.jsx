"use client";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import DataTable, { createTheme } from "react-data-table-component";
import { downloadCSV, Export } from "@/services/table-export";

const Table = ({
  data,
  columns,
  searchPlaceholder,
  exportFileArray,
  exportFileName,
  handleFilter,
  tableTitle,
  paginationSize,
  sortFieldId,
  pointerOnHover,
  isExportEnabled,
  zIndex,
  showSubHeader,
}) => {
  const { theme, setTheme } = useTheme();

  const paginationComponentOptions = {
    selectAllRowsItem: true,
  };

  const subHeaderComponent = () => {
    return (
      <div className="flex justify-start items-center w-screen mb-5 mx-[-16px]">
        <form className="custom-form md:w-1/2 mx-1">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => handleFilter(e)}
          />
        </form>
      </div>
    );
  };

  const actionsMemo = useMemo(
    () => (
      <Export onExport={() => downloadCSV(exportFileArray, exportFileName)} />
    ),
    [exportFileArray, exportFileName]
  );

  createTheme(
    "solarized",
    {
      text: {
        primary: "#cde8fa",
        secondary: "#2aa198",
      },
      background: {
        default: "#1A222C",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      button: {
        default: "#2aa198",
        hover: "rgba(0,0,0,.08)",
        focus: "rgba(255,255,255,.12)",
        disabled: "rgba(255, 255, 255, .34)",
      },
      sortFocus: {
        default: "#2aa198",
      },
      highlightOnHover: {
        default: "#2b2b2b",
        text: "rgba(255, 255, 255, .80)",
      },
      striped: {
        default: "rgba(0, 0, 0, 0.87)",
        text: "#FAFAFA",
      },
    },
    "dark"
  );

  return (
    <DataTable
      title={tableTitle}
      columns={columns}
      data={data}
      actions={isExportEnabled ? actionsMemo : null}
      pagination
      paginationPerPage={paginationSize || 20}
      paginationRowsPerPageOptions={[20, 50, 100, 200]}
      paginationComponentOptions={paginationComponentOptions}
      persistTableHead={true}
      defaultSortFieldId={sortFieldId || 1}
      subHeader={showSubHeader === false ? false : handleFilter ? true : false}
      subHeaderComponent={subHeaderComponent()}
      responsive
      striped
      highlightOnHover
      pointerOnHover={pointerOnHover}
      dense
      className={zIndex ? zIndex : "z-1"}
      theme={theme === "dark" ? "solarized" : "light"}
    />
  );
};

export default Table;
