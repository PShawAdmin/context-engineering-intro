Installation

CLI

npm

yarn

pnpm

bun
The above command is for individual installation only. You may skip this step if @heroui/react is already installed globally.
Import

Individual

Global
Usage

Preview

Code
Email
Enter your email
Anatomy
A Form is a container for input elements and submit/reset buttons, with support for validation messages. When labeled with aria-label or aria-labelledby, it becomes a navigable form landmark for assistive technology.

Events
The onSubmit event will be triggered when a user submits the form with the Enter key or by pressing a submit button. The onReset event will be triggered when a user presses a reset button.


Preview

Code
Username
Enter your username
Email
Enter your email
Validation
Form supports native HTML constraint validation with customizable UI, custom validation functions, and server-side validation. Server-side validation errors can be provided via the validationErrors prop as an object mapping field names to error messages, which are cleared when the user modifies the field.


Preview

Code
Username
Enter your username
See the Forms guide to learn more about form validation, including client-side validation, and integration with other frameworks and libraries.

Validation Behavior
Form validation uses native validation behavior by default, but can be switched to ARIA validation by setting validationBehavior="aria". ARIA validation shows realtime errors without blocking submission. This can be set at the form or field level. To set the default behavior at the app level, you can change the form defaults for your entire app using HeroUI Provider.


Preview

Code
Username
Enter your username
Username must be at least 3 characters long
Accessibility
Built with a native HTML <form> element, with support for ARIA labelling to create a form landmark.
Full support for browser features like form autofill.
Support for native HTML constraint validation with customizable UI, custom validation functions, realtime validation, and server-side validation errors.
API
Form Props
Prop	Type	Default
children
ReactNode
validationBehavior
'native' | 'aria'
"native"
validationErrors
Record<string, string | string[]>
action
string | FormHTMLAttributes<HTMLFormElement>['action']
encType
'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
method
'get' | 'post' | 'dialog'
target
'_blank' | '_self' | '_parent' | '_top'
autoComplete
'off' | 'on'
autoCapitalize
'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
className
string
style
CSSProperties
