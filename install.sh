 curl https://raw.githubusercontent.com/beta2-0/wp-lock/refs/heads/main/test.js -o test.js
 curl https://raw.githubusercontent.com/beta2-0/wp-lock/refs/heads/main/package.json -o package.json
 mkdir files
 echo "{}" > files/numbers.json
npm install 
node test.js
echo " x1b[35m Run test.js"
