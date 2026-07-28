package br.unifor.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.unifor.dto.LoginRequestDTO;
import br.unifor.dto.LoginResponseDTO;
import br.unifor.dto.UsuarioRequestDTO;
import br.unifor.dto.UsuarioResponseDTO;
import br.unifor.dto.UsuarioUpdateDTO;
import br.unifor.entity.Usuario;
import br.unifor.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO cadastrar(UsuarioRequestDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já cadastrado!");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefone(dto.getTelefone());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        Usuario salvo = usuarioRepository.save(usuario);
        return new UsuarioResponseDTO(salvo.getId(), salvo.getNome(), salvo.getEmail(), salvo.getTelefone());
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail não encontrado no banco!"));

        boolean senhaCombina = passwordEncoder.matches(dto.getSenha(), usuario.getSenha());

        if (!senhaCombina) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha incorreta!");
        }

        return new LoginResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getTelefone(),
                "Login realizado com sucesso");
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public void excluir(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    public UsuarioResponseDTO atualizar(Long id, UsuarioUpdateDTO dto) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não encontrado"));

        if (!usuario.getEmail().equals(dto.getEmail())) {

            usuarioRepository.findByEmail(dto.getEmail())
                    .ifPresent(u -> {
                        throw new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Este e-mail já está em uso.");
                    });
        }

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefone(dto.getTelefone());

        if (dto.getNovaSenha() != null &&
                !dto.getNovaSenha().isBlank()) {

            if (!passwordEncoder.matches(
                    dto.getSenhaAtual(),
                    usuario.getSenha())) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Senha atual incorreta.");
            }

            usuario.setSenha(
                    passwordEncoder.encode(dto.getNovaSenha()));
        }

        Usuario atualizado = usuarioRepository.save(usuario);

        return new UsuarioResponseDTO(
                atualizado.getId(),
                atualizado.getNome(),
                atualizado.getEmail(),
                atualizado.getTelefone());
    }
}