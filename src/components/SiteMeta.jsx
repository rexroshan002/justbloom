import { useEffect } from "react";
import { siteConfig } from "../data/siteContent";

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const SiteMeta = ({
  title,
  description = siteConfig.description,
  type = "website",
  service,
}) => {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    document.title = pageTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);

    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      email: siteConfig.email,
      sameAs: [],
    };
    const structuredData = service
      ? {
          "@context": "https://schema.org",
          "@graph": [
            organization,
            {
              "@type": "Service",
              name: service.title,
              description: service.description,
              provider: { "@id": `${siteConfig.url}#organization` },
              serviceType: service.title,
              url: `${siteConfig.url}/#/services/${service.slug}`,
            },
          ],
        }
      : organization;
    let script = document.head.querySelector('script[data-site-schema="organization"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.siteSchema = "organization";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [description, service, title, type]);

  return null;
};

export default SiteMeta;
