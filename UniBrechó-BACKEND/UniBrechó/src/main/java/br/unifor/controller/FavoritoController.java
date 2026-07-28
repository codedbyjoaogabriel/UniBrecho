package br.unifor.controller;

import br.unifor.dto.FavoritoRequestDTO;
import br.unifor.service.FavoritoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.unifor.dto.ProdutoResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin(origins = "*")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    @PostMapping
    public ResponseEntity<Void> favoritar(@RequestBody @Valid FavoritoRequestDTO dto) {
        favoritoService.favoritar(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> desfavoritar(
            @RequestParam Long usuarioId,
            @RequestParam Long produtoId) {
        favoritoService.desfavoritar(usuarioId, produtoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> isFavoritado(@RequestParam Long usuarioId, @RequestParam Long produtoId) {
        boolean status = favoritoService.isFavoritado(usuarioId, produtoId);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ProdutoResponseDTO>> listarFavoritos(
            @PathVariable Long usuarioId) {

        return ResponseEntity.ok(
                favoritoService.listarFavoritosDoUsuario(usuarioId));
    }
}