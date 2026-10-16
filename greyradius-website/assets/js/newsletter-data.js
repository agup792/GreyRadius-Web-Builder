/**
 * Shared current-issue data for the newsletter hub.
 *
 * Update this list when a new issue is published. Archive cards are static:
 * never rewrite them from this data. A cached version of this script must
 * not turn the newest card into a duplicate of an older archived edition.
 */
(function () {
  "use strict";

  const latestIssues = Object.freeze({
    healthcare: Object.freeze({
      url: "/insights/newsletters/healthcare/healthcare-brief-oct5-11-2026/",
      issue: "006",
      date: "5–11 October 2026",
      headline: "KIMS acquisition, Regency financing and radiopharmaceutical diagnostics",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-oct5-11-2026/",
      issue: "016",
      archiveLabel: "Weekly edition",
      date: "5–11 October 2026",
      headline:
        "AI model releases, local inference and enterprise governance",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-oct5-11-2026/",
      issue: "018",
      date: "5–11 October 2026",
      headline:
        "EV retail updates, European launches and charging networks",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-oct5-11-2026/",
      issue: "016",
      date: "5–11 October 2026",
      headline:
        "India data-centre opposition, Gulf capacity and power constraints",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-oct5-11-2026/",
      issue: "015",
      date: "5–11 October 2026",
      headline:
        "US interposer supply, semiconductor results and Dresden expansion",
      hubHeadline: "Semiconductor intelligence",
    }),
  });

  window.GREYRADIUS_NEWSLETTER_LATEST = latestIssues;

  function updateHubLinks() {
    document.querySelectorAll("[data-newsletter-latest]").forEach((link) => {
      const newsletter = latestIssues[link.dataset.newsletterLatest];
      if (!newsletter) return;

      link.href = newsletter.url;
      link.textContent = `Latest: ${newsletter.hubHeadline || newsletter.headline} for ${newsletter.date}`;
    });
  }

  updateHubLinks();
})();