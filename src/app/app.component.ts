import { compileClassDebugInfo } from '@angular/compiler';
import { Component, input, Input } from '@angular/core';
import { InputType } from 'zlib';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { ItemComponent } from './item/item.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'TODOapp'; arrayDeTarefas: Tarefa[] = [];
    apiURL: string;
    constructor(private http: HttpClient) {
        this.apiURL = 'https://apitarefasgustavo227091-6051889d035a.herokuapp.com';
        this.READ_tarefas();
    }


    CREATE_tarefa(descricaoNovaTarefa: string) {
        var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
        this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(resultado => {
            console.log(resultado);
            this.READ_tarefas();
        });
    }
    READ_tarefas() { this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(resultado => this.arrayDeTarefas = resultado); }

    DELETE_tarefa(tarefaAserRemovida: Tarefa) {
        var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida); var id = this.arrayDeTarefas[indice]._id;
        this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(resultado => {
            console.log(resultado);
            this.READ_tarefas();
        });
    }

    UPDATE_tarefa(tarefaAserModificada: Tarefa) {
        var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada); var id = this.arrayDeTarefas[indice]._id;
        this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe(resultado => {
            console.log(resultado);
            this.READ_tarefas();
        });
    }


}


