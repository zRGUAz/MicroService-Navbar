import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Fornecedor } from '../../interfaces/fornecedor';
import { FornecedorService } from '../../services/fornecedor.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent {
  fornecedores:Fornecedor[] = [];
  fornecedorIdRemover: string = '';
  fornecedorIdEditar: string = '';
  fornecedorForm: FormGroup = new FormGroup({});
  fornecedorFormEditar: FormGroup = new FormGroup({});

  constructor(private fornecedorService:FornecedorService, private formbuilder: FormBuilder) {
  this.fornecedorForm = this.formbuilder.group({
    nome: ['', Validators.required],
    endereco: ['', Validators.required],
    telefone: ['', Validators.required]
  })

  this.fornecedorFormEditar = this.formbuilder.group({
    nome: ['', Validators.required],
    endereco: ['', Validators.required],
    telefone: ['', Validators.required]
  })
 }

 generateRandomString(length: number): string  {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
 }

 inserir(){
  if(this.fornecedorForm.valid){
    const fornecedorNovo:Fornecedor = {
      nome: this.fornecedorForm.value.nome,
      endereco: this.fornecedorForm.value.endereco,
      telefone: this.fornecedorForm.value.telefone,
      id: this.generateRandomString(6)
    }
    this.fornecedorForm.reset()
    this.fornecedores.push(fornecedorNovo)
    this.fornecedorService.adicionar(fornecedorNovo).subscribe()
    alert('Fornecedor cadastrado com sucesso!')

  }
 }

 listar():void{
    this.fornecedorService.listar().subscribe((listClient) => (this.fornecedores = listClient))
 }

 ngOnInit():void{
   this.listar();
 }

 remover() {
  if (this.fornecedores.find(fornecedor => fornecedor.id === this.fornecedorIdRemover)) {
    this.fornecedorService.remover(this.fornecedorIdRemover).subscribe(() => {
      this.listar();
      alert('Fornecedor removido com sucesso!');
    });
  } else {
    alert('Por favor, forneça um ID válido para remoção.');
  }
}

editar() {
  const fornecedor = this.fornecedores.find(f => f.id === this.fornecedorIdEditar);
  if (fornecedor) {
    fornecedor.nome = this.fornecedorFormEditar.value.nome;
    fornecedor.endereco = this.fornecedorFormEditar.value.endereco;
    fornecedor.telefone = this.fornecedorFormEditar.value.telefone;
    this.fornecedorService.atualizar(fornecedor).subscribe(() => {
      this.listar();
      alert('Fornecedor atualizado com sucesso!');
    });
    this.fornecedorForm.reset();
  } else {
    alert('Por favor, forneça um ID válido para edição.');
  }
}

}
