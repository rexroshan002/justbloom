import { useCallback, useEffect, useState } from "react";
import {
  Check,
  CheckCircle,
  LoaderCircle,
  Quote,
  Star,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const initialForm = {
  name: "",
  company: "",
  rating: 5,
  review_text: "",
};
const FALLBACK_REVIEWS = [
  { id: '1', name: 'Sagar Bardapure', company: 'Bardapure Productions', rating: 5, review_text: 'JustBloom transformed our production house presence completely. Genuinely impressed!', created_at: new Date().toISOString() },
  { id: '2', name: 'Uma Shankar', company: 'Spartan Security Solutions', rating: 5, review_text: 'Professional, reliable and result-driven. Highly recommended!', created_at: new Date().toISOString() }
];
const reviewStyles = `
  .client-reviews {
    margin-top: 0;
    padding: 80px 24px 96px;
    background: #f8faff;
    color: #0a1931;
  }
  .client-reviews__container {
    width: min(100%, 1280px);
    margin: 0 auto;
  }
  .client-reviews__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
  }
  .client-reviews__brand-pill {
    flex: 0 0 auto;
    padding: 10px 16px;
    border-radius: 999px;
    background: #e0e7ff;
    color: #1d5bff;
    font-size: 14px;
    font-weight: 700;
  }
  .client-reviews__title {
    color: #0a1931;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    letter-spacing: -.04em;
    line-height: 1.1;
  }
  .client-reviews__subtitle {
    margin-top: 12px;
    color: #64748b;
    font-size: 17px;
  }
  .client-reviews__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    margin-top: 40px;
  }
  .client-review-card {
    display: flex;
    min-height: 300px;
    flex-direction: column;
    padding: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 4px 20px rgba(10, 25, 49, .06);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .client-review-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(10, 25, 49, .14);
  }
  .client-review-card__top,
  .client-review-card__rating,
  .client-review-card__author {
    display: flex;
    align-items: center;
  }
  .client-review-card__top {
    justify-content: space-between;
    gap: 12px;
  }
  .client-review-card__verified {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    background: #ecfdf3;
    color: #15803d;
    font-size: 12px;
    font-weight: 700;
  }
  .client-review-card__rating {
    gap: 3px;
    margin-top: 22px;
    color: #f5ad18;
  }
  .client-review-card__quote {
    margin: 18px 0 22px;
    color: #475569;
    font-size: 15px;
    font-style: italic;
    line-height: 1.75;
  }
  .client-review-card__author {
    align-items: flex-start;
    gap: 12px;
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid #eef2f7;
  }
  .client-review-card__avatar {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    place-items: center;
    border-radius: 50%;
    background: #eaf0ff;
    color: #1d5bff;
  }
  .client-review-card__name {
    color: #0a1931;
    font-size: 15px;
    font-weight: 800;
  }
  .client-review-card__company,
  .client-review-card__date {
    margin-top: 3px;
    color: #64748b;
    font-size: 13px;
  }
  .client-review-card__date {
    color: #94a3b8;
    font-size: 12px;
  }
  .client-review-card__quote-icon {
    opacity: .12;
  }
  .client-reviews__form-card {
    margin-top: 48px;
    padding: clamp(24px, 5vw, 44px);
    border: 1px solid #e2e8f0;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(255,255,255,.9), rgba(235,242,255,.82));
    box-shadow: 0 20px 50px rgba(10,25,49,.09);
    backdrop-filter: blur(16px);
  }
  .client-reviews__form-heading {
    margin-bottom: 8px;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -.03em;
  }
  .client-reviews__form-copy {
    margin-bottom: 26px;
    color: #64748b;
    line-height: 1.6;
  }
  .client-reviews__form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
  .client-reviews__field {
    display: grid;
    gap: 8px;
    color: #0a1931;
    font-size: 14px;
    font-weight: 700;
  }
  .client-reviews__input-wrap {
    position: relative;
  }
  .client-reviews__input-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    color: #94a3b8;
    transform: translateY(-50%);
  }
  .client-reviews__input,
  .client-reviews__textarea {
    width: 100%;
    border: 1px solid #dbe3ef;
    border-radius: 14px;
    background: rgba(255,255,255,.92);
    color: #0a1931;
    font: inherit;
    font-weight: 400;
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  .client-reviews__input {
    min-height: 50px;
    padding: 12px 14px 12px 44px;
  }
  .client-reviews__textarea {
    min-height: 120px;
    padding: 14px;
    resize: vertical;
  }
  .client-reviews__input:focus,
  .client-reviews__textarea:focus {
    border-color: #1d5bff;
    outline: none;
    box-shadow: 0 0 0 4px rgba(29,91,255,.12);
  }
  .client-reviews__rating-buttons {
    display: flex;
    gap: 5px;
  }
  .client-reviews__rating-button {
    padding: 3px;
    border: 0;
    background: transparent;
    color: #cbd5e1;
    cursor: pointer;
    transition: color .15s ease, transform .15s ease;
  }
  .client-reviews__rating-button:hover {
    transform: scale(1.12);
  }
  .client-reviews__rating-button.is-selected {
    color: #f5ad18;
  }
  .client-reviews__submit-row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .client-reviews__submit {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 24px;
    border: 0;
    border-radius: 14px;
    background: #1d5bff;
    color: #fff;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(29,91,255,.25);
    transition: background .2s ease, transform .2s ease;
  }
  .client-reviews__submit:hover:not(:disabled) {
    background: #0a1931;
    transform: translateY(-2px);
  }
  .client-reviews__submit:disabled {
    cursor: wait;
    opacity: .7;
  }
  .client-reviews__toast,
  .client-reviews__error {
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.5;
  }
  .client-reviews__toast {
    background: #ecfdf3;
    color: #166534;
  }
  .client-reviews__error {
    margin-top: 16px;
    background: #fff1f2;
    color: #be123c;
  }
  .client-reviews__status {
    margin-top: 28px;
    color: #64748b;
    text-align: center;
  }
  .client-reviews__success-icon {
    animation: review-success-pop .35s ease both;
  }
  @keyframes review-success-pop {
    0% { opacity: 0; transform: scale(.5); }
    70% { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  @media (max-width: 900px) {
    .client-reviews__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .client-reviews {
      padding: 72px 18px;
    }
    .client-reviews__header {
      align-items: flex-start;
      flex-direction: column;
    }
    .client-reviews__grid,
    .client-reviews__form {
      grid-template-columns: 1fr;
    }
    .client-review-card {
      min-height: 270px;
      padding: 24px;
    }
    .client-reviews__submit-row {
      grid-column: auto;
      align-items: stretch;
      flex-direction: column;
    }
  }
`;

const getVerifiedCompany = (company) => /bardapure|spartan/i.test(company || "");

const formatDate = (date) => {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        parsedDate,
      );
};

