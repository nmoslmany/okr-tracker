export const INITIAL_OKRS = [
  {
    id: 1, num: '01',
    title: 'Mature Data Governance into an Adopted Operating Practice',
    objective: "Make data governance a living, day-to-day practice in R&D's two priority data domains — not a framework on paper.",
    krs: [
      { id: 'k1a', text: 'Achieve ≥50% Data Owner & Steward coverage in the Genotype domain', target: 50, current: 32, unit: '%', dl: 'Oct 2026', dq: 'Q2', ms: null, note: '', noteTs: null },
      { id: 'k1b', text: 'Achieve ≥80% Data Owner & Steward coverage in the Agricultural Management domain', target: 80, current: 45, unit: '%', dl: 'Oct 2026', dq: 'Q2', ms: null, note: '', noteTs: null },
      { id: 'k1c', text: '100% of governance decisions in both priority domains documented and traceable', target: 100, current: 72, unit: '%', dl: 'Ongoing', dq: 'All', ms: null, note: '', noteTs: null },
      { id: 'k1d', text: 'Ways of working established with Data Owners & Stewards in both domains: regular touchpoints, escalation paths, accountability model', target: 100, current: 0, unit: '%', dl: 'Q2 FY25/26', dq: 'Q2', ms: 'Behind', note: 'Carried over from prior fiscal year — currently in progress.', noteTs: '2026-06-16T09:15:00' },
    ],
  },
  {
    id: 2, num: '02',
    title: 'Establish a Trusted Master Data Foundation',
    objective: 'Define authoritative master data for core R&D entities — varieties, trials, locations — to eliminate duplication and inconsistency across systems.',
    krs: [
      { id: 'k2a', text: 'Publish golden records for Variety master data', target: 100, current: 80, unit: '%', dl: 'Dec 2026', dq: 'Q2', ms: null, note: '', noteTs: null },
      { id: 'k2b', text: 'Reduce duplicate entries in Trial data by ≥60%', target: 60, current: 60, unit: '%', dl: 'Mar 2027', dq: 'Q3', ms: null, note: '', noteTs: null },
      { id: 'k2c', text: 'Integrate 3 critical source systems into the MDM platform', target: 3, current: 2, unit: 'systems', dl: 'Q3 FY26/27', dq: 'Q3', ms: null, note: '', noteTs: null },
    ],
  },
  {
    id: 3, num: '03',
    title: 'Enable Data-Driven Decision Making in Breeding R&D',
    objective: 'Ensure R&D teams can access, trust and act on data without depending on engineering support for routine analyses.',
    krs: [
      { id: 'k3a', text: 'Deploy self-service analytics environment for ≥3 breeding teams', target: 3, current: 1, unit: 'teams', dl: 'Feb 2027', dq: 'Q3', ms: null, note: '', noteTs: null },
      { id: 'k3b', text: 'Achieve ≥80% data freshness SLA across critical dashboards', target: 80, current: 55, unit: '%', dl: 'Ongoing', dq: 'All', ms: null, note: '', noteTs: null },
      { id: 'k3c', text: 'Reduce ad hoc data extraction requests by 40%', target: 40, current: 18, unit: '%', dl: 'Mar 2027', dq: 'Q3', ms: null, note: '', noteTs: null },
      { id: 'k3d', text: '≥75% user satisfaction score in quarterly data service survey', target: 75, current: 68, unit: '%', dl: 'Quarterly', dq: 'All', ms: null, note: '', noteTs: null },
    ],
  },
  {
    id: 4, num: '04',
    title: 'Build Data Literacy Across R&D',
    objective: 'Equip R&D staff with the skills and confidence to work with data responsibly — from basic hygiene to governance principles.',
    krs: [
      { id: 'k4a', text: 'Deliver data literacy training to ≥80 R&D staff', target: 80, current: 52, unit: 'staff', dl: 'Mar 2027', dq: 'Q3', ms: null, note: '', noteTs: null },
      { id: 'k4b', text: '≥85% completion rate for mandatory data handling e-learning', target: 85, current: 91, unit: '%', dl: 'Ongoing', dq: 'All', ms: null, note: '', noteTs: null },
      { id: 'k4c', text: 'Establish a Data Champions network across 5 R&D departments', target: 5, current: 3, unit: 'depts', dl: 'Q2 FY26/27', dq: 'Q2', ms: null, note: '', noteTs: null },
    ],
  },
  {
    id: 5, num: '05',
    title: 'Ensure Compliant and Auditable Data Processes',
    objective: 'Align R&D data practices with regulatory, IP and security requirements — demonstrating auditability and reducing compliance risk.',
    krs: [
      { id: 'k5a', text: 'Zero critical findings in annual data compliance audit', target: 0, current: 0, unit: 'findings', dl: 'Jun 2027', dq: 'Q4', ms: 'On Track', note: 'Maintaining zero-findings track record from FY25/26.', noteTs: '2026-06-10T14:30:00' },
      { id: 'k5b', text: '100% of sensitive R&D datasets classified and access-controlled', target: 100, current: 64, unit: '%', dl: 'Dec 2026', dq: 'Q2', ms: null, note: '', noteTs: null },
      { id: 'k5c', text: 'Data retention policy implemented across all priority systems', target: 100, current: 35, unit: '%', dl: 'Q4 FY26/27', dq: 'Q4', ms: null, note: '', noteTs: null },
    ],
  },
  {
    id: 6, num: '06',
    title: 'Modernise the R&D Data Platform for Scale',
    objective: 'Upgrade foundational data infrastructure to support growing data volumes, new sources and faster time-to-insight for R&D teams.',
    krs: [
      { id: 'k6a', text: 'Migrate 5 legacy data pipelines to the modern stack', target: 5, current: 3, unit: 'pipelines', dl: 'Jan 2027', dq: 'Q3', ms: null, note: '', noteTs: null },
      { id: 'k6b', text: '≥90% of critical pipelines meeting <2hr data refresh SLA', target: 100, current: 60, unit: '%', dl: 'Q2 FY26/27', dq: 'Q2', ms: null, note: '', noteTs: null },
      { id: 'k6c', text: 'Platform uptime ≥99.5% for core R&D data services', target: 99.5, current: 99.1, unit: '%', dl: 'Ongoing', dq: 'All', ms: null, note: '', noteTs: null },
    ],
  },
]
