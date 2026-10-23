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
      url: "/insights/newsletters/healthcare/healthcare-brief-oct12-18-2026/",
      issue: "007",
      date: "12–18 October 2026",
      headline: "Healthcare acquisitions, hospital capacity and AI-enabled care",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-oct12-18-2026/",
      issue: "017",
      archiveLabel: "Weekly edition",
      date: "12–18 October 2026",
      headline: "Governed agentic AI, India partnerships and enterprise controls",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-oct12-18-2026/",
      issue: "019",
      date: "12–18 October 2026",
      headline: "EV demand, lithium supply and India charging economics",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-oct12-18-2026/",
      issue: "017",
      date: "12–18 October 2026",
      headline: "India data-centre construction, power pipelines and global capacity",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-oct12-18-2026/",
      issue: "016",
      date: "12–18 October 2026",
      headline: "Foundry earnings, silicon carbide supply and AI packaging",
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