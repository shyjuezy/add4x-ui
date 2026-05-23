export const site = {
  meta: {
    title: "Add4x Inc — Restaurant Technology Products",
    description:
      "Add4x Inc builds restaurant technology products, including Muffin Menu, a restaurant management platform for modern food businesses.",
    domain: "add4x.com",
    contactEmail: "hello@add4x.com",
  },

  nav: {
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Products", href: "#products" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Contact us", href: "mailto:hello@add4x.com" },
  },

  hero: {
    eyebrow: "Built for the restaurant operator",
    headlineLines: [
      { text: "Restaurant operations", accent: false },
      { text: "infrastructure.", accent: false },
      { text: "Zero friction.", accent: true },
    ],
    lead: "A modular, API-first platform to manage menus, kitchen displays, online orders, and analytics — built for restaurants that refuse to compromise.",
    primaryCta: {
      label: "Explore Muffin Menu",
      href: "https://www.muffinmenu.com",
    },
    secondaryCta: {
      label: "View platform",
      href: "#platform",
    },
  },

  trust: [
    "Add4x Inc builds and operates restaurant technology products.",
    "Muffin Menu is an Add4x Inc product.",
  ],

  capabilities: {
    eyebrow: "Modular system",
    heading: ["One company,", "focused restaurant technology."],
    items: [
      {
        number: "01",
        title: "Ordering workflows",
        body: "Tools for online ordering, menu presentation, and clean customer handoff from order placement to fulfillment.",
      },
      {
        number: "02",
        title: "Kitchen operations",
        body: "Live kitchen display, ticket states, timing visibility, and station-ready workflows for busy restaurant teams.",
      },
      {
        number: "03",
        title: "Point of sale",
        body: "Practical counter and service workflows for taking orders, routing items, and keeping restaurant staff aligned.",
      },
      {
        number: "04",
        title: "Reporting layer",
        body: "Operational data for menu performance, order volume, ticket timing, and the daily decisions owners need to make.",
      },
    ],
  },

  products: {
    eyebrow: "Featured product",
    heading: "Our products.",
    items: [
      {
        name: "Muffin Menu",
        body: "Muffin Menu is a restaurant management platform from Add4x Inc for kitchen display, point of sale, menu management, online ordering, and analytics.",
        href: "https://www.muffinmenu.com",
        meta: [
          { label: "Legal owner", value: "Add4x Inc" },
          { label: "Category", value: "Restaurant management platform" },
          { label: "Website", value: "muffinmenu.com" },
        ],
      },
    ],
  },

  contact: {
    eyebrow: "Let's talk",
    heading: "Build the restaurant operation your business needs.",
    lead: "Contact Add4x Inc for business, product, or account questions.",
    email: "hello@add4x.com",
  },

  footer: {
    tagline: "Add4x Inc builds and operates Muffin Menu.",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Products", href: "#products" },
      { label: "Muffin Menu", href: "https://www.muffinmenu.com" },
      { label: "Contact", href: "mailto:hello@add4x.com" },
    ],
    copyright: "© 2026 Add4x Inc. All rights reserved.",
  },
} as const;

export type Site = typeof site;
