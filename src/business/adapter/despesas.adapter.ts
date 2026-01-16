import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConexaoAdapter } from 'src/conexao/conexao.adapter';


@Injectable()
export class DespesasAdapter {
    constructor(private readonly conexaoAdapter: ConexaoAdapter) { }
    
    async listarDespesas(request) {
        return await this.conexaoAdapter.Get<any>(process.env.SERVICE_DESPESAS_URL ?? '', { params: request });
    }
}