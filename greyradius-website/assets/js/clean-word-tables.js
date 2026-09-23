document.querySelectorAll(".article-body th, .article-body td").forEach((cell) => {
  const text = cell.textContent;
  const marker = text.lastIndexOf("<w:t>");

  if (marker !== -1) {
    cell.textContent = text.slice(marker + 5);
  }
});