import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-comment-dialog",
  templateUrl: "./comment-dialog.component.html",
  styleUrls: ["./comment-dialog.component.scss"]
})
export class CommentDialogComponent implements OnInit {

  form: FormGroup;
  comment: string;
  title: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.comment = data.comment;
    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, Validators.required],
      comment: [this.comment, Validators.required]
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
