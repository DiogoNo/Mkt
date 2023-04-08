import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/register`, {
                name, email, password,
            });

            if (data?.error) {
                toast.error(data?.error)
            } else {
                toast.success("registrado")
            }

        } catch (error) {
            toast.error("Erro ao cadastrar")
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-4 p-2"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
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

export default Register;
