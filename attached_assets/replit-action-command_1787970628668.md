# ACTION COMMAND FOR REPLIT - GREYRADIUS WEBSITE UPDATES

## PRIORITY: HIGH - WEBSITE AUDIT FINDINGS & REQUIRED FIXES

---

## EXECUTIVE SUMMARY

We conducted a comprehensive audit of greyradius.com and identified critical gaps:

1. **Beauty-related case studies are NOT displaying** despite multiple requests submitted
2. **Beauty industry sector is missing** from the Industries page
3. **Industry filters are incomplete** on both Case Studies and Insights pages
4. **Interlinking between sections needs verification** (Industries ↔ Case Studies ↔ Insights)

**All items below require immediate action and verification.**

---

## DETAILED ACTION ITEMS

### 1. DEPLOY & VERIFY BEAUTY CASE STUDIES

**Current Status:** 25 case studies showing on case-studies page - NONE are beauty-related

**Required Actions:**
- [ ] Confirm ALL beauty/cosmetics case studies that were requested have been created in CMS
- [ ] Deploy all beauty case studies to production (greyradius.com/case-studies/)
- [ ] Verify each beauty case study displays with:
  - ✓ Proper thumbnail image (currently missing for unpublished ones)
  - ✓ Title and description
  - ✓ Service tags (Market Entry Execution, GTM, Feasibility & TEV, etc.)
  - ✓ Industry tag: "Beauty & Personal Care" (see item #2)
  - ✓ Geography tag (India, GCC, Southeast Asia, North America, Global, MENA)
  - ✓ "Read" link to individual case study page

**Verification:** Navigate to https://greyradius.com/case-studies/ and scroll through full list - beauty cases should be visible

---

### 2. CREATE "BEAUTY & PERSONAL CARE" INDUSTRY SECTOR

**Current Status:** Industries page shows only 9 sectors - Beauty is MISSING

**Required Actions:**
- [ ] Add new industry sector: **"Beauty & Personal Care"** (or "Consumer Beauty & Cosmetics")
- [ ] Sector should appear on https://greyradius.com/industries/
- [ ] Write sector description covering:
  - Cosmetics (makeup, skincare, color cosmetics)
  - Personal care (hair care, body care, wellness)
  - Beauty technology & innovation
  - Direct-to-consumer beauty brands
  - Salon & spa services
  - Market entry strategies specific to beauty industry
- [ ] Include icon/visual representation (beauty/cosmetics related)
- [ ] Add "Explore sector" link that filters to ALL beauty case studies
- [ ] Ensure proper SEO meta tags for beauty sector

**Deliverable:** Beauty industry tile appears on Industries page with proper description and functional links

---

### 3. UPDATE CASE STUDIES FILTERS (INDUSTRY DROPDOWN)

**Current Status:** https://greyradius.com/case-studies/
- SERVICE filter: All, Market Entry Execution, GTM Execution-as-a-Service, Opportunity Assessment, Feasibility & TEV, AI Consulting ✓ (good)
- INDUSTRY filter: All, Technology, Energy & Chemicals, Healthcare & Life Sciences, CPG/FMCG/Retail (INCOMPLETE)
- GEOGRAPHY filter: All, India, GCC, Southeast Asia, North America, Global ✓ (good)

**Required Actions:**
- [ ] Add "Beauty & Personal Care" to INDUSTRY filter options
- [ ] Consider adding other potentially missing industries:
  - Fashion & Apparel
  - Luxury Goods
  - Travel & Hospitality
  - Food & Beverage (separate from CPG/FMCG)
  - Logistics & Supply Chain
  - Others as applicable to your case studies
- [ ] Test filter functionality: clicking "Beauty & Personal Care" should show ONLY beauty case studies
- [ ] Verify no case studies disappear or are duplicated when filtering

**Verification Checklist:**
- [ ] Beauty filter appears in dropdown
- [ ] Clicking "Beauty & Personal Care" returns all beauty case studies (and ONLY beauty ones)
- [ ] "All" filter shows all 25+ case studies
- [ ] Filters can be combined (e.g., Beauty + India + Market Entry Execution)

---

### 4. UPDATE INSIGHTS/BLOGS FILTERS (INDUSTRY DROPDOWN)

**Current Status:** https://greyradius.com/insights/
- Showing 29 articles
- INDUSTRY filter options: All, Technology & SaaS, Healthcare & Life Sciences, CPG/FMCG/Retail, Energy & Chemicals, Manufacturing & Industrials, Education/EdTech, Cross-sector

**Required Actions:**
- [ ] Add "Beauty & Personal Care" to INDUSTRY filter options
- [ ] Add any other missing industries (for consistency with case studies page)
- [ ] Categorize ALL existing beauty-related blogs/insights with "Beauty & Personal Care" tag if not already done
- [ ] Test filter: clicking "Beauty & Personal Care" should show only beauty-related insights
- [ ] Ensure article count updates correctly when filtering

**Verification:** Navigate to Insights page, filter by "Beauty & Personal Care" - should show relevant articles with proper thumbnails

---

### 5. VERIFY & FIX INTERLINKING

**Required Actions - Test all navigation paths:**

**Path 1: Industries → Beauty → Case Studies**
- [ ] Go to https://greyradius.com/industries/
- [ ] Find "Beauty & Personal Care" sector tile
- [ ] Click "Explore sector" → should redirect to /case-studies/?industry=beauty (or similar filtered view)
- [ ] Verify ALL beauty case studies display
- [ ] Verify NO non-beauty case studies appear

**Path 2: Industries → Beauty → Insights**
- [ ] From Industries page, Beauty sector should have link to related insights/blogs
- [ ] Clicking should show only beauty-related articles
- [ ] If this link doesn't exist, add it

**Path 3: Case Studies ↔ Insights cross-linking**
- [ ] Open a beauty case study detail page
- [ ] Verify "Related Insights" or "Related Articles" section shows relevant beauty blogs
- [ ] Open a beauty insights/blog article
- [ ] Verify related case studies are linked if applicable

**Path 4: Navigation Menu**
- [ ] Home → Services → verify links to relevant case studies/insights ✓
- [ ] Home → Industries → Beauty → working correctly ✓
- [ ] Home → Case Studies → Beauty filter available ✓
- [ ] Home → Insights → Beauty filter available ✓

---

### 6. VERIFY THUMBNAILS & MEDIA

**Current Status:** 
- Case study thumbnails: ✓ WORKING (all visible case studies have images)
- Blog/Insight thumbnails: ✓ WORKING (all visible blogs have images)
- Beauty case studies: ? UNKNOWN (depends on deployment)

**Required Actions:**
- [ ] Ensure ALL newly deployed beauty case studies have high-quality thumbnail images
- [ ] Ensure ALL beauty blog articles have thumbnail images
- [ ] Images should:
  - Be relevant to beauty/cosmetics industry
  - Maintain consistent style with existing thumbnails
  - Be properly compressed (page load speed)
  - Work in both light and dark modes (if applicable)
- [ ] Test on mobile view: thumbnails should display properly on all screen sizes

**Verification:** All case studies and blogs should display with images on both desktop and mobile

---

### 7. TEST & QUALITY ASSURANCE

**Before marking complete, perform these tests:**

- [ ] **Mobile Responsiveness:** Test all pages on mobile (filters, thumbnails, links should work)
- [ ] **Filter Combinations:** Test combining multiple filters (e.g., Beauty + India + Market Entry)
- [ ] **Search Functionality:** If search exists, verify beauty case studies/blogs are searchable
- [ ] **Page Load Speed:** Check that new content doesn't slow down page loads
- [ ] **SEO:** Verify meta tags, descriptions, and URLs are optimized for beauty industry
- [ ] **Broken Links:** Verify no 404 errors on any case study or blog links
- [ ] **Browser Compatibility:** Test in Chrome, Safari, Firefox, Edge

---

## DELIVERABLES & TIMELINE

| Item | Status | Deadline |
|------|--------|----------|
| Beauty case studies deployed | TBD | ASAP |
| Beauty industry sector created | TBD | ASAP |
| Case studies filters updated | TBD | ASAP |
| Insights filters updated | TBD | ASAP |
| Interlinking verified | TBD | ASAP |
| Thumbnails verified | TBD | ASAP |
| QA testing complete | TBD | ASAP |
| Live verification confirmation | TBD | ASAP |

---

## VERIFICATION CHECKLIST - FINAL

After all items are complete, confirm by checking these URLs:

**1. Case Studies Page**
- [ ] https://greyradius.com/case-studies/ shows 25+ case studies
- [ ] Beauty case studies are visible in the list
- [ ] INDUSTRY filter includes "Beauty & Personal Care"
- [ ] Clicking Beauty filter shows only beauty case studies
- [ ] Each case study has thumbnail image

**2. Industries Page**
- [ ] https://greyradius.com/industries/ shows 10 sectors (original 9 + Beauty)
- [ ] "Beauty & Personal Care" sector is clearly visible
- [ ] Sector has proper description and icon
- [ ] "Explore sector" link works and filters to beauty case studies

**3. Insights/Blogs Page**
- [ ] https://greyradius.com/insights/ shows 29+ articles
- [ ] INDUSTRY filter includes "Beauty & Personal Care"
- [ ] Beauty-related articles appear when filtered
- [ ] All articles have thumbnail images

**4. Cross-linking**
- [ ] Industries page Beauty sector → Case Studies filter works ✓
- [ ] Case Studies filter → Industries page cross-link (if applicable) ✓
- [ ] Related content shows up in case study detail pages ✓

**5. Mobile & Performance**
- [ ] All pages responsive on mobile ✓
- [ ] Filters work on mobile ✓
- [ ] Thumbnails load quickly ✓
- [ ] No broken links ✓

---

## NOTES FOR REPLIT

- Beauty industry is a critical vertical for Greyradius - this should have been live when case studies were created
- Current state suggests a deployment issue or incomplete migration
- Please confirm: Are all beauty case studies in the CMS but not deployed? Or were they never entered into the CMS?
- We need detailed tracking of: which beauty case studies exist, which are deployed, which need deployment
- Please provide timestamps/proof of completion for each item above

---

## CONTACT & FOLLOW-UP

Once completed, please confirm all items are live and send screenshots of:
1. Case studies page showing beauty case studies
2. Industries page showing Beauty sector
3. Case studies filtered by Beauty industry
4. Insights filtered by Beauty industry

**This audit is dated:** August 29, 2026
**Next review scheduled:** After all fixes are deployed and verified

---

**END OF ACTION COMMAND**
