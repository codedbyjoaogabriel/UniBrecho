package br.unifor.controller;

import br.unifor.dto.ProdutoRequestDTO;
import br.unifor.dto.ProdutoResponseDTO;
import br.unifor.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ProdutoResponseDTO> cadastrar(
            @Valid @RequestBody ProdutoRequestDTO dto) {

        ProdutoResponseDTO produto = service.cadastrar(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(produto);
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProdutoResponseDTO>> listarPorCategoria(
            @PathVariable String categoria) {

        return ResponseEntity.ok(service.listarPorCategoria(categoria));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ProdutoResponseDTO>> listarPorUsuario(
            @PathVariable Long usuarioId) {

        return ResponseEntity.ok(service.listarPorUsuario(usuarioId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/email/{email}")
    public ResponseEntity<List<ProdutoResponseDTO>> listarPorEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(service.listarPorEmail(email));
    }

}