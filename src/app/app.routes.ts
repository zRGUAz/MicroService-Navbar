import { Routes } from '@angular/router';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { IbgeComponent } from './components/ibge/ibge.component';

export const routes: Routes = [

    {path: 'cliente', component: ClienteComponent},
    {path: 'cliente/:id', component: ClienteDetailComponent},
    {path: 'fornecedor', component: FornecedorComponent},
    {path: 'ibge', component: IbgeComponent},
    {path: 'pokemon', component: PokemonComponent},
    {path: 'tarefa', component: TarefasComponent},
    {path: '', redirectTo: '/cliente', pathMatch: 'full'},
    {path: '**', redirectTo: '/cliente', pathMatch: 'full'}
];
