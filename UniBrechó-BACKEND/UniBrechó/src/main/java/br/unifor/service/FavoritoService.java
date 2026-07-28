package br.unifor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.unifor.dto.FavoritoRequestDTO;
import br.unifor.entity.Favorito;
import br.unifor.entity.Produto;
import br.unifor.entity.Usuario;
import br.unifor.repository.FavoritoRepository;
import br.unifor.repository.ProdutoRepository;
import br.unifor.repository.UsuarioRepository;
import br.unifor.dto.ProdutoResponseDTO;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public void favoritar(FavoritoRequestDTO dto) {

        Long usuarioId = dto.getUsuarioId();
        Long produtoId = dto.getProdutoId();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        if (favoritoRepository.existsByUsuarioIdAndProdutoId(usuarioId, produtoId)) {
            return;
        }

        Favorito favorito = Favorito.builder()
                .usuario(usuario)
                .produto(produto)
                .build();

        favoritoRepository.save(favorito);
    }

    @Transactional
    public void desfavoritar(Long usuarioId, Long produtoId) {
        favoritoRepository.deleteByUsuarioIdAndProdutoId(usuarioId, produtoId);
    }

    public boolean isFavoritado(Long usuarioId, Long produtoId) {
        return favoritoRepository.existsByUsuarioIdAndProdutoId(usuarioId, produtoId);
    }

    public List<ProdutoResponseDTO> listarFavoritosDoUsuario(Long usuarioId) {

        return favoritoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(favorito -> {

                    Produto produto = favorito.getProduto();

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

                })
                .toList();
    }
}
