// extract.js
const fs = require('fs');
const out = JSON.parse(fs.readFileSync('./output.json', 'utf8'));

const contractName = 'SimpleStorage';
const abi = out.contracts['SimpleStorage.sol'][contractName].abi;
const bytecode = out.contracts['SimpleStorage.sol'][contractName].evm.bytecode.object;

fs.writeFileSync('SimpleStorage_sol_SimpleStorage.abi', JSON.stringify(abi, null, 2));
fs.writeFileSync('SimpleStorage_sol_SimpleStorage.bin', bytecode);

console.log('✅ ABI & bytecode extracted');