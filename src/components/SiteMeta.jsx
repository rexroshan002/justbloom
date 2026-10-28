import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  GOOGLE_VERIFICATION,
  BING_VERIFICATION,
} from "../data/seoConfig";
import { siteConfig } from "../data/siteContent";
import heroImage from "../assets/hero.webp";

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"][href="${href}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    element.href = href;
    document.head.appendChild(element);
  }
};

const getPageTitle = (pathname, title, service) => {
  if (title) return `${title} | ${SITE_NAME}`;
  if (service?.title) return `${service.title} | ${SITE_NAME}`;
  if (pathname === "/services") return `Services | ${SITE_NAME}`;
  if (pathname === "/contact") return `Contact | ${SITE_NAME}`;
  return `${SITE_NAME} | Where Brands Bloom`;
};

const getCanonicalUrl = (pathname) =>
  pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}/#${pathname}`;

const getBreadcrumbs = (pathname, canonical) => {
  const items = [{ name: "Home", item: `${SITE_URL}/` }];

  if (pathname === "/services") {
    items.push({ name: "Services", item: canonical });
  } else if (pathname.startsWith("/services/")) {
    items.push({ name: "Services", item: `${SITE_URL}/#/services` });
    items.push({
      name: pathname.split("/").at(-1).replaceAll("-", " "),
      item: canonical,
    });
  } else if (pathname === "/contact") {
    items.push({ name: "Contact", item: canonical });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...item,
    })),
  };
};

const SiteMeta = ({ title, description, type = "website", service, noIndex = false }) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname, title, service);
    const pageDescription = description || service?.description || SITE_DESCRIPTION;
    const canonical = getCanonicalUrl(location.pathname);
    const organizationId = `${SITE_URL}/#organization`;
    const pageImage = new URL(heroImage, window.location.href).href;

    document.title = pageTitle;
    upsertMeta("name", "description", pageDescription);
    upsertMeta("name", "keywords", SITE_KEYWORDS);
    upsertMeta("name", "author", SITE_AUTHOR);
    upsertMeta(
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    upsertMeta("name", "ai-content-declaration", "AI-friendly, human-created");
    upsertMeta("name", "google-site-verification", GOOGLE_VERIFICATION);
    if (BING_VERIFICATION) {
      upsertMeta("name", "msvalidate.01", BING_VERIFICATION);
    }
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "article:author", SITE_AUTHOR);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", pageImage);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", pageImage);
    upsertCanonical(canonical);
    upsertLink("preconnect", "https://fonts.googleapis.com");
    upsertLink("preconnect", "https://fonts.gstatic.com");
    upsertLink("preconnect", "https://images.unsplash.com");

    const graph = [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: SITE_LOGO,
        description: SITE_DESCRIPTION,
        email: siteConfig.email,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      getBreadcrumbs(location.pathname, canonical),
    ];

    if (service) {
      graph.push({
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": organizationId },
        serviceType: service.title,
        url: canonical,
      });
    }

    let script = document.getElementById("site-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "site-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [description, location, noIndex, service, title, type]);

  return null;
};

export default SiteMeta;
