import { ChangeEvent, FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../services/authentication-service";

type Field = {
  value: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
};

const Login: FunctionComponent = () => {
  const history = useHistory();

  const [form, setForm] = useState<Form>({
    username: { value: "" },
    password: { value: "" },
  });

  const [message, setMessage] = useState<string>(
    "Vous êtes déconnecté (Identifiant : EdouardY, Mot de passe : Pokemon)"
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("👉 Tentative de connexion en cours ...");
    AuthenticationService.login(form.username.value, form.password.value).then(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          setMessage("🔐 Identifiant ou mot de passe incorrect.");
          return;
        }

        history.push("/pokemons");
      }
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {/* Form message */}
                {message && (
                  <div className="form-group">
                    <div className="card-panel grey lighten-5">{message}</div>
                  </div>
                )}
                {/* Field username */}
                <div className="form-group">
                  <label htmlFor="username">Identifiant</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                </div>
                {/* Field password */}
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
