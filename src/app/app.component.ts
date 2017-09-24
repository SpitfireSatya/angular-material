
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title: string = 'Angular-material';
  public selectedValue = '';
  public template: string;
  public bindings: Object;

  constructor(private http: Http) { }

  public ngOnInit() {

    this.http.get('assets/mocks/template.partial.html')
      .map(Response => Response.text())
      .subscribe((template) => {
        this.template = template;
        this.http.get('assets/mocks/mock-bindings.json')
          .map(Response => Response.json())
          .subscribe((bindings) => {
            this.bindings = bindings;
          });

      });

  }

}
