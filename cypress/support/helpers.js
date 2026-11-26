export const cleanText = (text) => (text || "").replace(/\s+/g, " ").trim();

export const getPlatforms = ($row) => {
  const platformMap = { win: "Windows", mac: "macOS", linux: "Linux" };

  return Object.keys(platformMap)
    .filter((cssClass) => $row.find(`.platform_img.${cssClass}`).length > 0)
    .map((cssClass) => platformMap[cssClass]);
};

export const getReviewSummary = ($row) => {
  const tooltip = $row.find(".search_review_summary").attr("data-tooltip-html");
  if (!tooltip) {
    return "No user reviews";
  }
  return cleanText(tooltip.split("<br>")[0]);
};

export const getPrice = ($row) => {
  const price = cleanText($row.find(".discount_final_price").text());
  return price || "No price";
};