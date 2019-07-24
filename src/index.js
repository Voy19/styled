function styled(object = null) {
   return function(string, ...args) {
      return function (objectArgs) {
         let res = '';
         if(object !== null) {
            res = object(objectArgs);
         }
         res += a[0] || '';
         if(args.length > 0) {
            args.forEach((val, index) => {
               res += (objectArgs ? val(objectArgs) : val({}))  +string[index + 1];
            })
      }
      return res.replace(/\n|\t/g, '');
   }
}
}

module.exports = styled;
console.log(styled()
   ``());
console.log(styled()
   `color: red;`());

console.log(styled()
   `color: white;
   background: black;`());
console.log(styled({
   color: 'blue;'
}));