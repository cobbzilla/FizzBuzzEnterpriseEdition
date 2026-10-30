package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class ImprovementLedgerRendererTest {

	@Test
	public void headingsAndBusinessEmphasisBecomeReadableSections() {
		final String html = ImprovementLedgerRenderer.render(
				"# Journal\n\nOpening sentence continues\non another line.\n\n"
				+ "## 2026-10-30 — `slopbuzz-record`\n\n**Approved investment.** Details follow.\n");
		assertTrue(html.contains("<h1>Journal</h1>"));
		assertTrue(html.contains("<p>Opening sentence continues on another line.</p>"));
		assertTrue(html.contains("<section class=\"ledger-entry\"><h2>2026-10-30 — <code>slopbuzz-record</code></h2>"));
		assertTrue(html.contains("<strong>Approved investment.</strong> Details follow."));
		assertTrue(html.endsWith("</section>\n"));
	}

	@Test
	public void sourceTextCannotInjectMarkupIntoThePublishedLedger() {
		final String html = ImprovementLedgerRenderer.render(
				"# Ledger\n\n## <script>alert('board')</script>\n\n**Safe & sound** `<img src=x>`\n");
		assertFalse(html.contains("<script>"));
		assertFalse(html.contains("<img"));
		assertTrue(html.contains("&lt;script&gt;alert(&#39;board&#39;)&lt;/script&gt;"));
		assertTrue(html.contains("<strong>Safe &amp; sound</strong>"));
		assertTrue(html.contains("<code>&lt;img src=x&gt;</code>"));
	}
}
