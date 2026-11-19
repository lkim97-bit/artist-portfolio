# Lauren Kim — personal artist archive, Version 15

Version 15 retains the exploratory, asymmetrical artist portfolio from Versions 13–14 and adds **Elsewhere**, a place for publications, talks, press, conferences, research activity, workshops, exhibitions, and other notes. These live separately from the artwork-led homepage, without becoming a CV.

## Preview — no technical setup

Unzip the archive, open the `artist-portfolio-v15` folder, and double-click `index.html`. Use the menu to visit **Index**, **Elsewhere**, and **About**. The sample projects and your original photographs are included. Elsewhere is intentionally empty until you enter real activities.

## Adding something

Create just one archive entry with:
- Title (required)
- **Show in:** Work / projects **or** Elsewhere / activities (required)
- One image (optional, except recommended for visually featured works)
- One- or two-sentence description
- Tags (optional)
- Public toggle (use false for drafts)

For Elsewhere, optionally select **Activity type** (Publication, Talk, Press, Conference, Research, Exhibition, Workshop, Residency, Other). You can also provide year/date, link, collaborator/organizer, and photographs. For major works, optional sections and gallery captions create a longer page. All entries can be revised later.

Entries have a flexible numeric `order` for arranging projects. Lower numbers appear first. The earliest two **pictured** works are used in the homepage's irregular image composition. This means you can change its visuals by editing order and covers, without designing the homepage from scratch.

### Local editing before publishing

Entries are stored in `entries/*.json`. Settings are in `data/settings.json`. After editing a file, run `python3 build.py` inside the folder to refresh `index.html`, which embeds the latest contents for offline double-click preview. **This command is not required for a normal content edit once the CMS and publishing workflow are set up.**

## Connect the visual editor (one-time)

Pages CMS is configured in `.pages.yml` but **is not yet connected to your GitHub account**. To activate it:

1. Sign into GitHub (or create an account) and create a new repository, for example `artist-archive`. Public is the simplest option for free GitHub Pages hosting.
2. Upload all the contents *inside* `artist-portfolio-v15/` to the repository **root**, including the hidden `.pages.yml` and `.github/` folder. GitHub's web upload may omit hidden files depending on how you select files; check that these are visible in the repository afterwards.
3. In your repository, open **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/(root)`, then save. Wait for GitHub Pages to provide a public URL.
4. Visit https://app.pagescms.org, sign in with GitHub, authorize the Pages CMS GitHub App for your repository, and open it.
5. Open **Archive entries** to add a project or activity, edit text, upload images, manage captions, add tags, or mark an entry public/unpublished. Open **Your introduction and bio** to edit About and links.

The included `.github/workflows/build-index.yml` rebuilds `index.html` when entries or site settings change, and commits the regenerated file for GitHub Pages. It needs your repository's GitHub Actions to be enabled and its workflow token permitted to write repository contents (Repository Settings → Actions → General → Workflow permissions → Read and write permissions). If your GitHub Pages settings use a custom Actions deployment instead of branch publishing, the deployment configuration must be adjusted accordingly.

**Important:** Before CMS is connected, editing in Pages CMS will not work. The offline preview alone is not a publishing editor. The site currently has no authenticated editing interface.

## Send work to ChatGPT, too

You can also give me a title, photos, short description, tags, and optionally a link. I'll help draft or revise it for the archive. Projects like *Inner Landscapes* can stay as long-form photo essays; Cloud6 works can have short descriptions here and link outward when the Cloud6 site is available.

## Current project records

Real project drafts: Inner Landscapes, Driftwood Archway, Pegmatite Salesman, Hajo zine, Hajo pop-ups, Gateway Arch, Concretazoans, Alligator Meets Ostrich, Out of Scale. Several descriptions remain preliminary and some projects have no photographs yet. No invented Elsewhere activities have been published.
