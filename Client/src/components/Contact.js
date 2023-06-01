import classes from "../css/Contact.module.css";
import Button from "../UI/Button";
function Contact() {
  return (
    <div className={classes["form-container"]}>
      <form>
        <div className={classes["form-field"]}>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your Name"
          />
        </div>

        <div className={classes["form-field"]}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your Email"
          />
        </div>

        <div className={classes["form-field"]}>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="Subject"
          />
        </div>

        <div className={classes["form-field"]}>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Message"
          ></textarea>
        </div>

        <div className={classes["form-actions"]}>
          <Button type="submit" className="dark">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Contact;
