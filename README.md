# Purrfect Paws

Four-page cat adoption website with HTML, CSS, JavaScript, favorites, search, cat profiles, and Supabase inquiry submission.

## Project files

- `index.html`
- `about.html`
- `breeds.html`
- `contact.html`
- `css/style.css`
- `js/script.js` — all website logic and Supabase configuration in one file
- `images/` — place cat photographs here using the filenames referenced in the HTML templates

## Run

Open the folder in VS Code and launch `index.html` using Live Server.

## Connect Supabase without writing SQL

1. Create a Supabase project.
2. In Table Editor, create a table named `adoption_inquiries`.
3. Add columns: `full_name` (text), `email` (text), `phone` (text), `cat_breed` (text), `specific_cat` (text, nullable), `home_address` (text), `comments` (text), `preferred_contact_method` (text), `privacy_consent` (boolean). Use the default generated ID column.
4. Enable Row Level Security. Add an INSERT policy for the `anon` role with check expression `privacy_consent = true`. Do not create public SELECT, UPDATE, or DELETE policies. Ensure the `anon` role has INSERT privilege.
5. Copy the Project URL and public publishable key from Supabase into the `PURRFECT_SUPABASE` object at the beginning of `js/script.js`. Never use a secret or service-role key in browser JavaScript.
6. Submit an inquiry and check the record in Supabase Table Editor.

Before collecting personal information publicly, configure abuse protection and a privacy/retention policy.

The HTML references local images under `images/`; add the original photo files with the exact names and extensions to display them.
