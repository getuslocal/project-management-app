import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
.icon-user:before, 
.icon-lock:before, 
.icon-envelope-open:before, 
.icon-unlock:before,
.icon-dashboard:before,
.icon-inbox:before,
.icon-project:before,
.icon-setting:before,
.icon-sort-down:before
{
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
}

.icon-user:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  content: '\f007';
}
.icon-lock:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f023';
}
.icon-envelope-open:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  content: '\f2b6';
}
.icon-unlock:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f09c';
}
.icon-dashboard:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f84c';
}
.icon-inbox:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  content: '\f0f3';
}
.icon-project:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f0ae';
}
.icon-setting:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f013';
}
.icon-sort-down:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f0dd';
}

`
