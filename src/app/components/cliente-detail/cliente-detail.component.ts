import { ClienteService } from './../../services/cliente.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/cliente';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css'
})
export class ClienteDetailComponent {
  cliente?:Cliente
  clienteForm: FormGroup = new FormGroup({})

  constructor(
    private route: ActivatedRoute,
    private clienteService:ClienteService,
    private formBuilder: FormBuilder){
    this.getClientById()
  }

  id?:string;
  getClientById(){
    this.id = this.route.snapshot.paramMap.get('id') ?? ''

    this.clienteService.getById(this.id).subscribe((clienteResponse) => (this.cliente = clienteResponse))
    this.clienteForm = this.formBuilder.group({

      nome: [this.cliente?.nome],
      telefone: [this.cliente?.telefone],
      id: [this.cliente?.id]

    })
  }

  update():void{
    if(this.clienteForm.valid){
      const clienteAlterado:Cliente = {
        nome: this.clienteForm.value.nome,
        telefone: this.clienteForm.value.telefone,
        id: this.clienteForm.value.id
      }
      this.clienteService.atualizar(clienteAlterado).subscribe()
      alert('Alterado com sucesso!')

  }
  }
}
