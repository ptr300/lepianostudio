# Piano teacher website

This is a small static site intended for use on GitHub Pages. It provides a homepage, lessons/services page, works catalog, and contact page.

Local preview

1. Open a terminal in this folder:

```bash
cd "/Users/dankim291/Downloads/_GITHUB WEBSITE/piano-teacher-site"
```

2. Start a simple static server (Python 3):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Deploy to GitHub Pages

- Create a Git repository, commit files, and push to GitHub.
- In the repository settings, enable GitHub Pages from the `main` branch root (or use `gh-pages` branch). The site will be served as `https://<username>.github.io/<repo-name>/`.

Notes / next steps

- Replace `youremail@example.com`, phone, socials, and the placeholder profile image by placing files in the `content/` folder and updating `content/site.csv`.
- The site now reads dynamic content from the `content/` folder. Add or edit these files there:
	- `content/site.csv` — site name, bio, email, phone, socials, and `profile_image` filename.
	- `content/works.csv` — works catalog (`title,type,link`).
	- `content/rates.csv` — lesson rates (`duration,price`).
	- `content/profile.jpg` (or `.png`) — profile image referenced by `site.csv`.
- If you want a hosted contact form (no mailto), I can integrate Formspree or Netlify Forms.