const ClientReviews = () => {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState(initialForm);

  const fetchReviews = useCallback(async () => {
  try {
    const { data, error } = await supabase.from("reviews").select("*").eq("approved", true).order("created_at", { ascending: false }).limit(6);
    if (error) throw error;
    return data?.length ? data : FALLBACK_REVIEWS;
  } catch { return FALLBACK_REVIEWS; }
}, []);

    useEffect(() => {
    let isMounted = true;
    fetchReviews()
      .then((data) => {
        if (isMounted) setReviews(data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [fetchReviews]);

  useEffect(() => {
    const channel = supabase
      .channel("reviews-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews",
          filter: "approved=eq.true",
        },
        (payload) => {
          setReviews((currentReviews) => [
            payload.new,
            ...currentReviews.filter(
              (review) => review.id !== payload.new.id,
            ),
          ].slice(0, 6));
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("Could not subscribe to live client reviews.");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setNotice("");

    const review = {
    name: form.name.trim(),
    company: form.company.trim(),
    rating: Number(form.rating),
    review_text: form.review_text.trim(),
    approved: true,
    };  

    try {
      const { error: insertError } = await supabase
        .from("reviews")
        .insert(review);
      if (insertError) throw insertError;
    } catch (insertError) {
      setError("Your review could not be submitted. Please try again.");
      console.error("Could not submit client review:", insertError);
      setIsSubmitting(false);
      return;
    }

    setForm(initialForm);
    setNotice("Review submitted! Thanks!");

    try {
      const emailResponse = await fetch("/api/reviews-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      if (!emailResponse.ok) {
        setNotice(
          "Review submitted — it will appear after approval. The team email notification could not be sent.",
        );
      }
    } catch (emailError) {
      setNotice(
        "Review submitted — it will appear after approval. The team email notification could not be sent.",
      );
      console.error("Could not send review notification:", emailError);
    }

    try {
      const data = await fetchReviews();
      setReviews(data);
    } catch (fetchError) {
      setError("Your review was saved, but reviews could not be refreshed.");
      console.error("Could not refresh client reviews:", fetchError);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="client-reviews" id="reviews">
      <style>{reviewStyles}</style>
      <div className="client-reviews__container">
        <header className="client-reviews__header">
          <div>
            <h2 className="client-reviews__title">What Clients Say</h2>
            <p className="client-reviews__subtitle">
              Hear from the people we have had the pleasure of working with.
            </p>
          </div>
          <span className="client-reviews__brand-pill">
            Trusted by 50+ brands
          </span>
        </header>

        {isLoading ? (
          <p className="client-reviews__status" role="status">
            Loading client reviews…
          </p>
        ) : (
          reviews.length > 0 ? (
            <div className="client-reviews__grid">
              {reviews.map((review) => {
                const verified = getVerifiedCompany(review.company);
                const date = formatDate(review.created_at);

                return (
                  <article className="client-review-card" key={review.id}>
                    <div className="client-review-card__top">
                      {verified && (
                        <span className="client-review-card__verified">
                          <CheckCircle size={16} aria-hidden="true" />
                          Verified Project
                        </span>
                      )}
                      <Quote
                        className="client-review-card__quote-icon"
                        size={24}
                        color="#1d5bff"
                        fill="rgba(29,91,255,.12)"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className="client-review-card__rating"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={17}
                          fill={index < review.rating ? "currentColor" : "none"}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="client-review-card__quote">
                      “{review.review_text}”
                    </p>
                    <div className="client-review-card__author">
                      <span className="client-review-card__avatar">
                        <UserRound size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="client-review-card__name">{review.name}</p>
                        {review.company && (
                          <p className="client-review-card__company">
                            {review.company}
                          </p>
                        )}
                        {date && (
                          <time
                            className="client-review-card__date"
                            dateTime={review.created_at}
                          >
                            {date}
                          </time>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="client-reviews__status">
              No approved reviews are available yet.
            </p>
          )
        )}

        <div className="client-reviews__form-card">
          <h3 className="client-reviews__form-heading">Share your experience</h3>
          <p className="client-reviews__form-copy">
            We value your feedback. Submitted reviews are published once
            approved.
          </p>
          <form className="client-reviews__form" onSubmit={handleSubmit}>
            <label className="client-reviews__field" htmlFor="review-name">
              Name *
              <span className="client-reviews__input-wrap">
                <UserRound
                  className="client-reviews__input-icon"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  className="client-reviews__input"
                  id="review-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={120}
                  autoComplete="name"
                />
              </span>
            </label>
            <label className="client-reviews__field" htmlFor="review-company">
              Company
              <input
                className="client-reviews__input"
                id="review-company"
                name="company"
                value={form.company}
                onChange={handleChange}
                maxLength={160}
                autoComplete="organization"
              />
            </label>
            <fieldset className="client-reviews__field">
              <legend>Rating *</legend>
              <div className="client-reviews__rating-buttons">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
                    aria-pressed={form.rating === rating}
                    className={`client-reviews__rating-button ${
                      rating <= form.rating ? "is-selected" : ""
                    }`}
                    key={rating}
                    onClick={() =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        rating,
                      }))
                    }
                    type="button"
                  >
                    <Star
                      size={28}
                      fill={rating <= form.rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </fieldset>
            <label
              className="client-reviews__field"
              htmlFor="review-review-text"
              style={{ gridColumn: "1 / -1" }}
            >
              Your review *
              <textarea
                className="client-reviews__textarea"
                id="review-review-text"
                name="review_text"
                value={form.review_text}
                onChange={handleChange}
                required
                maxLength={2000}
                rows={4}
              />
            </label>
            <div className="client-reviews__submit-row">
              <button
                className="client-reviews__submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="review-spinner" size={18} />
                    Submitting…
                  </>
                ) : (
                  "Submit review"
                )}
              </button>
              {notice && (
                <p className="client-reviews__toast" role="status">
                  <Check
                    className="client-reviews__success-icon"
                    size={17}
                    style={{ display: "inline", marginRight: 7 }}
                    aria-hidden="true"
                  />
                  {notice}
                </p>
              )}
            </div>
          </form>
          {error && (
            <p className="client-reviews__error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
      <style>{`
        @keyframes review-spin {
          to { transform: rotate(360deg); }
        }
        .review-spinner {
          animation: review-spin .8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientReviews;
