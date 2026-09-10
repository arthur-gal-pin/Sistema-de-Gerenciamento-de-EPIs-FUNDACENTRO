import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  // Controle do pop-up
  const [mostrarPopup, setMostrarPopup] = useState(false);

  // Campos da solicitação
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpfFuncionario, setCpfFuncionario] = useState("");
  const [emailFuncionario, setEmailFuncionario] = useState("");
  const [descricao, setDescricao] = useState("");

  // Controle do envio
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

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
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          cpf,
          senha,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/home");

    } catch (error) {
      console.error(error);

      alert("CPF ou senha inválidos.");
    }
  }

  async function enviarSolicitacao(e) {
    e.preventDefault();

    if (!nomeCompleto.trim()) {
      alert("Informe o nome completo.");
      return;
    }

    if (!cpfFuncionario.trim()) {
      alert("Informe o CPF.");
      return;
    }

    if (!emailFuncionario.trim()) {
      alert("Informe o e-mail.");
      return;
    }

    if (!descricao.trim()) {
      alert("Informe a descrição.");
      return;
    }

    try {
      setEnviando(true);

      await axios.post(
        "http://localhost:3000/solicitacao-esqueci-senha",
        {
          nomeCompleto,
          cpf: cpfFuncionario,
          email: emailFuncionario,
          descricao,
        }
      );

      alert(
        "Solicitação enviada com sucesso ao coordenador!"
      );

      setNomeCompleto("");
      setCpfFuncionario("");
      setEmailFuncionario("");
      setDescricao("");

      setMostrarPopup(false);

    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível enviar a solicitação. Tente novamente."
      );

    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="container-fluid p-0">

      <div className="row g-0 min-vh-100">

        {/* LADO ESQUERDO */}
        <div className="col-lg-3 d-none d-lg-block esquerda"></div>


        {/* CENTRO */}
        <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center fundo">

          <div className="login-box">

            {/* LOGO E TÍTULO */}
            <div className="text-center mb-4">

              <img
                src="/login/fundacentro.png"
                alt="Fundacentro"
                className="logo img-fluid"
              />

              <h1 className="mt-3">
                Bem-vindo!
              </h1>

              <p>
                Faça login para acessar o Sistema de Gerenciamento de EPIs.
              </p>

            </div>


            {/* LOGIN */}
            <form onSubmit={fazerLogin}>

              {/* CPF */}
              <div className="mb-3">

                <label className="form-label">
                  CPF
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="000.000.000-00"
                  value={cpf}
                  maxLength={14}
                  required
                  onChange={(e) =>
                    setCpf(formatarCPF(e.target.value))
                  }
                />

              </div>


              {/* SENHA */}
              <div className="mb-4">

                <label className="form-label">
                  Senha
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Digite sua senha"
                  value={senha}
                  required
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                />

              </div>


              {/* ENTRAR */}
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Entrar
              </button>

            </form>


            {/* ESQUECI MINHA SENHA */}
            <div
              className="text-center mt-3"
              style={{
                width: "100%",
              }}
            >

              <button
                type="button"
                onClick={() => setMostrarPopup(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  margin: 0,

                  color: "#198754",

                  fontWeight: "700",
                  fontSize: "16px",

                  cursor: "pointer",
                }}
              >
                Esqueci minha senha
              </button>

            </div>

          </div>

        </div>


        {/* LADO DIREITO */}
        <div className="col-lg-3 d-none d-lg-block direita"></div>

      </div>


      {/* =====================================================
          POP-UP ESQUECI MINHA SENHA
          ===================================================== */}

      {mostrarPopup && (

        <div
          onClick={() => setMostrarPopup(false)}
          style={{
            position: "fixed",
            inset: 0,

            width: "100vw",
            height: "100vh",

            backgroundColor: "rgba(0, 0, 0, 0.92)",

            zIndex: 99999,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            padding: "20px",

            boxSizing: "border-box",

            overflow: "hidden",
          }}
        >

          {/* CARD PRINCIPAL */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "760px",

              maxHeight: "calc(100vh - 40px)",

              backgroundColor: "#ffffff",

              borderRadius: "16px",

              boxSizing: "border-box",

              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.50)",

              overflowY: "auto",
              overflowX: "hidden",
            }}
          >

            {/* CABEÇALHO */}
            <div
              style={{
                width: "100%",

                padding: "28px 35px 10px 35px",

                boxSizing: "border-box",

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                gap: "20px",
              }}
            >

              <h2
                style={{
                  margin: 0,
                  padding: 0,

                  color: "#198754",

                  fontSize: "32px",
                  fontWeight: "700",

                  lineHeight: "1.2",
                }}
              >
                Esqueci minha senha
              </h2>


              {/* FECHAR */}
              <button
                type="button"
                onClick={() => setMostrarPopup(false)}
                style={{
                  width: "42px",
                  height: "42px",

                  minWidth: "42px",

                  padding: 0,
                  margin: 0,

                  border: "none",

                  background: "transparent",

                  color: "#198754",

                  fontSize: "36px",
                  fontWeight: "700",

                  lineHeight: "1",

                  cursor: "pointer",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>

            </div>


            {/* TEXTO */}
            <div
              style={{
                padding: "0 35px 25px 35px",

                boxSizing: "border-box",
              }}
            >

              <p
                style={{
                  margin: 0,

                  color: "#555555",

                  fontSize: "16px",

                  lineHeight: "1.4",
                }}
              >
                Preencha os dados abaixo para solicitar a alteração da sua senha ao coordenador responsável.
              </p>

            </div>


            {/* FORMULÁRIO */}
            <div
              style={{
                padding: "0 35px 35px 35px",

                boxSizing: "border-box",
              }}
            >

              <form onSubmit={enviarSolicitacao}>


                {/* NOME COMPLETO */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "18px",
                  }}
                >

                  <label
                    style={{
                      display: "block",

                      marginBottom: "7px",

                      color: "#198754",

                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Nome completo do funcionário
                  </label>


                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={nomeCompleto}
                    required
                    onChange={(e) =>
                      setNomeCompleto(e.target.value)
                    }
                    style={{
                      display: "block",

                      width: "100%",
                      height: "52px",

                      padding: "0 15px",

                      boxSizing: "border-box",

                      border: "1px solid #cccccc",
                      borderRadius: "8px",

                      backgroundColor: "#ffffff",

                      color: "#333333",

                      fontSize: "16px",

                      outline: "none",
                    }}
                  />

                </div>


                {/* CPF */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "18px",
                  }}
                >

                  <label
                    style={{
                      display: "block",

                      marginBottom: "7px",

                      color: "#198754",

                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    CPF
                  </label>


                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpfFuncionario}
                    maxLength={14}
                    required
                    onChange={(e) =>
                      setCpfFuncionario(
                        formatarCPF(e.target.value)
                      )
                    }
                    style={{
                      display: "block",

                      width: "100%",
                      height: "52px",

                      padding: "0 15px",

                      boxSizing: "border-box",

                      border: "1px solid #cccccc",
                      borderRadius: "8px",

                      backgroundColor: "#ffffff",

                      color: "#333333",

                      fontSize: "16px",

                      outline: "none",
                    }}
                  />

                </div>


                {/* E-MAIL */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "18px",
                  }}
                >

                  <label
                    style={{
                      display: "block",

                      marginBottom: "7px",

                      color: "#198754",

                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    E-mail do funcionário
                  </label>


                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={emailFuncionario}
                    required
                    onChange={(e) =>
                      setEmailFuncionario(e.target.value)
                    }
                    style={{
                      display: "block",

                      width: "100%",
                      height: "52px",

                      padding: "0 15px",

                      boxSizing: "border-box",

                      border: "1px solid #cccccc",
                      borderRadius: "8px",

                      backgroundColor: "#ffffff",

                      color: "#333333",

                      fontSize: "16px",

                      outline: "none",
                    }}
                  />

                </div>


                {/* DESCRIÇÃO */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                >

                  <label
                    style={{
                      display: "block",

                      marginBottom: "7px",

                      color: "#198754",

                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Descrição
                  </label>


                  <textarea
                    placeholder="Descreva o motivo da solicitação"
                    value={descricao}
                    required
                    onChange={(e) =>
                      setDescricao(e.target.value)
                    }
                    style={{
                      display: "block",

                      width: "100%",

                      height: "52px",
                      minHeight: "52px",
                      maxHeight: "52px",

                      padding: "0 15px",

                      boxSizing: "border-box",

                      border: "1px solid #cccccc",
                      borderRadius: "8px",

                      backgroundColor: "#ffffff",

                      color: "#333333",

                      fontSize: "16px",

                      fontFamily: "inherit",

                      lineHeight: "52px",

                      outline: "none",

                      resize: "none",

                      overflow: "hidden",
                    }}
                  />

                </div>


                {/* ENVIAR */}
                <button
                  type="submit"
                  disabled={enviando}
                  style={{
                    width: "100%",
                    height: "52px",

                    padding: 0,
                    margin: 0,

                    border: "none",
                    borderRadius: "8px",

                    backgroundColor: "#198754",

                    color: "#ffffff",

                    fontSize: "17px",
                    fontWeight: "700",

                    cursor: enviando
                      ? "not-allowed"
                      : "pointer",

                    opacity: enviando ? 0.7 : 1,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {enviando
                    ? "Enviando..."
                    : "Enviar ao coordenador"}
                </button>

              </form>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}