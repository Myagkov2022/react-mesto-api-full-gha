import React, {useState} from "react";

    const Login = ({handleAuthorize}) => {
        const [formValue, setFormValue] = useState({
            email: '',
            password: ''
        })


        const handleChange = (e) => {
            const {name, value} = e.target;

            setFormValue({
                ...formValue,
                [name]: value
            });
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            handleAuthorize(formValue.email,formValue.password)
        }

    return (
        <div className="auth">
            <div className="auth__container">
                <form name="login" className="auth__form" id="login-form" noValidate onSubmit={handleSubmit}>
                    <h2 className="auth__title">Вход</h2>
                    <input name="email" className="auth__input" id="email-input" type="text" placeholder="Email" value={formValue.email} onChange={handleChange} />
                    <input name="password" className="auth__input" id="password-input" type="password" placeholder="Password" value={formValue.password} onChange={handleChange} />
                    <button type="submit" className="auth__button-regist" id="button-login">Войти</button>
                </form>
            </div>
        </div>
    )
}
export default Login;