import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from "axios"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son requeridos',
                error: true
            })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto agrega minimo 6 caracteres',
                error: true
            })
            return
        }
        setAlerta({})

        try {
            const { data } = await clienteAxios.post(`/usuarios`, { nombre, password, email })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus {' '} <span className="text-slate-700">proyectos</span></h1>

            {msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5 ">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >
                        Nombre
                    </label>
                    <input
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Tu Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                </div>
                <div className="my-5 ">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                </div>
                <div className="my-5 ">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                </div>
                <div className="my-5 ">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2"
                    >
                        Repetir Password
                    </label>
                    <input value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} type="password" name="password2" id="password2" placeholder="Repitir Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
                </div>
                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="w-full bg-sky-700 mb-5 text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Ya tienes una cuenta? Inicia Sesion</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Registrar