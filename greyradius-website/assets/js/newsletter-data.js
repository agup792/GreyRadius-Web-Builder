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
      url: "/insights/newsletters/healthcare/healthcare-brief-nov16-22-2026/",
      date: "16–22 November 2026",
      headline: "Oncology biosimilars, healthcare acquisitions and licensing partnerships",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-nov16-22-2026/",
      archiveLabel: "Weekly edition",
      date: "16–22 November 2026",
      headline: "Enterprise AI governance, sovereign delivery and workflow integration",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-nov16-22-2026/",
      date: "16–22 November 2026",
      headline: "Electric fleets, battery supply and charging economics",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-nov16-22-2026/",
      date: "16–22 November 2026",
      headline: "AI infrastructure investment, sovereign cloud and power readiness",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-nov16-22-2026/",
      date: "16–22 November 2026",
      headline: "Semiconductor export controls, advanced packaging and AI supply chains",
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