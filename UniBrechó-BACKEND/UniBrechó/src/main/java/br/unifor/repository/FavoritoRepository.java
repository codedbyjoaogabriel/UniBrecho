package br.unifor.repository;

import br.unifor.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, String> {

    List<Favorito> findByUsuarioId(Long usuarioId);

    Optional<Favorito> findByUsuarioIdAndProdutoId(Long usuarioId, Long produtoId);

    boolean existsByUsuarioIdAndProdutoId(Long usuarioId, Long produtoId);

    void deleteByUsuarioIdAndProdutoId(Long usuarioId, Long produtoId);
}