export const imageSearchSettings = {
  thresholds: [
    { value: "normal", label: "Default", threshold: 0.44 },
    { value: "strict", label: "Strict", threshold: 0.6 },
    { value: "tolerant", label: "Tolerant", threshold: 0.36 },
  ],
  defaultThreshold: "normal",
  searchImageDirectory: "image-search/directory-search/samples",
  targetImageDirectory: "image-search/directory-search/targets",
  boundingBoxColors: [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#e67e22",
    "#1abc9c",
    "#9b59b6",
    "#27ae60",
    "#f39c12",
    "#34495e",
    "#d35400",
  ],
};
