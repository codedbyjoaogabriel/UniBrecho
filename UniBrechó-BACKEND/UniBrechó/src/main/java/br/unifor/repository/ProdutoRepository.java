package br.unifor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.unifor.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByCategoria(String categoria);

    List<Produto> findByDisponivelTrue();

    List<Produto> findByUsuarioId(Long usuarioId);
    
    List<Produto> findByUsuarioEmail(String email);

}