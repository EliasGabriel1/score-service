import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ConexaoAdapter {
    constructor(private readonly httpClient: HttpService) { }

    async Get<T>(url: string, opcoes?: any): Promise<T | null> {
        try {
            const resposta = await this.httpClient.get<T>(url, opcoes).toPromise();
            return resposta?.data ?? null;
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            throw erro;
        }
    }

    async Post<T>(url: string, dados: any, opcoes?: any): Promise<T | null> {
        try {
            const resposta = await this.httpClient.post<T>(url, dados, opcoes).toPromise();
            return resposta?.data ?? null;
        } catch (erro) {
            console.error('Erro na requisição POST:', erro);
            throw erro;
        }
    }

    async Put<T>(url: string, dados: any, opcoes?: any): Promise<T | null> {
        try {
            const resposta = await this.httpClient.put<T>(url, dados, opcoes).toPromise();
            return resposta?.data ?? null;
        } catch (erro) {
            console.error('Erro na requisição PUT:', erro);
            throw erro;
        }
    }

    async Delete<T>(url: string, opcoes?: any): Promise<T | null> {
        try {
            const resposta = await this.httpClient.delete<T>(url, opcoes).toPromise();
            return resposta?.data ?? null;
        } catch (erro) {
            console.error('Erro na requisição DELETE:', erro);
            throw erro;
        }
    }
}