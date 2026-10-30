# ADR 0021: Publish the improvement ledger with the release

## Decision

Package the repository's `CHANGELOG.md` into the application artifact and
publish it at `/CHANGELOG.md`. Render the same packaged bytes into a readable
`/changelog` page during web server startup. The site's main navigation links
to that page. HTML is escaped before the ledger's small Markdown vocabulary
of headings, paragraphs, emphasis, and code is rendered.

The Docker build copies the root journal before Maven packages resources.
Each preview deployment therefore carries the ledger from the same Git
revision reported by the release custody desk. Both public routes revalidate
through ETags when the deployment changes.

## Consequences

The improvement journal remains one source of truth. A new iteration must add
its serious business entry to `CHANGELOG.md` before merging; its website page
then updates with the deployed artifact. The website shows repository change
history, while the audit journal continues to record individual numerical
output transactions.
