import { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import "./login.css";
=======
import PersonModal from "../components/modals/PersonModal";
>>>>>>> feat/pagina-perfil-pivo

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
<<<<<<< HEAD
=======
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
>>>>>>> feat/pagina-perfil-pivo

  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
  }

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        cpf,
        senha,
      });

      console.log(response.data);
      alert("Login realizado com sucesso!");

<<<<<<< HEAD
      // Exemplo:
      // localStorage.setItem("token", response.data.token);
      // navigate("/home");

=======
  
>>>>>>> feat/pagina-perfil-pivo
    } catch (error) {
      console.error(error);
      alert("CPF ou senha inválidos.");
    }
  }

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">

        {/* Lado esquerdo */}
        <div className="col-lg-3 d-none d-lg-block esquerda"></div>

        {/* Centro */}
        <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center fundo">

          <div className="login-box">

            <div className="text-center mb-4">
              <img
<<<<<<< HEAD
                src="/fundacentro.png"
=======
                src="./fundacentro.png"
>>>>>>> feat/pagina-perfil-pivo
                alt="Fundacentro"
                className="logo img-fluid"
              />

              <h1 className="mt-3">Bem-vindo!</h1>

              <p>Faça login para acessar o Sistema de Gerenciamento de EPIs.</p>
            </div>

            <form onSubmit={fazerLogin}>

              <div className="mb-3">
                <label className="form-label">CPF</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="000.000.000-00"
                  value={cpf}
                  maxLength={14}
                  required
                  onChange={(e) => setCpf(formatarCPF(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Senha</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Digite sua senha"
                  value={senha}
                  required
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <button
                type="submit"
<<<<<<< HEAD
                className="btn btn-success w-100"
=======
                className="btn btn-success w-100 mb-3"
>>>>>>> feat/pagina-perfil-pivo
              >
                Entrar
              </button>

            </form>

<<<<<<< HEAD
            <div className="text-center mt-3">
              <a href="#">Esqueci minha senha</a>
=======
            {/* Ações adicionais: Cadastro e Esqueci a Senha */}
            <div className="text-center mt-3 d-flex flex-column gap-2">
              <button 
                type="button" 
                className="btn btn-outline-primary w-100"
                onClick={() => setIsRegisterOpen(true)}
              >
                Criar uma conta
              </button>

              <a href="#" className="mt-2">Esqueci minha senha</a>
>>>>>>> feat/pagina-perfil-pivo
            </div>

          </div>

        </div>

        {/* Lado direito */}
        <div className="col-lg-3 d-none d-lg-block direita"></div>

      </div>
<<<<<<< HEAD
=======

      {/* Modal para cadastro de novos usuários */}
      <PersonModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        person={null}
        onSuccess={() => {
          alert("Cadastro realizado com sucesso! Faça seu login.");
        }}
      />
>>>>>>> feat/pagina-perfil-pivo
    </div>
  );
}