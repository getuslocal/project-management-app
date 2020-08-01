import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
.icon-user:before {
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
`;
