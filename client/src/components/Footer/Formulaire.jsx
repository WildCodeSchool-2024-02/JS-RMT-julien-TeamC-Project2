import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./footer.css";

function Formulaire() {
  const form = useRef();
  const [message, setMessage] = useState({ msg: null, success: true });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then((result) => {
        if (result.status === 200) {
          setMessage({ msg: "Votre e-mail à bien été envoyé", success: true });
        } else {
          setMessage({
            msg: "Your message has been sent!",
            success: false,
          });
        }
      })
      .catch(() => {
        setMessage({
          msg: "Your message could not be sent",
          success: false,
        });
      })
      .finally(() => {
        form.current.reset();
        setTimeout(() => {
          setMessage({ msg: null, success: true });
        }, 6000);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="formulaire">
      <label>
        Name
        <input type="text" name="user_name" required />
      </label>
      <label>
        Email
        <input type="text" name="user_email" required />
      </label>
      <label>
        Message
        <textarea name="message" required />
      </label>
      <button type="submit">Submit</button>
      {message.msg && (
        <p className={message.success ? "send-success" : "send-error"}>
          {message.msg}
        </p>
      )}
    </form>
  );
}
export default Formulaire;