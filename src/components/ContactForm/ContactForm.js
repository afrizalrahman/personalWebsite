import React, { useState } from "react";

import { Form } from "react-bootstrap";
import { Input, TextArea, Button } from "../Core";
import { Text } from "../../components/Core";

const ContactForm = ({ theme = "dark", ...rest }) => {
  const [submitdisable, setsubmitdisable] = useState(false)
  const [responseMsg, setresponseMsg] = useState('')

  const sendmail = async event => {
    event.preventDefault()

    setsubmitdisable(true)
    const res = await fetch('/api/sendmail', {
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        subject: event.target.subject.value,
        message: event.target.message.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    setsubmitdisable(false)
    setresponseMsg(result.message)
    setTimeout(() => {
      setresponseMsg('')
    }, 3000);
    
    // result.user => 'Ada Lovelace'
  }

  return (
    <>
      <Form
        name="contact"
        onSubmit={sendmail}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        {...rest}
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <input type="hidden" name="form-name" value="contact" />
        <div className="mt-4">
          <Input type="text" placeholder="Your name" required name="name" required/>
        </div>
        <div className="mt-4">
          <Input type="email" placeholder="Email address" required name="email" required/>
        </div>
        <div className="mt-4">
          <Input type="text" placeholder="Subject" required name="subject" required/>
        </div>
        <div className="mt-4 ">
          <TextArea
            rows={4}
            placeholder="Write your message"
            required
            name="message"
            maxlength="300"
          />
        </div>
        <div className="mt-4 mt-lg-5">
          <Button arrowRight variant="primary" type="submit" disabled={submitdisable}>
            SEND
          </Button>
        </div>
        <div className="mt-4">
          <Text color="light" mb="2.75rem">
            {responseMsg}
          </Text>
        </div>
      </Form>
    </>
  );
};

export default ContactForm;
