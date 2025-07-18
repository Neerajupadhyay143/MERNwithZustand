import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { ToggleTheme } from '../../../../store/useStore';

function ContactUs() {
    const { themes } = ToggleTheme();
    const { base, btn, input } = getThemeComponents(themes);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_mlqbem5',     // 🔁 Replace this
            'template_auizpqm',    // 🔁 Replace this
            form.current,
            'q9MSMiWtlz-9nSLAF'         // 🔁 Replace this (public key)
        ).then(
            (result) => {
                alert('Message sent successfully!');
            },
            (error) => {
                alert('Failed to send message. Please try again.');
            }
        );
    };

    return (
        <div className=" mt-5 d-flex justify-content-center">
            <div className=" p-4" style={{ maxWidth: '600px', width: '100%', background: base.mainBackground, }}>
                <h2 style={{ color: base.txtColor }} className="mb-4 text-center">Contact Us</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="mb-3">
                        <label style={{ color: base.subTxt }} className="form-label">Your Name</label>
                        <input style={{ color: themes === "Dark" ? "white" : "black", background: themes === "Dark" ? "" : "transparent" }} type="text" name="user_name" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label style={{ color: base.subTxt }} className="form-label">Your Email</label>
                        <input style={{ color: themes === "Dark" ? "white" : "black", background: themes === "Dark" ? "" : "transparent" }} type="email" name="user_email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label style={{ color: base.subTxt }} className="form-label">Your Message</label>
                        <textarea style={{ color: themes === "Dark" ? "white" : "black", background: themes === "Dark" ? "" : "transparent" }} name="message" rows="4" className="form-control" required />
                    </div>
                    <button style={{
                        background: btn.backgroundcolor,
                        color: btn.txtColor
                    }} type="submit" className="btn p-3 w-100">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
