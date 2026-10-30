package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

/** Renders the deliberately small Markdown vocabulary used by CHANGELOG.md. */
final class ImprovementLedgerRenderer {

	private ImprovementLedgerRenderer() {
	}

	static String render(final String markdown) {
		final StringBuilder html = new StringBuilder();
		final StringBuilder paragraph = new StringBuilder();
		boolean sectionOpen = false;
		for (final String sourceLine : markdown.split("\\r?\\n")) {
			final String line = sourceLine.trim();
			if (line.length() == 0) {
				flushParagraph(html, paragraph);
			} else if (line.startsWith("## ")) {
				flushParagraph(html, paragraph);
				if (sectionOpen) {
					html.append("</section>\n");
				}
				html.append("<section class=\"ledger-entry\"><h2>");
				appendInline(html, line.substring(3));
				html.append("</h2>\n");
				sectionOpen = true;
			} else if (line.startsWith("# ")) {
				flushParagraph(html, paragraph);
				html.append("<h1>");
				appendInline(html, line.substring(2));
				html.append("</h1>\n");
			} else {
				if (paragraph.length() > 0) {
					paragraph.append(' ');
				}
				paragraph.append(line);
			}
		}
		flushParagraph(html, paragraph);
		if (sectionOpen) {
			html.append("</section>\n");
		}
		return html.toString();
	}

	private static void flushParagraph(final StringBuilder html, final StringBuilder paragraph) {
		if (paragraph.length() > 0) {
			html.append("<p>");
			appendInline(html, paragraph.toString());
			html.append("</p>\n");
			paragraph.setLength(0);
		}
	}

	private static void appendInline(final StringBuilder html, final String text) {
		for (int index = 0; index < text.length();) {
			if (text.charAt(index) == '`') {
				final int end = text.indexOf('`', index + 1);
				if (end > index + 1) {
					html.append("<code>");
					appendEscaped(html, text.substring(index + 1, end));
					html.append("</code>");
					index = end + 1;
					continue;
				}
			}
			if (text.startsWith("**", index)) {
				final int end = text.indexOf("**", index + 2);
				if (end > index + 2) {
					html.append("<strong>");
					appendInline(html, text.substring(index + 2, end));
					html.append("</strong>");
					index = end + 2;
					continue;
				}
			}
			appendEscaped(html, text.charAt(index++));
		}
	}

	private static void appendEscaped(final StringBuilder html, final String text) {
		for (int index = 0; index < text.length(); index++) {
			appendEscaped(html, text.charAt(index));
		}
	}

	private static void appendEscaped(final StringBuilder html, final char character) {
		switch (character) {
		case '&':
			html.append("&amp;");
			break;
		case '<':
			html.append("&lt;");
			break;
		case '>':
			html.append("&gt;");
			break;
		case '"':
			html.append("&quot;");
			break;
		case '\'':
			html.append("&#39;");
			break;
		default:
			html.append(character);
		}
	}
}
