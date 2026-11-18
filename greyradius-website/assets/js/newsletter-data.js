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
      url: "/insights/newsletters/healthcare/healthcare-brief-nov09-15-2026/",
      date: "9–15 November 2026",
      headline: "Hospital investment, pharma earnings and oncology regulatory decisions",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-nov09-15-2026/",
      archiveLabel: "Weekly edition",
      date: "9–15 November 2026",
      headline: "Enterprise AI delivery, commercial platforms and sovereign deployment",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-nov09-15-2026/",
      date: "9–15 November 2026",
      headline: "EV registrations, battery recycling policy and fleet electrification",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-nov09-15-2026/",
      date: "9–15 November 2026",
      headline: "AI infrastructure commissioning, financing and power readiness",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-nov09-15-2026/",
      date: "9–15 November 2026",
      headline: "Semiconductor equipment earnings, foundry revenue and power-chip demand",
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