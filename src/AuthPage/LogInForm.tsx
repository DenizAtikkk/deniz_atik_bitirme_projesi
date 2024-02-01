import { useState, useContext } from "react";

import axios from "axios";

import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Link from "./components/Link";

import { Context } from "../functions/context";
import { projectId } from "../functions/constants";
import { PersonObject } from "react-chat-engine-advanced";

interface LogInFormProps {
  onHasNoAccount: () => void;
}

const LogInForm = (props: LogInFormProps) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setUser } = useContext(Context);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = {
      "Project-ID": projectId,
      "User-Name": email,
      "User-Secret": password,
    };

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers,
      })
      .then((r) => {
        if (r.status === 200) {
          const user: PersonObject = {
            first_name: r.data.first_name,
            last_name: r.data.last_name,
            email: email,
            username: email,
            secret: password,
            avatar: r.data.avatar,
            custom_json: {},
            is_online: true,
          };
          setUser(user);
        }
      })
      .catch((e) => console.log("Error", e));
  };

  return (
    <div>
      <div className="form-title"> Hoş Geldiniz Değerli Kullanıcı!</div>

      <div className="form-subtitle">
        Hesabınız yok mu? <Link onClick={() => props.onHasNoAccount()}>Şimdi Kayıt olun</Link>
      </div>

      <form onSubmit={onSubmit}>
        <TextInput
          label="E-posta"
          name="email"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Şifre"
          name="password"
          placeholder=""
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Giriş yap</Button>
      </form>
    </div>
  );
};

export default LogInForm;
