import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select } from 'src/app/common/interface';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  load: boolean = false;
  idSeleccionado: number = 0;
  hide = true;
  showItem = false;
  eliminar = false;
  contenido = '';
  selected!: string;
  filtro = '';
  rol: string = 'ROLE_ADMIN';
  usuarioForm: FormGroup;
  asociacion: string = 'HUANDA';

  roles: Select[] = [
    { value: 'ROLE_USER', viewValue: 'USUARIO' },
    { value: 'ROLE_ADMIN', viewValue: 'ADMINISTRADOR' }
  ];

  asociaciones: Select[] = [
    { value: 'HUANDA', viewValue: 'HUANDACAREO' },
    { value: 'LA_PIEDAD', viewValue: 'LA PIEDAD' },
    { value: 'VILLA_JIMENES', viewValue: 'VILLA JIMENES' },
  ];


  constructor(
    private fb: FormBuilder,
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      nombreUsuario: ['', [Validators.required]],
      asociacion: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  refresh() {

  }

  applyFilter(event: Event) {

    if (event.type === "click") {
      this.filtro = '';
    }
    else {
      this.filtro = (event.target as HTMLInputElement).value;
    }

    this.dataSource.filter = this.filtro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  guardar() {

  }

  openItem(id: number) {
    this.showItem = true;
    if (id === 0) {
      this.contenido = 'Crear Usuario';
      this.eliminar = false;
      this.vaciarForm();
    }
  }

  elimina(id: Number) {

  }

  closeItem() {
    this.showItem = false;
    this.contenido = '';
    this.vaciarForm();
  }

  vaciarForm() {
    this.usuarioForm.patchValue({
      nombre: '',
      nombreUsuario: '',
      asociacion: '',
      rol: '',
      password: '',
    });

    this.usuarioForm.get('nombre')?.enable();
    this.usuarioForm.get('nombreUsuario')?.enable();
  }

}
