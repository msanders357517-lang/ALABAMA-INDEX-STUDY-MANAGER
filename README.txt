ALABAMA INDEX STUDY MANAGER — FIRST RUNNABLE PROTOTYPE

TO RUN
  1. Unzip the entire package.
  2. Open index.html in Chrome or Edge. Do not move index.html separately from style.css, app.js or assets/.
  3. Enter a county study; add multiple PRC samples; select each sample to complete its own card.
  4. Use the Print Center and choose Save as PDF in your browser's print dialog.

TO PUT IT ONLINE
  Upload the extracted entire folder to a static site host (such as GitHub Pages or Netlify).
  Hosting has NOT been provisioned. This ZIP is a local, browser-run static application.

WHAT WORKS
  • Several independent PRCs per study and inclusion/exclusion of samples.
  • Abstraction and Lock and Key current improvement-cost arithmetic.
  • Manual base-year cost entry and per-sample cost index.
  • Sample statistics (min/max/mean/median/weighted mean/COD).
  • Original PRC template image based live front/back overlays, and browser printing.
  • Image uploads for sketch, front/rear/left/right, aerial and locator.
  • Skip with confirmation, checklist evidence, simple study gate.
  • Browser local storage and JSON backup/import.

IMPORTANT LIMITATIONS
  • This is not an official ALDOR system and has not been validated for real appraisal decisions.
  • The reference PRC images originate from a populated source worksheet. Some example marks remain.
    The background is genuine original-format artwork, but not yet a perfectly clean blank master;
    overlay positions and print scaling need appraiser verification.
  • The Alabama manual's full cost tables and the supplied PRC calculator formula engine have NOT
    been fully ported. YOU MUST independently calculate and enter validated base-year improvement cost.
  • PRD is deliberately not computed; it requires a verified appropriate statistical methodology.
  • This prototype does not reproduce the exact supplied state cost index template's sheet layout.
  • The application is locally saved in the current browser only (localStorage); no cloud syncing,
    users, access controls or server. Export a JSON backup regularly. Large images can exhaust storage.
  • Do not use taxpayer-identifying or confidential data in an unapproved public hosting environment.
  • It is not proof of state approval and must not be used as an official implementation authority.

SOURCES
  Alabama Appraisal Manual (2015), chapters 6-9 and original PRC examples;
  PRC CALCULATOR 2025-3-13(1).xlsb;
  Cost Index Template.xlsm;
  Index_Study_Checklist(1).docx.
