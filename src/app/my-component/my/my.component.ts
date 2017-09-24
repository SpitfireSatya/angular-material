
import {
  Component, OnInit, Input, NgModule, NgModuleFactory, Compiler
} from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `<ng-container *ngComponentOutlet="dynamicComponent;
                            ngModuleFactory: dynamicModule;"></ng-container>`,
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {

  public dynamicComponent: any;
  public dynamicModule: NgModuleFactory<any>;

  @Input()
  bindings: any = {};
  @Input()
  template: string = '';

  constructor(private compiler: Compiler) {
  }

  private loadDynamicContent() {
    this.dynamicComponent = this.createNewComponent(this.template, this.bindings);
    this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
  }

  public ngOnInit() {
    this.loadDynamicContent();
  }

  private createComponentModule(componentType: any) {
    @NgModule({
      imports: [],
      declarations: [
        componentType
      ],
      entryComponents: [componentType]
    })
    class RuntimeComponentModule {
    }
    // a module for just this Type
    return RuntimeComponentModule;
  }

  private createNewComponent(template: string, bindings: any) {

    @Component({
      selector: 'app-dynamic-component',
      template: template
    })
    class DynamicComponent implements OnInit {

      public text: string;

      public ngOnInit() {
        this.text = bindings.key;
      }

    }

    return DynamicComponent;

  }

}
