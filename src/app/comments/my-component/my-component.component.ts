import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CommentsService } from 'src/app/services/comments.service';
import { commentsDTO } from 'src/models/comments.dto';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Cadastro feito com sucesso!',
},];

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  alerts!: Alert[];
  formulario!: FormGroup;
  comentarioUp!: FormGroup;
  closeResult = '';

  arrayCadastro: commentsDTO[] = [{
    id: 0,
    body: "",
    postId: 0
  }]
  cadastroComentario: commentsDTO = {
    body: "",
    postId: 0,
    id: 0
  }
  consultaComentario: commentsDTO = {
    body: "",
    postId: 0,
    id: 0
  }

  constructor(
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAll()

    this.formulario = this.formBuilder.group({
      body: [null],
      postId: [null]
    })
    this.comentarioUp = this.formBuilder.group({
      body: [null],
      postId: [null]
    })
  }
  getAll() {
    this.commentsService.findAll()
      .subscribe(response => {
        this.arrayCadastro = response;
        console.log(this.arrayCadastro);
      },
        error => {
          console.log(error);
        });
  }
  onSubmit() {
    this.commentsService.postComments(this.cadastroComentario)
      .subscribe(response => {
        console.log(response);

        this.reset();
        window.setTimeout(function () { location.reload(); }, 3000);
      },
        error => {
          console.log(error);
        });
    console.log(this.cadastroComentario)
  }
  deletar(id: number) {
    console.log(id)
    this.commentsService.delete(id)
      .subscribe(response => {
        console.log(response);
        window.setTimeout(function () { location.reload(); }, 3000);
      })
  }
  consultar(id: any, content: any) {
    this.commentsService.getConsultar(id)
      .subscribe(response => {
        this.consultaComentario = response;
        console.log(this.consultaComentario, "Get um comentario")

        if (this.consultaComentario.body != null) {

          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      },
        error => {
          console.log(error);
        });
  }
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  atualizarComentario() {
    if (this.consultaComentario.body != "" && this.consultaComentario.postId > 0) {
      this.commentsService.putComments(this.consultaComentario.id, this.consultaComentario)
        .subscribe(response => {
          console.log(response, "deu certo!");

          window.setTimeout(function () { location.reload(); }, 3000);
        }, error => {
          console.log(error, "erro!!!");
        });
    } else {
      console.log("Os dados estão vazios")
    }

  }

}

