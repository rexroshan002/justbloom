import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does JustBloom offer?",
    answer:
      "JustBloom offers web design and development, performance marketing, social media handling, shooting and production, editing and post-production, brand promotion, Meta Ads, Google Ads, and growth strategy.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Project timelines depend on the scope, content, and integrations. We agree on milestones and a delivery schedule with you before work begins.",
  },
  {
    question: "Do you manage Meta and Google advertising campaigns?",
    answer:
      "Yes. We plan, launch, and optimize Meta and Google campaigns around your audience, goals, creative, and performance data.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on the services and scope your business needs. Contact JustBloom to discuss your goals and receive a proposal for your project.",
  },
  {
    question: "How can I contact JustBloom?",
    answer:
      "Use the contact form on this website or email info@justbloom.com.co to start a conversation about your project.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    };

    let script = document.getElementById("faq-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => script.remove();
  }, []);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <style>{`
        .faq-section {
          padding: 80px 24px;
          background: #f8faff;
        }
        .faq-section__container {
          width: min(100%, 900px);
          margin: 0 auto;
        }
        .faq-section__title {
          margin-bottom: 36px;
          color: #0a1931;
          font-size: clamp(30px, 5vw, 44px);
          font-weight: 800;
          letter-spacing: -.04em;
          text-align: center;
        }
        .faq-section__list {
          display: grid;
          gap: 14px;
        }
        .faq-section__item {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #fff;
          transition: border-color .2s ease, box-shadow .3s ease;
        }
        .faq-section__item:hover,
        .faq-section__item.is-open {
          border-color: #1d5bff;
        }
        .faq-section__item.is-open {
          box-shadow: 0 12px 30px rgba(10,25,49,.08);
        }
        .faq-section__question {
          display: flex;
          width: 100%;
          min-height: 68px;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 22px;
          border: 0;
          background: transparent;
          color: #0a1931;
          font: inherit;
          font-size: 16px;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
        }
        .faq-section__icon {
          flex: 0 0 auto;
          color: #1d5bff;
          transition: transform .3s ease;
        }
        .faq-section__item.is-open .faq-section__icon {
          transform: rotate(180deg);
        }
        .faq-section__answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .3s ease;
        }
        .faq-section__item.is-open .faq-section__answer-wrap {
          grid-template-rows: 1fr;
        }
        .faq-section__answer-clip {
          overflow: hidden;
        }
        .faq-section__answer {
          padding: 0 22px 22px;
          color: #64748b;
          font-size: 15px;
          line-height: 1.75;
        }
        @media (max-width: 640px) {
          .faq-section {
            padding: 64px 18px;
          }
          .faq-section__question {
            padding: 17px;
            font-size: 15px;
          }
          .faq-section__answer {
            padding: 0 17px 18px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-section__item,
          .faq-section__icon,
          .faq-section__answer-wrap {
            transition: none;
          }
        }
      `}</style>
      <div className="faq-section__container">
        <h2 className="faq-section__title" id="faq-title">
          Frequently Asked Questions
        </h2>
        <div className="faq-section__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                className={`faq-section__item ${isOpen ? "is-open" : ""}`}
                key={faq.question}
              >
                <h3>
                  <button
                    className="faq-section__question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpenIndex((current) => (current === index ? null : index))
                    }
                  >
                    {faq.question}
                    <ChevronDown
                      className="faq-section__icon"
                      size={20}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  className="faq-section__answer-wrap"
                  id={answerId}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-section__answer-clip">
                    <p className="faq-section__answer">{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
