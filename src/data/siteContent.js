import {
  BarChart3,
  Code2,
  Edit,
  Infinity as InfinityIcon,
  Megaphone,
  Target,
  Video,
} from "lucide-react";

export const siteConfig = {
  name: "JustBloom",
  description:
    "JustBloom is a full-service digital agency helping ambitious brands grow through creative, media, and measurable strategy.",
  url: "https://justbloom.agency",
  email: "justbloom.team@gmail.com",
};

export const serviceCatalog = [
  {
    slug: "website-development",
    title: "Web Design & Development",
    shortDescription:
      "High-performance websites built to turn your brand presence into measurable growth.",
    description:
      "We build high-performance websites that give your brand a stronger digital foundation and turn attention into measurable growth.",
    icon: Code2,
    colorClass: "icon-blue",
    outcomes: [
      "A clearer digital brand experience",
      "Performance-focused user journeys",
      "A foundation built for future growth",
    ],
    relatedSlugs: ["brand-promotion", "strategy-management"],
    isMainService: true,
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    shortDescription:
      "ROI-focused ad campaigns that drive qualified leads and real business growth.",
    description:
      "We build and optimize performance campaigns that connect the right audiences with measurable business growth.",
    icon: BarChart3,
    colorClass: "icon-orange",
    outcomes: [
      "A measurable acquisition strategy",
      "Campaigns optimized around qualified demand",
      "Clear reporting tied to business outcomes",
    ],
    relatedSlugs: ["meta-ads-campaigns", "google-ads-campaigns"],
    isMainService: true,
  },
  {
    slug: "social-media-handling",
    title: "Social Media Handling",
    shortDescription:
      "Consistent content, strategy and growth management to build your brand online.",
    description:
      "We manage your social presence with consistent content, thoughtful community engagement, and a strategy built for sustainable growth.",
    icon: Megaphone,
    colorClass: "icon-pink",
    outcomes: [
      "A consistent social content system",
      "Stronger audience engagement",
      "A clearer and more recognizable brand presence",
    ],
    relatedSlugs: ["brand-promotion", "strategy-management"],
    isMainService: true,
  },
  {
    slug: "shooting-production",
    title: "Shooting & Production",
    shortDescription: "High-quality shoots that tell your brand story beautifully.",
    description:
      "From concept to final cut, we produce visual content that gives your brand a sharper presence and a reason to be remembered.",
    icon: Video,
    colorClass: "icon-blue",
    outcomes: ["Campaign-ready visual assets", "Consistent brand storytelling", "Production built around your growth goals"],
    relatedSlugs: ["editing-post-production", "brand-promotion"],
  },
  {
    slug: "editing-post-production",
    title: "Editing & Post Production",
    shortDescription: "Professional editing that makes your content stand out.",
    description:
      "We turn raw footage into high-retention content engineered for the platforms and audiences that matter to your business.",
    icon: Edit,
    colorClass: "icon-purple",
    outcomes: ["Platform-native edits", "Faster content publishing", "A consistent visual language"],
    relatedSlugs: ["shooting-production", "brand-promotion"],
  },
  {
    slug: "brand-promotion",
    title: "Brand Promotion",
    shortDescription: "We promote your brand across the right platforms to get maximum reach.",
    description:
      "Build awareness with a connected promotion system that puts your story in front of the right people at the right moment.",
    icon: Megaphone,
    colorClass: "icon-pink",
    outcomes: ["Clearer market positioning", "Multi-channel campaign planning", "Creative that compounds over time"],
    relatedSlugs: ["meta-ads-campaigns", "strategy-management"],
  },
  {
    slug: "meta-ads-campaigns",
    title: "Meta Ads Campaigns",
    shortDescription: "Targeted Facebook & Instagram ads that bring real results.",
    description:
      "We pair strong creative with disciplined testing and targeting to turn attention into qualified demand.",
    icon: InfinityIcon,
    colorClass: "icon-cyan",
    outcomes: ["Testable campaign structures", "Creative iteration at speed", "More efficient customer acquisition"],
    relatedSlugs: ["brand-promotion", "google-ads-campaigns"],
  },
  {
    slug: "google-ads-campaigns",
    title: "Google Ads Campaigns",
    shortDescription: "Drive quality traffic and leads with smart Google Ads.",
    description:
      "Capture high-intent demand with search and performance campaigns connected to meaningful business outcomes.",
    icon: BarChart3,
    colorClass: "icon-orange",
    outcomes: ["Intent-led acquisition", "Conversion-focused landing journeys", "Transparent performance reporting"],
    relatedSlugs: ["meta-ads-campaigns", "strategy-management"],
  },
  {
    slug: "strategy-management",
    title: "Strategy & Management",
    shortDescription: "Complete digital strategy and management for business growth.",
    description:
      "Create a practical growth roadmap that aligns creative, media, and measurement into one accountable operating system.",
    icon: Target,
    colorClass: "icon-indigo",
    outcomes: ["A unified growth roadmap", "Prioritized channel investment", "Ongoing optimization and accountability"],
    relatedSlugs: ["brand-promotion", "google-ads-campaigns"],
  },
];

export const getServiceBySlug = (slug) =>
  serviceCatalog.find((service) => service.slug === slug);
