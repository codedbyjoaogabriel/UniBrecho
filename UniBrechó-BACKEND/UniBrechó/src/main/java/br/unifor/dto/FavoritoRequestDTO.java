package br.unifor.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoritoRequestDTO {

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    @NotNull(message = "O ID do produto é obrigatório")
    private Long produtoId;

    public Long getUsuarioId() {
        return this.usuarioId;
    }

    public Long getProdutoId() {
        return this.produtoId;
    }

}