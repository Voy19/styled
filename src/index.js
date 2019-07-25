function styled(data = null) {
   return function (options = '', ...args) {
      return function (props = {}) {
         let result = '';
         if (data !== null) {
            result = data(props);
         }
         result += options[0];
         if (args.length) {
            result += args.map((item, index) => item(props) + options[index + 1])
         }
         return result.replace(/\n|\t|\,/g, '');
      };
   };
}

module.exports = styled;

const styledQ = styled()
`
color: ${argument => argument.color || 'black'};
`;

const styledColor = styled(styledQ)
`
   color: ${argument => argument.color || 'red'};
   font-size : ${argument => argument.fz || '10px'};
`;

const styledColorWithBackground = styled(styledColor)
`
   background: ${argument => argument.bg || 'white'};
`;

console.log(styledColorWithBackground({
   color: 'blue',
   bg: 'red',
   fz: '20px'
}));