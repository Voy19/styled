// function styled(data = null) {
//    return function (options = '', ...args) {
//       return function (props = {}) {
//          let result = '';
//          if (data !== null) {
//             result = data(props);
//          }
//          result += options[0];
//          if (args.length) {
//             result += args.map((item, index) => item(props) + options[index + 1])
//          }
//          return result.replace(/\n|\t|\,/g, '');
//       };
//    };
// }

function styled(data = null) {
   if (!data) throw new Error('Wrong extended element');
   return function (options = '', ...args) {
      return function prop(props = {}) {
         let result = '';
         if (typeof data == 'function') {
            result = data(props);
         }
         result += options[0];
         if (args.length) {
            result += args.map((item, index) => item(props) + options[index + 1]);
         }
         return result.replace(/\n|\t|\,|undefined;/g, '').replace(/;;/g, ';');
      };
   };
}

styled.button = styled('button');
styled.a = styled('a');
styled.div = styled('div');
styled.css = styled('css');

module.exports = styled;
