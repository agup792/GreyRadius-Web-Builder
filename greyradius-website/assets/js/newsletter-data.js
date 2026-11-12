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
      url: "/insights/newsletters/healthcare/healthcare-brief-nov02-08-2026/",
      date: "2–8 November 2026",
      headline: "Hospital growth, capacity investment and FDA manufacturing guidance",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-nov02-08-2026/",
      archiveLabel: "Weekly edition",
      date: "2–8 November 2026",
      headline: "Enterprise AI deployment, workflow economics and governance",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-nov02-08-2026/",
      date: "2–8 November 2026",
      headline: "India battery investment, storage support and EV market demand",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-nov02-08-2026/",
      date: "2–8 November 2026",
      headline: "AI data-centre investment, commissioning and power delivery",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-nov02-08-2026/",
      date: "2–8 November 2026",
      headline: "AI chip earnings, foundry economics and packaging supply risk",
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