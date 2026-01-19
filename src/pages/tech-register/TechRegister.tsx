import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../../components/neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";

function TechRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl mb-2 michroma-700" style={{ color: '#1a1a1a' }}>
            Cadastro de Técnico
          </h1>
          <p className="text-sm oxanium-400" style={{ color: '#666666' }}>
            Preencha os dados para criar uma nova conta de técnico
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <NeogenInput label="Nome Completo" type="text" id="name" name="name" placeholder="João Silva"/>

          <NeogenInput label="Email" type="email" id="email" name="email" placeholder="joao@example.com"/>

          <NeogenInput label="Senha" type="password" id="password" name="password" placeholder="Mínimo 8 caracteres"/>

          <NeogenInput label="Confirmar Senha" type="password" id="confirmPassword" name="confirmPassword" placeholder="Repita a senha"/>

          <NeogenInput label="Telefone" type="tel" id="phone" name="phone" placeholder="(11) 98765-4321"/>

          <NeogenTextarea label="Endereço" id="address" name="address" placeholder="Rua, número, complemento, cidade, estado" rows={3}/>

          <NeogenInput label="URL da Foto de Perfil (opcional)" type="url" id="profilePicture" name="profilePicture" placeholder="https://example.com/image.jpg"/>

          {/* Submit Button */}
          <NeogenButton type="submit" style={{backgroundColor: '#0e0e0e'}}>
            Cadastrar Técnico
          </NeogenButton>
        </form>

        {/* Footer Text */}
        <p className="text-center text-xs mt-6" style={{ color: '#666666' }}>
          Já possui uma conta?{' '}
          <a href="#login" className="hover:underline" style={{ color: '#007bff' }}>
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}

export default TechRegister;