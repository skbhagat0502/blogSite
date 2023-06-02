import { useState } from "react";
import classes from "../css/Contact.module.css";
import Button from "../UI/Button";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch("/send-email", requestOptions)
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          setIsSubmitted(true);
        } else {
          console.error("An error occurred while sending the email.");
        }
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
      });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className={classes["form-container"]}>
      <form method="post" onSubmit={handleSubmit}>
        <div className={classes["form-field"]}>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={classes["form-field"]}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={classes["form-field"]}>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className={classes["form-field"]}>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={classes["form-actions"]}>
          <Button type="submit" className="dark" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>

      {isSubmitted && (
        <div className={classes["success-message"]}>
          Message sent successfully!
        </div>
      )}
    </div>
  );
}

export default Contact;
