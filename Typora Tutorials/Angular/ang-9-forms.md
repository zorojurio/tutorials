# Forms

with in subject u can call Next() FROM out side. 

![image-20201129151610574](https://i.loli.net/2020/11/29/ak7qtpKnDj2eoYO.png)



## Two approaches when it comes to forms handling

Template Driven

Reactive approach

# Test Driven Approach

form will create an Object in angular and it works as a directive. so it creates a JS representation of the form. however angular will not automatically  detect the form inputs,  

creating the form and let angular knows about the structure of the form 

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8 mx-auto">
      <form>
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
            name="username">
          </div>
          <button class="btn btn-primary" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control" ngModel name="email">
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret" class="form-control" ngModel name="secret">
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Submit a Form That we created

```typescript
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  suggestUserName() {
    const suggestedName = 'Superuser';
  }
  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
```

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8 mx-auto">
      <form (ngSubmit)="onSubmit(f)" #f='ngForm'>
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
            name="username">
          </div>
          <button class="btn btn-primary" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control" ngModel name="email">
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret" class="form-control" ngModel name="secret">
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Accessing the form with view child

```typescript
@ViewChild('f') signUpForm: NgForm; // ViewChild is used to access the local reference
// signUpForm will have the access to the form data
suggestUserName() {
  const suggestedName = 'Superuser';
}

onSubmit() {
  console.log(this.signUpForm); // once the user submnit the form logging out the data derived from the
}
```

# Form Validation

```html
<input type="email" id="email" class="form-control" ngModel name="email" required email>
<input type="text" id="username" class="form-control" ngModel required name="username">
```

# CSS validation

```css
form .ng-invalid.ng-touched{
  border: 1px solid darkred;
}

input.ng-invalid.ng-touched{
  border: 1px solid darkred;
}

```

# Outputting Validation Error Methods

```html
<label for="email">Mail</label>
<input type="email" id="email" class="form-control" ngModel name="email" required email #email="ngModel">
<span class="text-danger help-text" *ngIf="!email.valid && email.touched">** Please enter a valid email **</span>
```

# Set Default Values

this is not two way binding. 

```html
<select id="secret" class="form-control" [ngModel]="defaultQuestion" name="secret">
  <option value="pet">Your first Pet?</option>
  <option value="teacher">Your first teacher?</option>
</select>
```

```typescript
@ViewChild('f') signUpForm: NgForm; // ViewChild is used to access the local reference
defaultQuestion = 'pet';
```

# Using Two way binding

```typescript
answer = '';
```



```html
<div class="form-group">
  <label for="questionAnswer"></label>
  <textarea class="form-control" id="questionAnswer" name="questionAnswer" cols="30" rows="10"
            [(ngModel)]="answer"></textarea>
</div>
<p>Your reply: {{answer}}</p>
```

# Grouping Form Control

```html
<div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" id="username" class="form-control" ngModel required name="username">
  </div>
  <button class="btn btn-primary" type="button">Suggest an Username</button>
  <div class="form-group">
    <label for="email">Mail</label>
    <input type="email" id="email" class="form-control" ngModel name="email" required email #email="ngModel">
    <span class="text-danger help-text"
          *ngIf="!email.valid && email.touched">** Please enter a valid email **</span>
  </div>
</div>
```

# Setting Default Values

```typescript
@ViewChild('f') signUpForm: NgForm; // ViewChild is used to access the local reference
defaultQuestion = 'pet';
answer = '';
genders = ['male', 'female'];
// signUpForm will have the access to the form data

// once u hit the button u will generate this values in the form
suggestUserName() {
  const suggestedName = 'Superuser';
  this.signUpForm.setValue({ // setting the value using local reference
    userData: {
      username: suggestedName,
      email: ''
    },
    secret: 'pet',
    questionAnswer: '',
    gender: 'male'
  });
}
```

one down side of this approach is lets \say that u have some value in the email section and once u hit suggest user name that value will also be deleted.

instead of overriding all the values in the suggestUserName function. following method can be used:

```typescript
@ViewChild('f') signUpForm: NgForm; // ViewChild is used to access the local reference
defaultQuestion = 'pet';
answer = '';
genders = ['male', 'female'];

// signUpForm will have the access to the form data
suggestUserName() {
  const suggestedName = 'Superuser';
  this.signUpForm.form.patchValue({
    userData: {
      username: suggestedName,
    },
  }); // signUpForm is the container and the form in the wrapper
}
```

# Outputting user Data

```html
<div class="col-md-8 col-12 mx-auto mt-5" *ngIf="submitted">
  <h3>Your Data</h3>
  <p>Username: {{user.username}}</p>
  <p>Mail: {{user.email}}</p>
  <p>Secret Question: {{user.secretQuestion}}</p>
  <p>Answer: {{user.answer}}</p>
  <p>Gender: {{user.gender}}</p>
</div>
```

```typescript
@ViewChild('f') signUpForm: NgForm; // ViewChild is used to access the local reference
defaultQuestion = 'pet';
answer = '';
genders = ['male', 'female'];
submitted = false;
user = {
  username : '',
  email: '',
  secretQuestion: '',
  answer: '',
  gender: ''
};
// signUpForm will have the access to the form data
suggestUserName() {
  const suggestedName = 'Superuser';
  this.signUpForm.form.patchValue({
    userData: {
      username: suggestedName,
    },
  }); // signUpForm is the container and the form in the wrapper
}

onSubmit() {
  this.submitted = true;
  this.user.username = this.signUpForm.value.userData.username;
  this.user.email = this.signUpForm.value.userData.email;
  this.user.secretQuestion = this.signUpForm.value.secret;
  this.user.answer = this.signUpForm.value.questionAnswer;
  this.user.gender = this.signUpForm.value.gender;
}
```

# Resetting the form

```typescript
this.signUpForm.reset();
```





# Reactive Approach

```typescript
signUpForm: FormGroup; // signUpForm holds the form
```



```typescript
import {ReactiveFormsModule} from '@angular/forms';
ReactiveFormsModule // imports in the app module
```

## Synching the form

```typescript
genders = ['male', 'female'];
signUpForm: FormGroup;

ngOnInit(): void {
  this.signUpForm = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null),
    gender: new FormControl('female')
  });
}
```

```html
<input type="text" id="username" class="form-control"  name="username"
       formControlName="username">
<input type="email" id="email" class="form-control" name="email" required
       formControlName="email">

<label>
    <input type="radio" name="gender" [value]="gender" formControlName="gender">
    {{gender}}
</label>
```

## Submitting Form



```typescript
onSubmit(){
  console.log(this.signUpForm.value); // once the form is submitted it will log the values
}
```

```html
<form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">
```

## Form validation

ih here on initialization we are defining the validations

```typescript
ngOnInit(): void {
  this.signUpForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    // here we are passing the reference of the method angular will be executing the method
    email: new FormControl(null, [Validators.required, Validators.email]),
    gender: new FormControl('female')
  });
}
```

## Accessing Form Controls

```html
<div class="form-group">
  <label for="username">Username</label>
  <input type="text" id="username" class="form-control"  name="username"
         formControlName="username">
  <span *ngIf="!signUpForm.get('username').valid && signUpForm.get('username').touched"
        class="small text-danger">
    Please enter a valid username
  </span>
</div>

<div class="form-group">
    <label for="email">Mail</label>
    <input type="email" id="email" class="form-control" name="email" required
           formControlName="email">
    <span *ngIf="!signUpForm.get('email').valid && signUpForm.get('email').touched"
          class="small text-danger">
        Please enter a valid Email</span>
</div>
```

## Grouping controls

```typescript
ngOnInit(): void {
  this.signUpForm = new FormGroup({
    userData: new FormGroup({
      username: new FormControl(null, [Validators.required]),
      // here we are passing the reference of the method angular will be executing the method
      email: new FormControl(null, [Validators.required, Validators.email])
    }),
    gender: new FormControl('female')
  });
}
```

```html
<form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">
<!--      now form is synched -->
        <div id="user-data" formGroupName="userData">
            
<input type="text"
       id="username"
       class="form-control"  
       name="username"
       formControlName="username">
<span *ngIf="!signUpForm.get('userData.username').valid && 	signUpForm.get('userData.username').touched"
                  class="small text-danger">
              Please enter a valid username
            </span>
```

# Array of form controls

- Step 1: add a new click event for this button

```html
<button
    class="btn btn-light"
    type="button"
    (click)="onAddHobby()">Add Hobby</button>
```



- Step 2: Add a new FormArray called ‘hobbies’ in the `signupForm`.

  ```typescript
  ngOnInit() {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, Validators.required),
          'email': new FormControl(null, [Validators.required, Validators.email]),
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
    }
  ```

- Step 3: Push a new control into the array

```typescript
onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }
```

 Step 4: Synchronize with HTML code. Loop the array and add the input

```html
<div formArrayName="hobbies" class="mt-5">
  <h4>Your hobbies</h4>
  <button class="btn btn-success" (click)="addHobby()">Add Hobbie</button>

  <div class="form-group"
       *ngFor="let hobbyControl of getHobbies() ; let i = index" >
    <label for="hobbie-{{i}}"></label>
      <input  id="hobbie-{{i}}" type="text" class="form-control" [formControlName]="i">

  </div>
</div>
```

## Create Custom Validators

For example, we want to forbidden some specific user names.

```typescript
forbiddenUsernames = ['Chris', 'Anna'];
```

 

```typescript
forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
```

A validator should return an Object if it is valid, or null if it is invalid.

- Then, we add this function in the FormControl constructor.

```typescript
'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
```



## Showing the Error Message

```html
<span *ngIf="!signUpForm.get('userData.username').valid && signUpForm.get('userData.username').touched"
      class="small text-danger">
  <span *ngIf="signUpForm.get('userData.username').errors['nameIsforbidden']">
    {{signUpForm.get('userData.username').value}} is not a valid username
  </span>
  <span *ngIf="signUpForm.get('userData.username').errors['required']">
    This field is required
  </span>
</span>
```

## Creating a Custom Async Validator

```typescript
forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
```

In here, when u enter an email > it will show the class ng-pending and then ng-invalid. because of Async 

## Reacting to status or value changes

```typescript
 this.signupForm.valueChanges.subscribe(
   (value) => console.log(value)
 );
this.signupForm.statusChanges.subscribe(
  (status) => console.log(status)
);
```

## Setting, Patching, and Resetting Values

```typescript
// changes the whole form
this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'sdf@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    
    // change only the userData > username part
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });
```

```typescript
this.signupForm.reset(); 
```