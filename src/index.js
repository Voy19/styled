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
   if (!data) throw new Error("Wrong extended element");
   return function (options = "", ...args) {
      return function prop(props = {}) {
         let result = "";
         if (typeof data == "function") {
            result += data(props);
         }
         result += options[0];
         if (args.length) {
            result += args.map((item, index) => test(item) + options[index + 1]);
         }

         function test(a) {
            return typeof a === 'function' ? test(a(props)) : a || '';
         }

         let arr = result.replace(/\n|\t|\,/g, "").replace(/;;/g, ";");
         // return result.replace(/\n|\t|\,/g, "").replace(/;;/g, ";");
         return arr;

      };
   };
}

styled.button = styled("button");
styled.a = styled("a");
styled.div = styled("div");
styled.css = styled("css");

module.exports = styled;