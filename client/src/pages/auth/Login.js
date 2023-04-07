import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
                email, password,
            });

            if (data?.error) {
                toast.error(data?.error)
            } else {
                toast.success("Logado")
            }

        } catch (error) {
            toast.error("Erro ao Logar")
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control mb-4 p-2"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-4 p-2"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
