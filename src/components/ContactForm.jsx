import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import SiteMeta from "./SiteMeta";
import "./ContactForm.css";

const ContactForm = () => {
  const navigate = useNavigate();
  // New state variables to handle the submission process
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Attach the Google callback function to the global window object
    window.handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: " + response.credential);
      alert(
        "Google Auth Successful! You can now link this to your app's state.",
      );
    };
    // Cleanup function
    return () => {
      delete window.handleCredentialResponse;
    };
  }, []);

  // This function intercepts the submit button and sends data silently
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from redirecting
    setIsLoading(true);
    setSubmitError("");

    const formData = new FormData(e.target);

    try {
      // Notice the /ajax/ added to the URL! This tells FormSubmit to stay quiet.
      const response = await fetch(
        "https://formsubmit.co/ajax/justbloom.team@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        setIsSubmitted(true); // Triggers the success screen
      } else {
        setSubmitError("We couldn't send your message. Please review your details and try again.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("A network error interrupted the request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- SUCCESS SCREEN UI ---
  if (isSubmitted) {
    return (
      <section id="contact" className="contact-section">
        <SiteMeta title="Message sent" description="Your JustBloom contact request was sent successfully." />
        <div className="contact-glow"></div>
        <div className="form-container" style={{ textAlign: "center" }}>
          <CheckCircle
            size={64}
            color="#00d4ff"
            style={{ margin: "0 auto 24px" }}
          />
          <h2>Submission Successful</h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}
          >
            Your message has been securely delivered to our team. Our team will
            contact with you shortly.
          </p>
          <button className="submit-btn" onClick={() => navigate("/")}>
            Return to main page <ArrowLeft size={16} />
          </button>
        </div>
      </section>
    );
  }
  // --- NORMAL FORM UI ---
  return (
    <section id="contact" className="contact-section">
      <SiteMeta title="Contact" description="Start a conversation with JustBloom about your next growth milestone." />
      <div className="contact-glow"></div>

      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="form-container">
      <div className="form-kicker">Start a conversation</div>
      <h2>Build what’s next.</h2>
      <p className="form-intro">Tell us where you want to go. We’ll come back with a clear next step.</p>

        {/* We removed action/method and added onSubmit */}
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="_subject"
            value="New Subspace Transmission (Contact Form)"
          />
          {/* _next is no longer needed because we handle the UI entirely in React */}

          <div className="input-group">
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name" type="text" name="name" placeholder="Name" required />
          </div>
          <div className="input-group">
            <label htmlFor="contact-email">Work email</label>
            {/* type="email" ensures the browser warns them about missing .coms before they can even click submit */}
            <input
              id="contact-email" type="email" name="email" placeholder="Email" required />
          </div>
          <div className="input-group phone-group">
            <label htmlFor="contact-phone">Phone number</label>
            <select
              name="countryCode"
              className="country-select"
              defaultValue="+91"
            >
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+971">+971 (UAE)</option>
            </select>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="contact-message">How can we help?</label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              placeholder="Submit Message..."
              required
            ></textarea>
          </div>
          {submitError && <p className="form-error" role="alert">{submitError}</p>}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Transmitting..." : "Submit Form"}
          </button>
        </form>

        {/* Google Login Container 
        <div className="divider">Or</div>
        <div className="google-btn-container">
          <div
            id="g_id_onload"
            data-client_id="101146422829-ct3oi510umpgfhb8vbe1g6aag44gcqqa.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="filled_black"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </div>*/}
      </div>
    </section>
  );
};

export default ContactForm;
