import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

// this is a form used to send emails via emailjs,currently the emails are sent to me
// I couldn't for the love of google find a way to automatically reply to users
//the value parameter of message contains the route to get to the password reset
//this essentially means i have to reply to each mail to send the link to them...
//I'm sorry

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_jax54es', 'template_ttoppbi', form.current, 'GlmuU6i0hzeL3XFsX')
      .then((result) => {
          // console.log(result.text);
          toast.success("An email was sent, check your Inbox!");
          form.current.reset();
      }, (error) => {
          // console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}  style={{display: "inline",position: "relative", left: "20%"}}>
      <input type="text" name="name" value="Mega Reset Password - use the link in the message to go to the reset page" readOnly style={{display: "none"}}/>
      <label>Email:&nbsp;&nbsp;</label>
      <input type="email" name="email" className='mt-2 col-3'/>
      <textarea name="message" value="/reset-password" readOnly style={{display: "none"}}/>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <input type="submit" value="Send" className='mt-2 col-3'/>
    </form>
  );
};