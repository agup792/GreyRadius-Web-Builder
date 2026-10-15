/**
 * Shared current-issue data for the newsletter hub and archive pages.
 *
 * Update this list when a new issue is published. The hub's "Latest" cards
 * and each newsletter archive's first issue both read from this data.
 */
(function () {
  "use strict";

  const latestIssues = Object.freeze({
    healthcare: Object.freeze({
      url: "/insights/newsletters/healthcare/healthcare-brief-oct5-11-2026/",
      issue: "006",
      date: "5–11 October 2026",
      headline: "GreyRadius Weekly Healthcare Brief for 5–11 October 2026",
      hubHeadline: "Weekly Healthcare Brief",
    }),
    "the-signal": Object.freeze({
      url: "/insights/newsletters/the-signal/enterprise-ai-intelligence-oct5-11-2026/",
      issue: "016",
      date: "5–11 October 2026",
      headline:
        "The Signal: Weekly Enterprise AI Intelligence for 5–11 October 2026",
      hubHeadline: "Enterprise AI intelligence",
    }),
    charged: Object.freeze({
      url: "/insights/newsletters/charged/ev-battery-intelligence-oct5-11-2026/",
      issue: "018",
      date: "5–11 October 2026",
      headline:
        "The Charged: Weekly EV & Battery Intelligence for 5–11 October 2026",
      hubHeadline: "EV and battery intelligence",
    }),
    "the-stack": Object.freeze({
      url: "/insights/newsletters/the-stack/infrastructure-brief-oct5-11-2026/",
      issue: "016",
      date: "5–11 October 2026",
      headline:
        "The Stack: Weekly Infrastructure Brief for 5–11 October 2026",
      hubHeadline: "Infrastructure intelligence",
    }),
    "the-wafer": Object.freeze({
      url: "/insights/newsletters/the-wafer/semiconductor-intelligence-oct5-11-2026/",
      issue: "015",
      date: "5–11 October 2026",
      headline:
        "The Wafer: Weekly Semiconductor Intelligence for 5–11 October 2026",
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

  function updateArchiveIssue() {
    const newsletter = latestIssues[document.body.dataset.newsletter];
    const currentIssue = document.querySelector("[data-newsletter-current]");
    if (!newsletter || !currentIssue) return;

    currentIssue.href = newsletter.url;

    const issueLabel = currentIssue.querySelector("[data-newsletter-issue]");
    if (issueLabel) {
      issueLabel.textContent = `Issue ${newsletter.issue} · ${newsletter.date}`;
    }

    const headline = currentIssue.querySelector("[data-newsletter-headline]");
    if (headline) {
      headline.textContent = newsletter.headline;
    }
  }

  updateHubLinks();
  updateArchiveIssue();
})();