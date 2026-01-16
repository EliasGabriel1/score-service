import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConexaoAdapter } from 'src/conexao/conexao.adapter';


@Injectable()
export class BoletoAdapter {
    constructor(private readonly conexaoAdapter: ConexaoAdapter) { }
    
    async listarBoletos(request) {
        return await this.conexaoAdapter.Get<any>(process.env.SERVICE_BOLETO_URL ?? '', { params: request });
    }
}