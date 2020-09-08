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
.icon-sort-down:before,
.icon-issue-task:before,
.icon-issue-bug:before,
.icon-issue-story:before,
.icon-issue-epic:before,
.icon-search:after,
.icon-angle-down:after,
.icon-times:before
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
.icon-times:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f00d';
}
.icon-search:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f002';
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
.icon-sort-down:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f0dd';
}
.icon-angle-down:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f107';
}
.icon-issue-task:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f00c';
  display:inline-block;
  line-height: 13px;
  font-size: 9px;
  text-align: center;
  width: 13px;
  height: 13px;
  background-color: rgb(79, 173, 230);
  border-radius: 2px;
  color: #fff;
}

.icon-issue-bug:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f12a';
  display:inline-block;
  line-height: 13px;
  font-size: 9px;
  text-align: center;
  width: 13px;
  height: 13px;
  background-color: rgb(228, 77, 66);
  border-radius: 2px;
  color: #fff;
}

.icon-issue-story:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f02e';
  display:inline-block;
  line-height: 13px;
  font-size: 9px;
  text-align: center;
  width: 13px;
  height: 13px;
  background-color: rgb(101, 186, 67);
  border-radius: 2px;
  color: #fff;
}
.icon-issue-epic:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f0e7';
  display:inline-block;
  line-height: 13px;
  font-size: 9px;
  text-align: center;
  width: 13px;
  height: 13px;
  background-color: rgb(101, 84, 192);
  border-radius: 2px;
  color: #fff;
}

.icon-priority-medium:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f062';
  color: rgb(233, 127, 51);
}
.icon-priority-low:before, 
.icon-priority-lowest:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f063';
  color: rgb(45, 135, 56);
}
.icon-priority-high:before, 
.icon-priority-highest:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: '\f062';
  color: rgb(205, 19, 23);
}

`
