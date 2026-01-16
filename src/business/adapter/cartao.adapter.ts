import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConexaoAdapter } from 'src/conexao/conexao.adapter';


@Injectable()
export class CartaoAdapter {
    constructor(private readonly conexaoAdapter: ConexaoAdapter) { }

    async listarCartoes(request) {
        return await this.conexaoAdapter.Get<any>(process.env.SERVICE_CARD_URL ?? '', { params: request });
    }
}