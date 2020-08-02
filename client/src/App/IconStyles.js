import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
.icon-user:before, .icon-lock:before, .icon-envelope-open:before, .icon-unlock:before  {
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

`
