package br.unifor.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoResponseDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private BigDecimal preco;
    private String tipo;
    private String categoria;
    private String imagem;
    private Boolean disponivel;

    private Long usuarioId;
    private String nomeUsuario;
    private String telefoneUsuario;
}