package br.unifor.service;

import br.unifor.dto.ProdutoRequestDTO;
import br.unifor.dto.ProdutoResponseDTO;
import br.unifor.entity.Produto;
import br.unifor.entity.Usuario;
import br.unifor.repository.ProdutoRepository;
import br.unifor.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public ProdutoService(
            ProdutoRepository produtoRepository,
            UsuarioRepository usuarioRepository) {

        this.produtoRepository = produtoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        Produto produto = new Produto();

        produto.setTitulo(dto.getTitulo());
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setTipo(dto.getTipo());
        produto.setCategoria(dto.getCategoria());
        produto.setImagem(dto.getImagem());
        produto.setDisponivel(true);
        produto.setUsuario(usuario);

        Produto salvo = produtoRepository.save(produto);

        return converter(salvo);
    }

    public List<ProdutoResponseDTO> listar() {

        return produtoRepository.findAll()
                .stream()
                .map(this::converter)
                .toList();
    }

    public ProdutoResponseDTO buscarPorId(Long id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));

        return converter(produto);
    }

    public List<ProdutoResponseDTO> listarPorCategoria(String categoria) {

        return produtoRepository.findByCategoria(categoria)
                .stream()
                .map(this::converter)
                .toList();
    }

    public List<ProdutoResponseDTO> listarPorUsuario(Long usuarioId) {

        return produtoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::converter)
                .toList();
    }

    public void excluir(Long id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));

        produtoRepository.delete(produto);
    }

    private ProdutoResponseDTO converter(Produto produto) {

        ProdutoResponseDTO dto = new ProdutoResponseDTO();

        dto.setId(produto.getId());
        dto.setTitulo(produto.getTitulo());
        dto.setDescricao(produto.getDescricao());
        dto.setPreco(produto.getPreco());
        dto.setTipo(produto.getTipo());
        dto.setCategoria(produto.getCategoria());
        dto.setImagem(produto.getImagem());
        dto.setDisponivel(produto.getDisponivel());

        dto.setUsuarioId(produto.getUsuario().getId());
        dto.setNomeUsuario(produto.getUsuario().getNome());
        dto.setTelefoneUsuario(produto.getUsuario().getTelefone());

        return dto;
    }

    public List<ProdutoResponseDTO> listarPorEmail(String email) {
        return produtoRepository.findByUsuarioEmail(email)
                .stream()
                .map(this::converter)
                .toList();
    }
}