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
      url: "/insights/newsletters/healthcare/healthcare-brief-oct26-nov01-2026/",
      date: "26 October–1 November 2026",
      headline: "Hospital expansion, clinical trials and biomarker-directed treatment",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-oct26-nov01-2026/",
      archiveLabel: "Weekly edition",
      date: "26 October–1 November 2026",
      headline: "Enterprise AI workflows, agent controls and sovereign investment",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-oct26-nov01-2026/",
      date: "26 October–1 November 2026",
      headline: "Battery testing, electric freight and public charging economics",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-oct26-nov01-2026/",
      date: "26 October–1 November 2026",
      headline: "Chennai AI capacity, cloud accelerators and power commitments",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-oct26-nov01-2026/",
      date: "26 October–1 November 2026",
      headline: "Foundry utilisation, equipment earnings and AI memory supply",
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