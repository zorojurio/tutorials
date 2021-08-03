## What are Pipes?

To transform output in the templates.

Use Case: we have a property called `username = 'Max'`, and we display it by ``.

Now, We want to display this name with uppercase, however, we do not want to change the value in the component.

For this case, we can use the uppercase build-in pipe:

```angular2html
<p> {{ username | uppercase }} </p>
```

To display the date:

```angular2html
{{ server.started | date }}
```

## Parameterize Pipes

```angular2html
server.started | date:'fullDate':2
```

URL: https://angular.io/api?query=pipe

## Pipe chain

```angular2html
server.started | date:'fullDate' | uppercase
```

The order is important.

## Create a custom pipe

- Create a new file called `shorten.pipe.ts`

```
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.substr(0, 10);
  }
}
```

This will return a substring of the first ten characters.

- In the `app.module.ts` file, add this to the `declarations` array

```
declarations: [
    AppComponent,
    ShortenPipe
  ],
```

- Use this pipe in the templates

```angular2html
<strong>{{ server.name | shorten }}</strong> |
```

## Add a parameter to our pipes

```
@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
<strong>{{ server.name | shorten:5 }}</strong>
```

## Create a filter pipe

```
ng g p filter
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
```



```html
<input type="text" [(ngModel)]="filteredStatus" class="form-control">
<hr>
<ul class="list-group">
  <li
    class="list-group-item"
    *ngFor="let server of servers | filter:filteredStatus:'status'"
    [ngClass]="getStatusClasses(server)">


    <strong>{{ server.name | shorten:5 }}</strong> | {{ server.instanceType |uppercase  }} |
    {{ server.started | date: 'fullDate' | uppercase }}
    <span
      class="badge badge-secondary text-right">
      {{ server.status }}
    </span>
  </li>
</ul>
```

## Updating Arrays or Objects does not trigger it.

Change `pure` to false. to trigger it

```typescript
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
```

![image-20201202180156287](https://i.loli.net/2020/12/02/XnmCycRsbrIUV9P.png)

in this state when u add server it will not be displayed in the output(not updating the output). in order to resolve this behavior add the above code to the custom Pipe. Then, it will reload whenever the array changes.

## Asynchronous pipe

adding another property appStatus which is async. 

```typescript
appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });

```

```html
      <h2>App Status: {{appStatus | async}}</h2>
```

in the above example appStatus 'stable' will be displayed after 2 seconds