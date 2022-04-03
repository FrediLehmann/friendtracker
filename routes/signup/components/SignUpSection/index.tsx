import { useEffect, useState } from "react";
import Form from "./Form";
import Success from "./Success";

export default function SignUpForm() {
  const [registered, setRegistered] = useState(false);

  return registered ? <Success /> : <Form setRegistered={setRegistered} />;
}
