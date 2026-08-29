from pathlib import Path
import fitz

source = Path("attached_assets/Cosmetics_and_Personal_Care_Case_studies_1787972667562.pdf")
output = Path(".agents/outputs/cosmetics-case-studies")
output.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
for page_number, page in enumerate(document, start=1):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pixmap.save(output / f"page-{page_number}.png")
    print(f"rendered page {page_number}: {page.rect.width:.0f}x{page.rect.height:.0f}")

print(f"pages: {document.page_count}")