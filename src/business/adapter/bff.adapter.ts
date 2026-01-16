import { Injectable } from '@nestjs/common';
import { ConexaoAdapter } from 'src/conexao/conexao.adapter';


@Injectable()
export class BffAdapter {
    constructor(private readonly conexaoAdapter: ConexaoAdapter) { }
    
    async dadosFinanceiroUsuario(request) {
        return await this.conexaoAdapter.Get<any>(process.env.BFF_URL ?? '', { params: request });
    }
}