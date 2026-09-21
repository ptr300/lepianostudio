# Client content folder

Place your content files here so the site updates automatically without touching code.

Required files
- `site.csv` — key/value CSV that contains site-level fields (see example below).
- `works.csv` — CSV with columns: `title,type,link` (one row per work).
- `rates.csv` — CSV with columns: `duration,price` (e.g., `30,40`).
- `profile.*` — Profile picture file (accepted extensions: `.jpg`, `.jpeg`, `.png`, `.webp`). Recommended: `profile.jpg`.

Optional files
- Any other assets referenced in CSVs (PDFs, external links are fine).

CSV conventions
- `site.csv` should be a two-column CSV without a header or with headers `key,value`.
  Example rows:
  ```csv
  name,Alex Smith
  bio,"Alex is a pianist and teacher who offers in-home lessons for beginners and intermediate students."
  email,alex@example.com
  phone,+1234567890
  youtube,https://youtube.com/channel/xxxx
  instagram,https://instagram.com/xxxx
  facebook,https://facebook.com/xxxx
  profile_image,profile.jpg
  ```
- `works.csv` should have a header row `title,type,link`.
- `rates.csv` should have a header row `duration,price` with durations in minutes.

Notes
- Filenames in `profile_image` should reference files placed in this folder (e.g. `profile.jpg`).
- Keep values simple; avoid newlines in CSV fields (wrap long text in quotes if needed).
- After you upload files here, the site will pick them up automatically when the static files are reloaded in the browser.
