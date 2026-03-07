import { useState, useRef, type FormEvent, type ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../../components/neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";
import type { CreateTechnician } from "../../features/technician/technician.types";
import { technicianRepository } from "../../features/technician/technician.repository";
import { cloudinaryService } from "../../services/cloudinary.service";
import { AuthContext } from "../../contexts/AuthContext";

function TechRegister() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {handleLogin} = useContext(AuthContext)

  const darkLabelStyle = { color: "rgba(255, 255, 255, 0.72)" };
  const darkInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: "#0f172a",
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      // Cria preview da imagem
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName(null);
      setPreviewUrl(null);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return; // Previne duplo submit
    
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const profilePictureFile = fileInputRef.current?.files?.[0];

    // Validações
    if (!name || !email || !password) {
      setError("Nome, email e senha são obrigatórios.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      // Upload da foto de perfil (se houver)
      let profilePictureUrl = "";
      if (profilePictureFile) {
        profilePictureUrl = await cloudinaryService.uploadAvatar(profilePictureFile);
        if (!profilePictureUrl) {
          setError("Erro ao fazer upload da foto. Tente novamente.");
          setIsLoading(false);
          return;
        }
      }

      // Monta o objeto para envio
      const technicianData: CreateTechnician = {
        name,
        email,
        password,
        ...(phone && { phone }),
        ...(address && { address }),
        ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
      };

      // Envia a requisição de cadastro
      await technicianRepository.create(technicianData);
      
      // Loga com os dados cadastrados
      await handleLogin({email: technicianData.email, password: technicianData.password })
      navigate("/technician/dashboard");

    } catch (err: any) {
      console.error("Erro ao cadastrar técnico:", err);
      if (err.response?.status === 409) {
        setError("Este email já está cadastrado.");
      } else {
        setError("Erro ao cadastrar técnico. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f7f9fc 0%, #eef2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-6xl rounded-[32px] bg-white/80 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="p-8 lg:p-12 flex flex-col justify-between bg-white/80">
            <div>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.25em] text-slate-500 oxanium-400">
                TechRegister
              </span>
              <h1 className="mt-6 text-3xl lg:text-4xl michroma-700 text-slate-900">
                Cadastro de Técnico com identidade futurista e empresarial.
              </h1>
              <p className="mt-4 text-sm text-slate-500 oxanium-400 leading-relaxed">
                Estruture o onboarding com informações completas, mantendo o visual limpo, arredondado e alinhado à tipografia do projeto.
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  { title: "Fluxo inteligente", desc: "Campos distribuídos para rápida leitura e preenchimento." },
                  { title: "Consistência visual", desc: "Botões e inputs suaves alinhados com a identidade Neogen." },
                  { title: "Dados completos", desc: "Informações essenciais para controle técnico." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                    <p className="text-sm michroma-400 text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500 oxanium-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["UI suave", "Tipografia forte", "ERP ready"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-500 oxanium-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b0f1f] text-white">
            <div className="mb-8">
              <h2 className="text-2xl michroma-700">Crie a conta técnica</h2>
              <p className="mt-2 text-sm text-white/70 oxanium-400">
                Complete os dados e integre o colaborador ao fluxo de serviços.
              </p>
            </div>

            <form className="tech-register-form space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-3 text-red-200 text-sm oxanium-400">
                  {error}
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Nome Completo"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="João Silva"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="Telefone"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(11) 98765-4321"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <NeogenInput
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="joao@example.com"
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Senha"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="Confirmar Senha"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repita a senha"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <NeogenTextarea
                label="Endereço"
                id="address"
                name="address"
                placeholder="Rua, número, complemento, cidade, estado"
                rows={3}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
              />

              {/* File Input Estilizado */}
              <div>
                <label style={darkLabelStyle} className="block mb-2 text-sm oxanium-400">
                  Foto de perfil
                </label>
                <div className="flex items-center gap-4">
                  {/* Preview da imagem */}
                  {previewUrl ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 flex-shrink-0">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Botão customizado + input hidden */}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={handleFileButtonClick}
                      className="w-full px-4 py-3 rounded-xl text-sm oxanium-400 transition-all duration-200 hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.92)",
                        color: "#0f172a",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {selectedFileName ? (
                        <span className="truncate block">{selectedFileName}</span>
                      ) : (
                        <span className="text-slate-500">Clique para selecionar uma imagem...</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <NeogenButton 
                type="submit" 
                style={{ 
                  backgroundColor: "#111827",
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer"
                }}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar Técnico"}
              </NeogenButton>
            </form>

            <p className="text-center text-xs mt-6 text-white/70 oxanium-400">
              Já possui uma conta?{" "}
              <a href="/login" className="text-white hover:underline">
                Faça login aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechRegister;
