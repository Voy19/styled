function styled(data = null) {
   return function (options = '', ...args) {
      return function (props = {}) {
         let result = '';
         if (data !== null) {
            result = data(props);
         }
         result += options[0];
         if (args.length) {
            result += args.map((item, index) => {
               return item(props) + options[index + 1];
            })
         }
         return result.replace(/\n|\t/g, '');
      };
   };
}

module.exports = styled;