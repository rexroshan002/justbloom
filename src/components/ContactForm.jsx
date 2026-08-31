import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import "./ContactForm.css";

const ContactForm = () => {
  const navigate = useNavigate();
  // New state variables to handle the submission process
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    const formData = new FormData(e.target);

    try {
      // Notice the /ajax/ added to the URL! This tells FormSubmit to stay quiet.
      const response = await fetch(
        "https://formsubmit.co/ajax/roshanrdrheal@gmail.com",
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
        alert("Transmission failed. Please verify your data and try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- SUCCESS SCREEN UI ---
  if (isSubmitted) {
    return (
      <section id="contact" className="contact-section">
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
      <div className="contact-glow"></div>

      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="form-container">
        <h2>Initiate Contact</h2>

        {/* We removed action/method and added onSubmit */}
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="_subject"
            value="New Subspace Transmission (Contact Form)"
          />
          {/* _next is no longer needed because we handle the UI entirely in React */}

          <div className="input-group">
            <input type="text" name="name" placeholder="Name" required />
          </div>
          <div className="input-group">
            {/* type="email" ensures the browser warns them about missing .coms before they can even click submit */}
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <textarea
              name="message"
              rows="4"
              placeholder="Submit Message..."
              required
            ></textarea>
          </div>
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
