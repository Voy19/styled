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
            result += args.map((item, index) => checkType(item) + options[index + 1]);
         }

         function checkType(arg) {
            return typeof arg === 'function' ? checkType(arg(props)) : arg || '';
         }
         const finalResult = result.replace(/\n|\t|\,/g, "").replace(/;;/g, ";");

         function deleteDublications(string) {
            const cache = {};
            const arr = [];
            const seperation = string.split(';').map(style => style.split(':'));
            if (seperation.length) {
               seperation.map(style => cache[style[0]] = style[1]);
               for (key in cache) {
                  arr.push(key + ':' + cache[key]);
               }
               return arr.join(';').replace(/:undefined/g, '');
            }
            return string;
         }
         return deleteDublications(finalResult);
      };
   };
}

styled.button = styled("button");
styled.a = styled("a");
styled.div = styled("div");
styled.css = styled("css");

module.exports = styled;
