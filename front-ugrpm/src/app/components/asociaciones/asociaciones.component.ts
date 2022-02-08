import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Select } from 'src/app/common/interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079 },
  { position: 2, name: 'Helium', weight: 4.0026 },
  { position: 3, name: 'Lithium', weight: 6.941 },
  { position: 4, name: 'Beryllium', weight: 9.0122 },
  { position: 5, name: 'Boron', weight: 10.811 },
  { position: 6, name: 'Carbon', weight: 12.0107 },
  { position: 7, name: 'Nitrogen', weight: 14.0067 },
  { position: 8, name: 'Oxygen', weight: 15.9994 },
  { position: 9, name: 'Fluorine', weight: 18.9984 },
  { position: 10, name: 'Neon', weight: 20.1797 },
];


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html',
  styleUrls: ['./asociaciones.component.scss']
})
export class AsociacionesComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  load: boolean = false;
  idSeleccionado: number = 0;
  showItem = false;
  eliminar = false;
  contenido = '';
  selected!: string;
  filtro = '';
  asociacionForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.asociacionForm = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  refresh() {
    this.dialog.open
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
    this.openDialog('Mensaje', 'x')
  }

  openItem(id: number) {
    this.showItem = true;
    if (id === 0) {
      this.contenido = 'Crear Asociación';
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
    this.asociacionForm.patchValue({
      nombre: '',
      asociacion: '',
      direccion: '',
      email: '',
    });

    this.asociacionForm.get('nombre')?.enable();
    this.asociacionForm.get('direccion')?.enable();
  }

  openDialog(mensaje: string, type: string, component?: string, status?: number, id?: number): void {

    if (type === 'x') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: {
          mensaje: mensaje,
          tipo: type,
          jwt: '123456',
          component: component,
          id: id
        }
      });
    }
    else {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: {
          mensaje: mensaje,
          tipo: type
        }
      });
    }

  }

}
